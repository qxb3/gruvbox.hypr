require('neo-tree').setup({
  enable_git_status = true,
  enable_diagnostics = true,
  modified = {
    symbol = "[+]",
    highlight = "NeoTreeModified",
  },
  window = {
    position = 'float',
    mappings = {
      ['<CR>'] = 'open_vsplit',
      ['d'] = 'add_directory',
      ['x'] = 'delete',
    }
  },
  event_handlers = {
    {
      event = "file_opened",
      handler = function(_)
        require("neo-tree.command").execute({ action = "close" })
      end
    },
  }
})

vim.keymap.set('n', '<C-s>', ':Neotree toggle<CR>', { silent = true })
