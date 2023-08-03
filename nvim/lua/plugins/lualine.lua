vim.opt.laststatus = 3

require('lualine').setup({
  options = {
    theme = 'tokyonight',
    component_separators = { left = '|', right = '|' },
    section_separators = { left = '', right = '' },
    disabled_filetypes = { 'packer', 'NVimTree' }
  }
})
