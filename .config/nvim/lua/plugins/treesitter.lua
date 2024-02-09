require('nvim-treesitter.configs').setup({
  highlight = {
    enable = true
  },
  indent = {
    enable = true
  },
  refactor = {
    highlight_definitions = {
      enable = true
    },
    highlight_current_scope = {
      enable = true
    },
    -- smart_rename = {
    --   enable = true,
    --   keymaps = {
    --     smart_rename = "grn"
    --   }
    -- },
  },
  ensure_installed = "all"
})
