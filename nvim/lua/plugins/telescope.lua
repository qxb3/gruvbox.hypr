require('telescope').setup()

local builtin = require('telescope.builtin')

vim.keymap.set('n', '<C-f>', builtin.find_files, {})
vim.keymap.set('n', '<C-t>', builtin.live_grep, {})
vim.keymap.set('n', '<C-b>', builtin.git_branches, {})
vim.keymap.set('n', '<C-g>', builtin.git_commits, {})
