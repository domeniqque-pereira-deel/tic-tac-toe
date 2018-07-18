
export const createWorker = (workerPath) => {
  const worker = new Worker(workerPath) // eslint-disable-line

  worker.run = message =>
    new Promise((resolve, reject) => {
      worker.onmessage = event => {
        resolve(event.data)
      }

      worker.onerror = error => {
        console.error(`Error: Line ${error.linen} in ${error.filename}: ${error.message}`)
        reject(error)
      }

      worker.postMessage(message)
    })

  return worker
}
