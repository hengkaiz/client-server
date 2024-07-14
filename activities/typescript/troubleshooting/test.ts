function fetchData() {
  setTimeout(() => {
    console.log('Data fetched!')
  }, 1000)
}

function run() {
  // Calling the asynchronous function. When it reaches this
  await fetchData()
  console.log('Program continues...')
}

run()
