lua << EOF
require('lualine').setup({
  options = {
    theme = 'gruvbox_dark',
    component_separators = { left = '|', right = '|' },
    section_separators = { left = '', right = '' }
  }
})
EOF
