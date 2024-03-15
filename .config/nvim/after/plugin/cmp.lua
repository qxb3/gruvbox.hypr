local cmp = require('cmp')
local cmp_autopairs = require('nvim-autopairs.completion.cmp')

cmp.event:on('confirm_done', cmp_autopairs.on_confirm_done())

cmp.setup({
  snippet = {
    expand = function(args)
      require('luasnip').lsp_expand(args.body)
    end
  },

  mapping = {
    ['<CR>'] = cmp.mapping.confirm({ select = true }),
    ['<C-Space>'] = cmp.mapping.complete()
  },
  sources = cmp.config.sources({
    { name = 'buffer' },
    { name = 'nvim_lsp' },
    { name = 'luasnip' },
    { name = 'path' },
    { name = 'nvim_lsp_signature_help' },
  }),
  formatting = {
    fields = { 'abbr', 'kind', 'menu' },
    format = require('lspkind').cmp_format({
      mode = 'symbol_text',
      ellipsis_char = '...',
<<<<<<< HEAD:.config/nvim/lua/plugins/cmp.lua
    })
=======
      menu = {}
    }),
    expandable_indicator = true
>>>>>>> 9ad6b71 (config(nvim): ultimate organizing and cleanup):.config/nvim/after/plugin/cmp.lua
  },
  window = {
    completion = cmp.config.window.bordered(),
    documentation = cmp.config.window.bordered()
  },
  experimental = {
    ghost_text = true
  }
})
