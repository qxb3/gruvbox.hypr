local zero = require('lsp-zero').preset({
  name = 'minimal',
  set_lsp_keymaps = true,
  manage_nvim_cmp = true,
  suggest_lsp_servers = true
})

zero.on_attach(function(client, bufnr)
  zero.default_keymaps({ buffer = bufnr })

  zero.format_on_save({
  format_opts = {
    async = false,
    timeout_ms = 10000,
  },
  servers = {
    ['tsserver'] = {'javascript', 'typescript'},
    ['svelte'] = {'svelte'}
  }
})
end)

zero.setup()
