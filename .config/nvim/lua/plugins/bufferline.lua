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
    },
    buffer_close_icon = '',
    modified_icon = ''
  }
})
