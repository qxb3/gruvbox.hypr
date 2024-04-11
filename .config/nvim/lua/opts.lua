local option = vim.opt

-- Changes default leader
vim.g.mapleader = ' '

------------------------------------------------------------
-- General                                                --
------------------------------------------------------------
option.mouse = 'a'
option.backupcopy = 'yes'
option.swapfile = false
option.sidescrolloff = 12
option.scrolloff = 12
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
vim.keymap.set('i', 'qq', '<Esc>', { silent = true })
vim.keymap.set('v', 'qq', '<Esc>', { silent = true })
vim.keymap.set('i', 'qq', '<Esc>', { silent = true })

vim.keymap.set('n', '<leader>so', ':source %<CR>')
vim.keymap.set('n', '<leader>nh', ':nohl<CR>')
vim.keymap.set('v', '<leader>y', '"+y')

vim.keymap.set('n', 'q', '<Nop>', { silent = true })
vim.keymap.set('n', 'Q', '<Nop>', { silent = true })
vim.keymap.set('n', '@', '<Nop>', { silent = true })

------------------------------------------------------------
-- Autocmds                                               --
------------------------------------------------------------

vim.api.nvim_create_autocmd("TextYankPost", {
  desc = "Highlight when yanking",
  callback = function ()
    vim.highlight.on_yank()
  end
})
