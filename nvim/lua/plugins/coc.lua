function _G.show_documentation()
  local cw = vim.fn.expand('<cword>')
  if vim.fn.index({'vim', 'help'}, vim.bo.filetype) >= 0 then
    vim.api.nvim_command('h ' .. cw)
  elseif vim.api.nvim_eval('coc#rpc#ready()') then
    vim.fn.CocActionAsync('doHover')
  else
    vim.api.nvim_command('!' .. vim.o.keywordprg .. ' ' .. cw)
  end
end

-- Use D to show documantation
map('n', 'D', '<CMD>lua _G.show_documentation()<CR>')

-- Use <C-space> to show competion
map('i', '<C-space>', 'coc#refresh()', { expr = true })

-- Code navigation
map('n', 'gd', '<Plug>(coc-definition)')
map('n', 'gy', '<Plug>(coc-type-definition)')
map('n', 'gi', '<Plug>(coc-implementation)')
map('n', 'gr', '<Plug>(coc-references)')

-- Use `[g` and `]g` to navigate diagnostics
map('n', '[g', '<Plug>(coc-diagnostic-prev)')
map('n', ']g', '<Plug>(coc-diagnostic-next)')

-- Use <leader>f to format selected code.
map('x', '<leader>f', '<Plug>(coc-format-selected)')
map('n', '<leader>f', '<Plug>(coc-format-selected)')

-- Use rn to rename variables
map('n', 'rn', '<Plug>(coc-rename)')

-- Autocomplete when enter
vim.cmd([[
  inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>""
]])
