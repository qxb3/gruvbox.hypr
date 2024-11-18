import { App } from 'astal/gtk3'
import Bar from './windows/bar/Bar'

import style from './styles.scss'

App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar)
    }
})
