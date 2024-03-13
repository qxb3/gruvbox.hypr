-- Improves startup
vim.loader.enable()

-- General Stuff
require('core/options')
require('core/keymaps')

-- packer.nvim plugins
require('plugins')

-- LSP & Treesitter
require('plugins/treesitter')
require('plugins/zero')
require('plugins/cmp')
require('plugins/prettier')

-- Usefull Stuff
require('plugins/telescope')
require('plugins/nvim-tree')
require('plugins/autopairs')
require('plugins/toggleterm')
require('plugins/whitespace')

-- UI
require('plugins/colorscheme')
require('plugins/transparent')
require('plugins/bufferline')
require('plugins/lualine')
require('plugins/indent-lines')
