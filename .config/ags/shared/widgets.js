export function BarDivider(margin = '5px', divider = '') {
  return Widget.Label({
    className: 'divider',
    label: divider,
    css: `
      font-weight: 900;
      margin: 0 ${margin};
    `
  })
}

export default {
  BarDivider
}
