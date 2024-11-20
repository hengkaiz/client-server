// Do not modify this function
async function sendEmail(processPipeline: { [key: string]: boolean }[]) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      processPipeline.push({ sentEmail: true })
      resolve(true)
    }, 200)
  })
}

// Do not modify this function
async function createTransaction(
  processPipeline: { [key: string]: boolean }[]
) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      processPipeline.push({ createdTransaction: true })
      resolve(true)
    }, 200)
  })
}

// Do not modify this function
async function reserveStock(processPipeline: { [key: string]: boolean }[]) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      processPipeline.push({ reservedStock: true })
      resolve(true)
    }, 500)
  })
}

export async function processOrder() {
  const processingPipeline: { [key: string]: boolean }[] = []

  // add function calls here
  await reserveStock(processingPipeline)
  await createTransaction(processingPipeline)
  await sendEmail(processingPipeline)

  return { processingPipeline }
}

export async function processOrderWithoutEmail() {
  const processingPipeline: { [key: string]: boolean }[] = []

  // add function calls here
  await reserveStock(processingPipeline)
  await createTransaction(processingPipeline)

  return { processingPipeline }
}
