local builtin = require('telescope.builtin')
local actions = require("telescope.actions")

require('telescope').setup({
  defaults = {
    file_ignore_patterns = {
      'node_modules', 'dist', 'build', 'static',
      'packer_compiled.lua', 'nvim-tree.lua',
      'target', 'CMakeFiles'
    },
    mappings = {
      n = {
        ['<CR>'] = actions.select_vertical
      },
      i = {
        ['<CR>'] = actions.select_vertical
      }
    }
  }
})

require('telescope').load_extension('neoclip')

vim.keymap.set('n', '<C-x>', ':bd<CR>', { silent = true })

vim.keymap.set('n', '<C-f>', builtin.find_files, {})
vim.keymap.set('n', '<C-g>', builtin.live_grep, {})
vim.keymap.set('n', '<C-b>', builtin.buffers, {})
vim.keymap.set('n', '<leader>c', ':Telescope neoclip<CR>', {})

vim.keymap.set('n', '<leader>gc', builtin.git_commits, {})
vim.keymap.set('n', '<leader>gb', builtin.git_branches, {})
