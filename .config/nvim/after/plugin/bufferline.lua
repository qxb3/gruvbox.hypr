require('bufferline').setup({
  options = {
    seperator_style = 'padded_slant',
    diagnostics = 'nvim_lsp',
    offsets = {
      {
        filetype = 'NvimTree',
        text = 'File Explorer',
        text_align = 'center',
        separator = true
      }
    }
  }
})

vim.keymap.set('n', '<C-o>', ':bprev<CR>')
vim.keymap.set('n', '<C-p>', ':bnext<CR>')
vim.keymap.set('n', '<C-x>', ':bd<CR>')

vim.keymap.set('n', '<A-1>', ':BufferLineGoToBuffer 1<CR>')
vim.keymap.set('n', '<A-2>', ':BufferLineGoToBuffer 2<CR>')
vim.keymap.set('n', '<A-3>', ':BufferLineGoToBuffer 3<CR>')
vim.keymap.set('n', '<A-4>', ':BufferLineGoToBuffer 4<CR>')
vim.keymap.set('n', '<A-5>', ':BufferLineGoToBuffer 5<CR>')
