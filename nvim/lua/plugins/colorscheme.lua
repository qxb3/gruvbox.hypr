require('tokyonight').setup({
  styles = {
    comments = { italic = false },
    keywords = { italic = true },
    sidebars = 'transparent',
    floats = 'transparent',
  },
})

vim.cmd('colorscheme tokyonight')
-- vim.o.background = "dark"
-- vim.cmd("colorscheme gruvbox")
