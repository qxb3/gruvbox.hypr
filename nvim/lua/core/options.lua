local option = vim.opt

------------------------------------------------------------
-- General
------------------------------------------------------------
option.mouse = 'a'
option.swapfile = false
option.sidescrolloff = 12
option.scrolloff = 5
option.completeopt = 'menuone,noinsert,noselect'

------------------------------------------------------------
-- UI
------------------------------------------------------------
option.termguicolors = true
option.relativenumber = true
option.number = true
option.cursorline = true
option.guicursor = ''
option.wrap = false

------------------------------------------------------------
-- Tabs, Indenting
------------------------------------------------------------
option.smartindent = true
option.expandtab = true
option.shiftwidth = 2
option.tabstop = 2

------------------------------------------------------------
-- Memory, CPU
------------------------------------------------------------
option.hidden = true
option.history = 100
option.lazyredraw = true
option.synmaxcol = 240
option.updatetime = 700

------------------------------------------------------------
-- Colorscheme
------------------------------------------------------------
vim.g.gruvbox_contrast_dark = 'hard'
vim.g.gruvbox_contrast_light='hard'
vim.g.gruvbox_hls_cursor = 'gray'
vim.g.gruvbox_improved_warnings = '1'
vim.cmd('colorscheme gruvbox')
