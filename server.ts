import { Databases, initDB } from './config/database'
import { PORT_NUMBER } from './constants'
import CheckerRoutes from './system/checker'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import fetch from 'node-fetch'
import { spawn } from 'node:child_process'
import winston, { format } from 'winston'

import ExampleRoutes from './controllers/examples'
import HttpRoutes from './controllers/http'
import HttpHeadersRoutes from './controllers/http-headers'
import JSONRoutes from './controllers/json'
import CategoryRoutes from './controllers/product-categories'
import ProductRoutes from './controllers/products'
import URLPathRoutes from './controllers/url-paths'
import UserRoutes from './controllers/users'
import ValidationRoutes from './controllers/validation'

const TEST_PROCESS_TYPE = 'TEST'

const { combine, timestamp, printf, colorize } = format

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}][Level=${level}]: ${JSON.stringify(message)}`
})

export let logger: winston.Logger

export async function init({ database }: { database: Databases }) {
  try {
    const app = express()

    app.use(morgan('[:date[iso]] :method :url :status - :response-time ms'))

    logger = winston.createLogger({
      format: combine(colorize(), timestamp(), customFormat),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    })

    app.use(bodyParser.json())

    if (database === Databases.ACTUAL) {
      app.all(/\/verify/, async (req: Request, res: Response) => {
        const queryString = Object.keys(req.query)
          .map((key) => {
            return `${key}=${req.query[key]}`
          })
          .join('&')

        const newUrl = new URL(
          req.path.replace('/verify', ''),
          `http://localhost:${
            (process.env.PORT_NUMBER &&
              parseInt(process.env.PORT_NUMBER) + 1) ||
            PORT_NUMBER + 1
          }`
        )

        const response = await fetch(`${newUrl.href}?${queryString}`, {
          method: req.method,
          headers: req.headers as { [key: string]: string },
          body: ['HEAD', 'GET'].includes(req.method.toUpperCase())
            ? undefined
            : JSON.stringify(req.body),
        })

        let json
        try {
          json = await response.json()
        } catch (error) {}

        Object.keys(response.headers.keys()).forEach((key) =>
          res.setHeader(key, response.headers.get(key) || '')
        )

        res.status(response.status).send(json)
      })
    }

    app.use('/', ProductRoutes)
    app.use('/', CategoryRoutes)
    app.use('/', URLPathRoutes)
    app.use('/', JSONRoutes)
    app.use('/', ValidationRoutes)
    app.use('/', HttpRoutes)
    app.use('/', HttpHeadersRoutes)
    app.use('/', UserRoutes)
    app.use('/', ExampleRoutes)

    app.use('/', CheckerRoutes)

    app.get('/', (_: Request, res: Response<{ message: string }>) => {
      return res.status(200).send({ message: 'Server Is Running' })
    })

    app.use((err: any, req: any, res: any, next: any) => {
      res.status(err.output ? err.output.statusCode : 500).send({
        message: err.output
          ? err.output.payload.message
          : 'Internal Server Error',
      })
    })

    const sequelize = initDB(database)
    await sequelize.sync({ force: true, logging: false })

    return app
  } catch (error) {
    throw new Error(`Failed to start server: ${error}`)
  }
}

function startChildProcess(portNumber: number) {
  if (process.env.PROCESS_TYPE !== TEST_PROCESS_TYPE) {
    const childProcess = spawn('node -r @swc-node/register', ['index.ts'], {
      env: {
        ...process.env,
        PORT_NUMBER: `${portNumber + 1}`,
        PROCESS_TYPE: 'TEST',
      },
      detached: false,
      shell: true,
    })

    if (process.env.DEBUG === 'true') {
      childProcess.stdout!.on('data', (data) => {
        console.log(`${data}`)
      })
      childProcess.stderr!.on('data', (data) => {
        console.error(`stderr: ${data}`)
      })
      childProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })
    }

    return childProcess
  }
}

export async function start() {
  try {
    const portNumber =
      (process.env.PORT_NUMBER && parseInt(process.env.PORT_NUMBER)) ||
      PORT_NUMBER

    const app = await init({
      database:
        process.env.PROCESS_TYPE === TEST_PROCESS_TYPE
          ? Databases.TEST
          : Databases.ACTUAL,
    })

    startChildProcess(portNumber)

    const server = app.listen(portNumber, () => {
      console.log(
        `Server started on Port ${process.env.PORT_NUMBER || PORT_NUMBER}`
      )
      console.log(`Server is now running!`)
    })

    return { app, server }
  } catch (error) {
    throw new Error(`Failed to start server: ${error}`)
  }
}
