import { Tree, FType } from '../utils'
import { exec, Variable } from 'astal'

const pkgs = Variable(getPkgs())
  .poll(10000, () => getPkgs())

const uptime = Variable(getUptime())
  .poll(1000, () => getUptime())

function getGpus(): Tree[] {
  return exec(
    `bash -c "lspci | grep -i 'vga\\|3d' | awk -F ': ' '{print $2}' | sed -E 's/.*(HD Graphics.*|GeForce.*|Radeon.*)[^)]*/\\1/'"`
  )
    .replace(/\(.*\)|\]/g, '')
    .split('\n')
    .map((gpu, i) => ({
      type: FType.FILE,
      name: `gpu${i}`,
      icon: '󰊖',
      value: gpu
    }))
}

function getPkgs() {
  return exec(
    `bash -c "pacman -Q | wc -l"`
  )
}

function getUptime() {
  return exec(
    `bash -c "uptime -p | awk '{print $2, $3}' | cut -d ',' -f1"`
  )
}

const fetch: Tree = {
  type: FType.DIR,
  name: 'fetch',
  children: [
    {
      type: FType.FILE,
      name: 'device',
      icon: '󰌢',
      value: exec(
        `bash -c "hostnamectl | grep 'Hardware Model' | awk -F ': ' '{print $2}'"`
      )
    },
    {
      type: FType.FILE,
      name: 'cpu',
      icon: '',
      value: exec(
        `bash -c "lscpu | grep 'Model name' | awk -F: '{print $2}' | sed -E 's/^[ \t]*| CPU.*$//g' | sed -E 's/\(R\)|\(TM\)//g'"`
      ).trim().replaceAll('()', '')
    },
    ...getGpus(),
    {
      type: FType.FILE,
      name: 'user',
      icon: '',
      value: USER
    },
    {
      type: FType.WIDGET,
      name: 'pkgs',
      icon: '󰏓',
      widget: (
        <label
          label={pkgs()}
        />
      )
    },
    {
      type: FType.WIDGET,
      name: 'uptime',
      icon: '󱑆',
      widget: (
        <label
          label={uptime()}
        />
      )
    }
  ]
}

export default fetch
