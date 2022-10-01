lua << EOF
require('lualine').setup({
  options = {
    theme = 'edge',
    component_separators = { left = '|', right = '|' },
    section_separators = { left = '', right = '' }
  }
})
EOF
