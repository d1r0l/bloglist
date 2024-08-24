/**
 * Creates a promise that resolves or rejects after a specified timeout period.
 *
 * @param {function} fn - The function to be executed when the promise is resolved.
 * @param {React.MutableRefObject} timeoutIdRef - An optional reference to store the timeout ID.
 * @param {number} timeout - The timeout period in milliseconds.
 * @return {Promise} A promise that resolves or rejects after the specified timeout period.
 */
export const promiseWithTimeout = (fn, timeoutIdRef = undefined, timeout) => {
  return new Promise(resolve => {
    const timeoutId = setTimeout(async () => resolve(await fn()), timeout)
    if (timeoutIdRef !== undefined) timeoutIdRef.current = timeoutId
  })
}

/**
 * Cancels a timeout with the given reference.
 *
 * @param {React.MutableRefObject} timeoutIdRef - The reference to the timeout ID.
 */
export const cancelTimeout = timeoutIdRef => {
  if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
  timeoutIdRef.current = null
}
