import ProgressBar from '@widgets/ProgressBar'

import { Tree, FType } from '../utils'
import { exec, Variable } from 'astal'

const cpu = Variable(getCpu())
  .poll(CPU_POLL, () => getCpu())

const ram = Variable(getRam())
  .poll(RAM_POLL, () => getRam())

const disks = Variable(getDisks())
  .poll(DISKS_POLL, () => getDisks())

function getCpu() {
  const cpu = exec(`top -b -n 1`)
    .split('\n')
    .find(line => line.includes('Cpu(s)'))!
    .split(/\s+/)[1]
    .replace(',', '.')

  return parseFloat(cpu) / 100
}

function getRam() {
  const [total, used] = exec(`free`)
    .split('\n')
    .find(line => line.includes('Mem:'))!
    .split(/\s+/)
    .splice(1, 2)

  return parseFloat(used) / parseFloat(total)
}

function getDisks() {
  return exec('df -h')
    .split('\n')
    .filter(line => line.includes('/') && !line.includes('tmpfs'))
    .map(line => {
      const partition = line
        .split(/\s+/)[5]

      const [size, used] = line
        .split(/\s+/)
        .slice(1, 3)
        .map(line => parseFloat(line.replace('G', '')))

      return {
        partition,
        size,
        used
      }
    })
}

const stats: Tree = {
  type: FType.DIR,
  name: 'stats',
  children: [
    {
      type: FType.WIDGET,
      name: 'cpu',
      icon: '',
      widget: (
        <box>
          <label label='[' />
          <ProgressBar
            className='metric'
            fraction={cpu()}
          />
          <label label=']' />
        </box>
      )
    },
    {
      type: FType.WIDGET,
      name: 'ram',
      icon: '',
      widget: (
        <box>
          <label label='[' />
          <ProgressBar
            className='metric'
            fraction={ram()}
          />
          <label label=']' />
        </box>
      )
    },
    {
      type: FType.DIR,
      name: 'disks',
      icon: '󰉉',
      children: disks.get().map((disk, i) => {
        return {
          type: FType.WIDGET,
          name: disk.partition,
          widget: (
            <box>
              <label label='[' />
              <ProgressBar
                className='metric'
                fraction={disks(disks => {
                  const disk = disks[i]

                  return disk.used / disk.size
                })}
              />
              <label label=']' />
            </box>
          )
        }
      })
    }
  ]
}

export default stats
