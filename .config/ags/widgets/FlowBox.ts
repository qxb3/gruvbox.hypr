import { astalify, Gtk, type ConstructProps } from 'astal/gtk3'
import { GObject } from 'astal'

export default class FlowBox extends astalify(Gtk.FlowBox) {
  static { GObject.registerClass(this) }

  constructor(props: ConstructProps<FlowBox, Gtk.FlowBox.ConstructorProps>) {
    super(props as any)
  }
}
