export function debounce({ called, fn }, delay = 400) {
  let id

  return function() {
    const context = this
    const args = arguments

    called.apply(context, args)

    clearTimeout(id)

    id = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
