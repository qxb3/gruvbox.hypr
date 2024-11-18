import Gio from 'gi://Gio'

const STATES_PATH = `${App.configDir}/.states.json`

/**
 * Manage state on ~/.config/ags/.states.json
 *
 * @param {string} key - the key in the json file
 * @param {any} value - default value
 * @returns {Variable}
 */
export function state(key, value) {
  if (key === undefined) throw new Error('"key" is undefined')
  if (value === undefined) throw new Error('"value" is undefined')

  const variable = Variable(value)

  Utils.monitorFile(STATES_PATH, (file, event) => {
    if (event === Gio.FileMonitorEvent.CHANGED) {
      const states = JSON.parse(Utils.readFile(file))
      Utils.writeFile(JSON.stringify(states, null, 2), STATES_PATH)

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
