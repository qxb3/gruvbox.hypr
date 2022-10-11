function _G.map(mode, lhs, rhs, opts)
  local options = { noremap = true, silent = true }
  if opts then
    options = vim.tbl_extend('force', options, opts)
  end
  vim.api.nvim_set_keymap(mode, lhs, rhs, options)
end

-- Change leader to comma
vim.g.mapleader = ','

-- Map Esc to qq
map('i', 'qq', '<Esc>')
map('v', 'qq', '<Esc>')

-- Map :source to mm
map('n', 'mm', ':source<CR>')

-- Buffer management
map('n', '<C-o>', ':bprev<CR>')
map('n', '<C-p>', ':bnext<CR>')
map('n', '<C-x>', ':bd<CR>')

--  Remove search highlights
map('n', '<leader>n', ':nohl<CR>')

-- Fast saving with <leader> and s
map('n', '<leader>s', ':w<CR>')
map('i', '<leader>s', '<C-c>:w<CR>')

-- Close all windows and exit from Neovim with <leader> and q
map('n', '<leader>q', ':qa!<CR>')

-- Map <Esc> to exit in terminal mode
map('t', 'qq', [[<C-\><C-n>]])

------------------------------------------------------------
-- Plugin Mappings
------------------------------------------------------------
-- Mappings for for fzf.vim
map('n', '<C-f>', ':Files<CR>')
map('n', '<C-g>', ':Rg<CR>')

-- Mappings for nvim-tree
map('n', '<C-s>', ':NvimTreeFindFileToggle<CR>')

-- Mappings for floaterm
vim.g.floaterm_keymap_new    = '<leader>tn'
vim.g.floaterm_keymap_prev   = '<leader>to'
vim.g.floaterm_keymap_next   = '<leader>tp'
vim.g.floaterm_keymap_toggle = '<leader>tt'
