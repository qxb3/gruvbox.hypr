import { Gtk } from 'astal/gtk3'

export enum FType {
  DIR,
  FILE,
  WIDGET,
  CUSTOM
}

export interface TDir {
  type: FType.DIR
  name: string
  icon?: string
  children: Tree[]
}

export interface TFile {
  type: FType.FILE
  name: string
  icon?: string
  value: string
}

export interface TWidget {
  type: FType.WIDGET
  name: string
  icon?: string
  widget: Gtk.Widget
}

export interface TCustom {
  type: FType.CUSTOM
  widget: Gtk.Widget
}

export type Tree = TDir | TFile | TWidget | TCustom

export function createTree(tree: Tree): Gtk.Widget[] {
  const generatedTree: Gtk.Widget[] = []

  function getPad(tree: Tree): number {
    let maxLength = 0

    function traverse(current: Tree) {
      if (current.type === FType.FILE || current.type === FType.WIDGET) {
        maxLength = Math.max(maxLength, current.name.length)
      }

      if (current.type === FType.DIR) {
        for (const item of current.children) {
          traverse(item)
        }
      }
    }

    traverse(tree)

    return maxLength
  }

  const padSize = getPad(tree)

  function traverse(current: Tree, nested: number) {
    const space = (
      <label
        label={'  '.repeat(nested)}
      />
    )

    generatedTree.push(
      <box className='item'>
        {current.type === FType.DIR && (
          <box className={`dir ${current.name}`}>
            {space}
            <label
              className='down'
              label=''
            />
            <label
              className='text'
              label={`${current.icon ?? ''} ${current.name}`}
            />
          </box>
        )}

        {current.type === FType.FILE && (
          <box className={`file ${current.name}`}>
            {space}
            <label
              className='text'
              label={
                `${current.icon ?? ''} ${current.name.padEnd(padSize)} -> ${current.value}`
              }
            />
          </box>
        )}

        {current.type === FType.WIDGET && (
          <box className={`widget ${current.name}`}>
            {space}
            <label
              className='text'
              label={
                `${current.icon ?? ''} ${current.name.padEnd(padSize)} -> `
              }
            />
            {current.widget}
          </box>
        )}

        {current.type === FType.CUSTOM && (
          <box className='custom'>
            {space}
            {current.widget}
          </box>
        )}
      </box>
    )

    if (current.type === FType.DIR) {
      for (const item of current.children) {
        traverse(item, nested + 1)
      }
    }
  }

  traverse(tree, 0)

  return generatedTree
}
