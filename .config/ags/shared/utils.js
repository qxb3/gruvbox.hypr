import App from 'resource:///com/github/Aylur/ags/app.js';
import Variable from 'resource:///com/github/Aylur/ags/variable.js'
import Utils from 'resource:///com/github/Aylur/ags/utils.js'

const STATES_PATH = `${App.configDir}/.states.json`

/**
 * Manage state on ~/.config/ags/.states.json
 *
 * @param {string} key - the key in the json file
 * @param {any} value - default value
 * @returns {Variable}
 */
export function state(key, value) {
  const variable = Variable(value)

  Utils.monitorFile(STATES_PATH, (file, event) => {
    if (event === 0) {
      const states = JSON.parse(Utils.readFile(file))
      variable.value = states[key]
    }
  })

  variable.connect('changed', ({ value }) => {
    const states = JSON.parse(Utils.readFile(STATES_PATH))
    states[key] = value

    Utils.writeFile(JSON.stringify(states, null, 2), STATES_PATH)
  })

  return variable
}

export function debounce({ called, fn }, delay = 250) {
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


export default {
  state,
  debounce
}
