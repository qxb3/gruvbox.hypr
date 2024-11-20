import { astalify, Gtk, type ConstructProps } from 'astal/gtk3'
import { GObject } from 'astal'

export default class ProgressBar extends astalify(Gtk.ProgressBar) {
  static { GObject.registerClass(this) }

  constructor(props: ConstructProps<ProgressBar, Gtk.ProgressBar.ConstructorProps>) {
    super(props as any)
  }
}
