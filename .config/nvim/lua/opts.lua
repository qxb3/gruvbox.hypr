local option = vim.opt

-- Changes default leader
vim.g.mapleader = 'z'

------------------------------------------------------------
-- General                                                --
------------------------------------------------------------
option.mouse = 'a'
option.backupcopy = 'yes'
option.swapfile = false
option.sidescrolloff = 12
option.scrolloff = 5
option.completeopt = 'menuone,noinsert,noselect'
option.shell = '/bin/zsh'

------------------------------------------------------------
-- UI                                                     --
------------------------------------------------------------
option.termguicolors = true
option.relativenumber = true
option.number = true
option.cursorline = true
option.guicursor = ''
option.wrap = false
option.cmdheight = 1

------------------------------------------------------------
-- Tabs, Indenting                                        --
------------------------------------------------------------
option.smartindent = true
option.expandtab = true
option.shiftwidth = 2
option.tabstop = 2

------------------------------------------------------------
-- Memory, CPU                                            --
------------------------------------------------------------
option.hidden = true
option.history = 100
option.lazyredraw = true
option.synmaxcol = 240
option.updatetime = 4000

------------------------------------------------------------
-- Colorscheme                                            --
------------------------------------------------------------

vim.o.background = "dark"
vim.cmd("colorscheme gruvbox")

------------------------------------------------------------
-- Vim Remaps                                             --
------------------------------------------------------------

-- Map Esc to qq
vim.keymap.set('i', 'qq', '<Esc>')
vim.keymap.set('v', 'qq', '<Esc>')
vim.keymap.set('i', 'QQ', '<Esc>')
vim.keymap.set('v', 'QQ', '<Esc>')

-- Buffer management
vim.keymap.set('n', '<C-o>', ':bprev<CR>')
vim.keymap.set('n', '<C-p>', ':bnext<CR>')
vim.keymap.set('n', '<C-x>', ':bd<CR>')

vim.keymap.set('n', 'ss', ':source %<CR>')       -- Map :source to mm
vim.keymap.set('n', '<leader>nh', ':nohl<CR>') --  Remove search highlights
vim.keymap.set('n', 'q', '<leader>re')         -- Map record macro to <leader>Q
