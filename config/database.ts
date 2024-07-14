import { Sequelize } from 'sequelize-typescript'

export enum Databases {
  ACTUAL = 'ecommerce',
  TEST = 'ecommerce_test',
}

export function initDB(database: Databases) {
  const sequelize = new Sequelize({
    host: 'localhost',
    port: 55003,
    dialect: 'postgres',
    database,
    username: 'postgres',
    password: 'postgrespw',
    models: [`${__dirname}/../models`],
  })

  return sequelize
}
