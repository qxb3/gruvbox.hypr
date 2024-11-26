import { App } from 'astal/gtk3'
import { exec, monitorFile } from 'astal'

export function compileScss(): string {
  try {
    exec(`sass ${SRC}/styles.scss ${TMP}/styles.css --load-path="${LOCAL_STATE}"`)
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

  // Add the symlink ags_theme.scss to the files to watch
  scssFiles.push(`${HOME_DIR}/.local/state/theme/ags_theme.scss`)

  // Compile scss files at startup
  compileScss()

  scssFiles
    .forEach(file =>
      monitorFile(file, compileScss)
    )
})()
