import { App } from 'astal/gtk3'
import { exec, monitorFile } from 'astal'

export function compileScss(): string {
  try {
    exec(`sass ${SRC}/styles.scss ${TMP}/styles.css`)
    App.apply_css('/tmp/styles.css')
    return `${TMP}/styles.scss`
  } catch(err) {
    printerr('Error compiling scss files.', err)
    return ''
  }
}

// Hot Reload Scss
(function() {
  const scssFiles =
    exec(`find -L ${SRC} -iname '*.scss'`)
      .split('\n')

  // Compile scss files at startup
  compileScss()

  scssFiles
    .forEach(file =>
      monitorFile(file, compileScss)
    )
})()
