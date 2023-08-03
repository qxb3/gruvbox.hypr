require('bufferline').setup({
  options = {
    modified_icon = '*',
    seperator_style = 'padded_slant',
    diagnostics = 'nvim_lsp',
    offsets = {
      {
        filetype = "NvimTree",
        text = "File Explorer",
        separator = true
      }
    }
  }
})
