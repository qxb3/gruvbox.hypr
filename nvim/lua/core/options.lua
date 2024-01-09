local option = vim.opt

------------------------------------------------------------
-- General
------------------------------------------------------------
option.mouse = 'a'
option.backupcopy = 'yes'
option.swapfile = false
option.sidescrolloff = 12
option.scrolloff = 5
option.completeopt = 'menuone,noinsert,noselect'
option.shell = '/bin/zsh'

------------------------------------------------------------
-- UI
------------------------------------------------------------
option.termguicolors = true
option.relativenumber = true
option.number = true
option.cursorline = true
option.guicursor = ''
option.wrap = false
option.cmdheight = 0

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
option.updatetime = 250
