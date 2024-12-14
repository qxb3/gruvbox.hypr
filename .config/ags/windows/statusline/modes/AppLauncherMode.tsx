import Applications from 'gi://AstalApps'

import { Gdk } from 'astal/gtk3'
import { Variable } from 'astal'

import MenuMode from './MenuMode'

const MAX_RESULT = 15

const applications = new Applications.Apps()
  .fuzzy_query('')

const queriedApps = Variable(applications.slice(0, MAX_RESULT))
const selectedApp = Variable(queriedApps.get()[0])
const selectedIndex = Variable(0)

export default function AppLauncherMode(props: { gdkmonitor: Gdk.Monitor }) {
  const { gdkmonitor } = props

  return (
    <MenuMode
      gdkmonitor={gdkmonitor}
      mode='appLauncher'
      items={applications}
      keys={['name']}
      queriedItems={queriedApps}
      selectedItem={selectedApp}
      selectedIndex={selectedIndex}
      maxResult={MAX_RESULT}
      onEnter={(selectedApp) => {
        selectedApp.launch()
      }}>
      {queriedApps(apps => apps.map(app => (
        <box
          className={
            selectedApp(selectedApp =>
              selectedApp.get_name() === app.get_name()
                ? 'selected item'
                : 'item'
            )
          }>
          <label
            className='name'
            label={app.get_name()}
            truncate={true}
          />
        </box>
      )))}
    </MenuMode>
  )
}
