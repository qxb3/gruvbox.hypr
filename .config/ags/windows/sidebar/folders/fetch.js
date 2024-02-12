export default {
  type: 'dir',
  children: {
    user: { type: 'file', icon: '', value: Utils.exec(`whoami`) },
    host: { type: 'file', icon: '󰧨', value: Utils.exec(`hostname`) },
    pkgs: { type: 'file', icon: '󰏓', value: Utils.exec(`bash -c 'pacman -Q | wc -l'`) }
  }
}
