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
option.list = true
option.listchars = { eol = '↲', --[[ tab = '» ', ]] nbsp = '␣' }

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
vim.cmd("colorscheme oxocarbon")

local oxocarbon = require('oxocarbon').oxocarbon
vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
vim.api.nvim_set_hl(0, "CmpItemKindTypeParameter", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindText", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindEnum", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindKeyword", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindConstant", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindConstructor", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindReference", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindFunction", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindStruct", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindClass", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindModule", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindOperator", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindField", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindProperty", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindEvent", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindUnit", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindSnippet", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindFolder", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindVariable", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindFile", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindMethod", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindValue", {fg = oxocarbon.base09, bg = oxocarbon.none})
vim.api.nvim_set_hl(0, "CmpItemKindEnumMember", {fg = oxocarbon.base09, bg = oxocarbon.none})

------------------------------------------------------------
-- Vim Remaps                                             --
------------------------------------------------------------

-- Map Esc to qq
vim.keymap.set('i', 'qq', '<Esc>', { silent = true })
vim.keymap.set('v', 'qq', '<Esc>', { silent = true })
vim.keymap.set('i', 'qq', '<Esc>', { silent = true })

-- Split focus
vim.keymap.set('n', '<C-h>', '<C-w><C-h>', { silent = true })
vim.keymap.set('n', '<C-l>', '<C-w><C-l>', { silent = true })
vim.keymap.set('n', '<C-j>', '<C-w><C-j>', { silent = true })
vim.keymap.set('n', '<C-k>', '<C-w><C-k>', { silent = true })

vim.keymap.set('n', '<leader>so', ':source %<CR>')
vim.keymap.set('n', '<leader>nh', ':nohl<CR>')
vim.keymap.set('v', '<leader>y', '"+y')

vim.keymap.set('n', 'q', '<Nop>', { silent = true })
vim.keymap.set('n', 'Q', '<Nop>', { silent = true })
vim.keymap.set('n', '@', '<Nop>', { silent = true })
