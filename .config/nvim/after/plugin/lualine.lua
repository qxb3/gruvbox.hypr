vim.opt.laststatus = 1

require('lualine').setup({
  options = {
    theme = {
      normal = {
        a = { fg = '#C9C6BC', bg = '#2A2A2A', gui = 'bold' },
        b = { fg = '#C9C6BC', bg = '#2A2A2A' },
        c = { fg = '#C9C6BC', bg = '#2A2A2A' },
      },
      insert = {
        a = { fg = '#C9C6BC', bg = '#2A2A2A', gui = 'bold' },
      },
      visual = {
        a = { fg = '#C9C6BC', bg = '#2A2A2A', gui = 'bold' },
      },
      replace = {
        a = { fg = '#C9C6BC', bg = '#2A2A2A', gui = 'bold' },
      },
      command = {
        a = { fg = '#C9C6BC', bg = '#2A2A2A', gui = 'bold' },
      },
      inactive = {
        a = { fg = '#707880', bg = '#2A2A2A' },
        b = { fg = '#707880', bg = '#2A2A2A' },
        c = { fg = '#707880', bg = '#2A2A2A' },
      },
    },
    component_separators = { left = '|', right = '|' },
    section_separators = { left = '', right = '' },
    disabled_filetypes = { 'packer', 'NVimTree' }
  }
})
