require('ccc').setup({
  save_on_exit = true,
  highlighter = {
    auto_enable = true
  },
  win_opts = {
    relative = 'editor'
  }
})

map('n', '<leader>cp', ':CccPick<CR>')
