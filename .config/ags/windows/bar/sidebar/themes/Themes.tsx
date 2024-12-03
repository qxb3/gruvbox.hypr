import { Gtk } from 'astal/gtk3'
import { exec, execAsync, readFile } from 'astal'

import FlowBox from '@widgets/FlowBox'

import {
  revealSideBar,
  sideBarShown
} from '../vars'

interface ThemeColor {
  name: string
  color: string
}

interface Theme {
  name: string
  path: string
  colors: ThemeColor[]
}

function getThemes(): Theme[] {
  const themes =
    exec(`find -L ${SRC}/themes -iname '*.scss' ! -name 'current.scss'`)
      .split('\n')
      .map(file => ({
        name: file.split('/').pop()!.replace('.scss', ''),
        path: file,
        lines: readFile(file)
                  .split('\n')
                  .filter(line => line.startsWith('$') && line.includes('#'))
      }))

  return themes
    .map(theme => ({
      name: theme.name,
      path: theme.path,
      colors: theme.lines.map(line => {
        const [identifier, value] = line.split(':')
        const name = identifier.replace('$', '').trim()
        const color = value.replace(';', '').trim()

        return { name, color }
      })
    }))
}

function ThemeName({ theme }: { theme: Theme }) {
  return (
    <box
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}>
      <label
        className='name'
        label={theme.name}
        justify={Gtk.Justification.CENTER}
        hexpand={true}
        css={
          `color: ${
            theme.colors.find(
              color => color.name === 'fg'
            )!.color
          }`
        }
      />
    </box>
  )
}

function ThemeColors({ theme }: { theme: Theme }) {
  return (
    <FlowBox
      className='colors'
      maxChildrenPerLine={4}
      columnSpacing={8}
      rowSpacing={8}
      homogeneous={true}>
      {theme.colors.map(({ name: _, color }) => (
        <box
          className='color'
          css={
            `background-color: ${color}`
          }>
        </box>
      ))}
    </FlowBox>
  )
}

function ApplyThemeButton({ theme }: { theme: Theme}) {
  return (
    <button
      className='apply_theme_button'
      cursor='pointer'
      css={
        `background-color: ${
          theme.colors.find(
            color => color.name === 'green'
          )!.color
        }`
      }
      onClick={() => {
        const currentTheme =
          exec(`readlink ${LOCAL_STATE}/ags_theme.scss`)
            .split('/')
            .pop()!
            .replace('.scss', '')

        if (currentTheme === theme.name)
          return execAsync(`notify-send 'Theme Manager' 'Already have the same theme'`)

        if (currentTheme !== theme.name) {
          // Symlink the theme and css hot reload will do the rest
          exec(`ln -sf ${theme.path} ${LOCAL_STATE}/ags_theme.scss`)

          // Sync other stuff to the current colorscheme
          execAsync(`bash -c '${SRC}/themes/sync.sh ${theme.name}'`)
        }

        sideBarShown.set('home')
        revealSideBar.set(false)
      }}>
      <label
        label='Apply Theme'
        css={
          `color: ${
            theme.colors.find(
              color => color.name === 'bg'
            )!.color
          }`
        }
      />
    </button>
  )
}

function Themes() {
  const themes = getThemes()

  return (
    <scrollable vexpand={true}>
      <box
        className='list'
        vertical={true}
        spacing={16}>
        {themes.map(theme => (
          <box
            className='theme'
            vertical={true}
            spacing={12}
            css={
              `background-color: ${
                theme.colors.find(color => color.name === 'bgh')!.color
              }`
            }>
            <ThemeName theme={theme} />
            <ThemeColors theme={theme} />
            <ApplyThemeButton theme={theme} />
          </box>
        ))}
      </box>
    </scrollable>
  )
}

export default function() {
  return (
    <box
      name='themes'
      className='themes'>
      <Themes />
    </box>
  )
}
