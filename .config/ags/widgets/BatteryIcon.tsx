import BatteryService from 'gi://AstalBattery'
import { bind, Binding } from 'astal'

const battery = BatteryService.get_default()

export default function BatteryIcon({ className = '', charging }: {
  className?: string | Binding<string | undefined> | undefined,
  charging: boolean
}) {
  return (
    <label
      className={className}
      label={
        bind(battery, 'percentage').as(percentage => {
          percentage *= 100

          if (!charging) {
            if (percentage < 5)     return '󰂎'
            if (percentage < 10)    return '󰁺'
            if (percentage < 20)    return '󰁻'
            if (percentage < 30)    return '󰁼'
            if (percentage < 40)    return '󰁽'
            if (percentage < 50)    return '󰁾'
            if (percentage < 60)    return '󰁿'
            if (percentage < 70)    return '󰂀'
            if (percentage < 80)    return '󰂁'
            if (percentage < 90)    return '󰂂'
            if (percentage <= 100)  return '󰁹'
          }

          if (charging) {
            if (percentage < 10)    return '󰢜'
            if (percentage < 20)    return '󰂆'
            if (percentage < 30)    return '󰂇'
            if (percentage < 40)    return '󰂈'
            if (percentage < 50)    return '󰢝'
            if (percentage < 60)    return '󰂉'
            if (percentage < 70)    return '󰢞'
            if (percentage < 80)    return '󰂊'
            if (percentage < 90)    return '󰂋'
            if (percentage <= 100)  return '󰂅'
          }
        })
      }
    />
  )
}
