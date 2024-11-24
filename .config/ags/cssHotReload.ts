import { App } from 'astal/gtk3'
import { exec, monitorFile } from 'astal'

// Hot Reload Scss
(function() {
  const scssFiles =
    exec(`find -L ${SRC} -iname '*.scss'`)
      .split('\n')

  function compile() {
    try {
      exec(`sass ${SRC}/styles.scss /tmp/styles.scss`)
      App.apply_css('/tmp/styles.scss')
    } catch(err) {
      printerr("Error compiling scss files.", err)
    }
  }

  scssFiles.forEach(file => monitorFile(file, compile))
})()
