export function log (msg, type = 'default') {
  if (process.env.NODE_ENV === 'production') return

  if (type === 'error') {
    console.error(msg)
  } else {
    console.log(msg)
  }
}
