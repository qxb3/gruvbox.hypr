import Wp from 'gi://AstalWp'
import Mpris from 'gi://AstalMpris'
import Brightness from '@services/Brightness'

import { FType, Tree } from '@windows/file_explorer/utils'
import { bind } from 'astal'

const audio = Wp.get_default()!.get_audio()!
const spotify = Mpris.Player.new('spotify')
const brightness = Brightness.get_default()

const desktopControls: Tree = {
  type: FType.DIR,
  name: 'desktop_controls',
  children: [
    {
      type: FType.WIDGET,
      name: 'speaker',
      icon: '󰕾',
      widget: (
        <box>
          {bind(audio, 'defaultSpeaker').as(speaker => (
            <box>
              <label label='[' />
              <slider
                value={bind(speaker, 'volume')}
                min={0}
                max={1.5}
                step={0.01}
                drawValue={false}
                hexpand={true}
                cursor='pointer'
                onDragged={({ value }) => speaker.set_volume(value)}
              />
              <label label=']' />
            </box>
          ))}
        </box>
      )
    },
    {
      type: FType.WIDGET,
      name: 'music',
      icon: '󰝚',
      widget: (
        <box>
          <label label='[' />
          <slider
            value={bind(spotify, 'volume')}
            min={0}
            max={1}
            step={0.01}
            drawValue={false}
            hexpand={true}
            cursor='pointer'
            onDragged={({ value }) => spotify.set_volume(value)}
          />
          <label label=']' />
        </box>
      )
    },
    {
      type: FType.WIDGET,
      name: 'bright',
      icon: '󰃠',
      widget: (
        <box>
          <label label='[' />
          <slider
            value={bind(brightness, 'brightness')}
            min={0}
            max={1}
            step={0.01}
            drawValue={false}
            hexpand={true}
            cursor='pointer'
            onDragged={({ value }) => brightness.set_brightness(value)}
          />
          <label label=']' />
        </box>
      )
    }
  ]
}

export default desktopControls
