import HyprlandService from 'gi://AstalHyprland'
import TrayService from 'gi://AstalTray'
import BatteryService from 'gi://AstalBattery'

import { App, Astal, Gtk, Gdk } from 'astal/gtk3'
import { bind, exec, execAsync, timeout } from 'astal'

import BatteryIcon from '../../widgets/BatteryIcon'

import AudioControlsMenu from './menu/AudioControlsMenu'
import SystemControlsMenu from './menu/SystemControlsMenu'
import BatteryMenu from './menu/BatteryMenu'
import CalendarMenu from './menu/CalendarMenu'

import SideBar from './sidebar/SideBar'

import {
  revealSideBar,
  sideBarShown
} from './sidebar/vars'

import {
  time,
  revealSysTray,
  revealAudioControlsMenu,
  revealSystemControlsMenu,
  revealBatteryMenu,
  revealCalendarMenu
} from './menu/vars'

const hyprland = HyprlandService.get_default()
const tray = TrayService.get_default()
const battery = BatteryService.get_default()

function Divider() {
  return (
    <box className='divider' />
  )
}

function StartSection() {
  return (
    <box
      className='start'
      valign={Gtk.Align.START}
      halign={Gtk.Align.CENTER}
      spacing={4}
      vertical={true}>
      {/* SideBar Button */}
      <button
        className='sidebar_button'
        cursor='pointer'
        onClick={() => revealSideBar.set(!revealSideBar.get())}>
        <box css={`background-image: url("/home/${exec('whoami')}/.face")`} />
      </button>

      <Divider />

      {/* Search Button */}
      <button
        className={
          sideBarShown(shown =>
            shown === 'appLauncher'
              ? 'search_button active'
              : 'search_button'
          )
        }
        cursor='pointer'
        onClick={() => {
          sideBarShown.set('appLauncher')
          revealSideBar.set(true)
        }}>
        <label label='' />
      </button>

      {/* Wallpaper Button */}
      <button
        className={
          sideBarShown(shown =>
            shown === 'wallpapers'
              ? 'wallpaper_button active'
              : 'wallpaper_button'
          )
        }
        cursor='pointer'
        onClick={() => {
          sideBarShown.set('wallpapers')
          revealSideBar.set(true)
        }}>
        <label label='󰸉' />
      </button>

      {/* Systray */}
      <box
        className='systray'
        vertical={true}>
        <revealer
          revealChild={revealSysTray(v => v)}
          transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
          transitionDuration={300}>
          <box
            className='apps'
            vertical={true}
            spacing={8}>
            {bind(tray, 'items')
              .as(apps => apps.map(app =>
                <button
                  className='app'
                  cursor='pointer'
                  onClickRelease={(self, event) => {
                    if (event.button === Astal.MouseButton.PRIMARY) app.activate(0, 0)
                    if (event.button === Astal.MouseButton.SECONDARY) {
                      const menu = app.create_menu()!
                      Astal.widget_toggle_class_name(menu, 'systray_menu', true)
                      menu.popup_at_widget(self, Gdk.Gravity.EAST, Gdk.Gravity.WEST, null)
                    }
                  }}>
                  <icon
                    gIcon={app.gicon}
                    css='font-size: 22px;'
                  />
                </button>
              ))
            }
          </box>
        </revealer>

        <button
          className='button'
          cursor='pointer'
          onClick={() => revealSysTray.set(!revealSysTray.get())}
          setup={(self) => {
            self.hook(revealSysTray, () => {
              if (revealSysTray.get())
                timeout(5000, () => revealSysTray.set(false))
            })
          }}>
          <label label={revealSysTray(v => v ? '󰅃' : '󰅀')} />
        </button>
      </box>
    </box>
  )
}

function CenterSection() {
  return (
    <box
      className='center'
      valign={Gtk.Align.CENTER}
      vertical={true}
      spacing={8}>
      {/* Workspace Indicator */}
      <box
        className='workspace'
        vertical={true}
        spacing={4}>
        {Array.from({ length: 5 }).map((_, i) =>
          <button
            className='button'
            cursor='pointer'
            halign={Gtk.Align.CENTER}
            onClick={() => hyprland.message(`dispatch workspace ${i + 1}`)}
            setup={(self) => {
              self.hook(hyprland, 'event', () => {
                self.toggleClassName('active', hyprland.get_focused_workspace().get_id() === i + 1)
              })
            }}/>
        )}
      </box>
    </box>
  )
}

function EndSection() {
  return (
    <box
      className='end'
      valign={Gtk.Align.END}
      halign={Gtk.Align.CENTER}
      vertical={true}
      spacing={4}>
      {/* Desktop Controls */}
      <box
        className='desktop_controls'
        vertical={true}>

        {/* Audio Control */}
        <button
          className='audio'
          cursor='pointer'
          setup={() => <AudioControlsMenu />}
          onClick={() => revealAudioControlsMenu.set(!revealAudioControlsMenu.get())}>
          <label label='󰋎' />
        </button>

        {/* System Control */}
        <button
          className='system'
          cursor='pointer'
          setup={() => <SystemControlsMenu />}
          onClick={() => revealSystemControlsMenu.set(!revealSystemControlsMenu.get())}>
          <label label='' />
        </button>

        {/* Battery Button */}
        <button
          className={
            bind(battery, 'charging').as(charging =>
              charging ? 'battery charging' : 'battery discharging'
            )
          }
          cursor='pointer'
          visible={
            bind(battery, 'device_type').as(type =>
              type === BatteryService.Type.BATTERY ? true : false
            )
          }
          setup={() => <BatteryMenu />}
          onClick={() => revealBatteryMenu.set(!revealBatteryMenu.get())}>
          {bind(battery, 'charging').as(charging => (
            <BatteryIcon charging={charging} />
          ))}
        </button>

        {/* Screenshot Control */}
        <button
          className='screenshot'
          cursor='pointer'
          onClick={() => execAsync(`bash -c '~/.config/hypr/scripts/screenshot.sh p'`)}>
          <label label='󰄄' />
        </button>
      </box>

      {/* Time Indicator */}
      <button
        className='time'
        cursor='pointer'
        setup={() => <CalendarMenu />}
        onClick={() => revealCalendarMenu.set(!revealCalendarMenu.get())}>
        <label label={time()} />
      </button>
    </box>
  )
}

export default function(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      namespace='bar'
      application={App}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
      keymode={
        sideBarShown(shown =>
          shown === 'appLauncher'
            ? Astal.Keymode.EXCLUSIVE
            : Astal.Keymode.NONE
        )
      }>
      <box>
        <SideBar />

        <box className='bar'>
          <centerbox
            className='sections'
            vertical={true}>
            {StartSection()}
            {CenterSection()}
            {EndSection()}
          </centerbox>
        </box>
      </box>
    </window>
  )
}
