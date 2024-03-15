require('telescope').setup({
  defaults = {
    file_ignore_patterns = {
      'node_modules', 'dist', 'build', 'static',
      'packer_compiled.lua', 'nvim-tree.lua',
      'target', 'CMakeFiles'
    }
  }
})

local builtin = require('telescope.builtin')

vim.keymap.set('n', '<C-f>', builtin.find_files, {})
vim.keymap.set('n', '<C-g>', builtin.live_grep, {})
vim.keymap.set('n', '<C-b>', builtin.git_branches, {})
