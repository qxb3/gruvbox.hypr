import { App } from 'astal/gtk3'
import { exec, monitorFile } from 'astal'

// Hot Reload Scss
(function() {
  const scssFiles =
    exec(`find -L ${SRC} -iname '*.scss'`)
      .split('\n')

  // Add the symlink ags_theme.scss to the files to watch
  scssFiles.push('/tmp/ags_theme.scss')

  function compile() {
    try {
      exec(`sass ${SRC}/styles.scss /tmp/styles.css`)
      App.apply_css('/tmp/styles.css')
    } catch(err) {
      printerr('Error compiling scss files.', err)
    }
  }

  scssFiles
    .forEach(file =>
      monitorFile(file, compile)
    )
})()
