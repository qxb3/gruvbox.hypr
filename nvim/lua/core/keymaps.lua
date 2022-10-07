function _G.map(mode, lhs, rhs, opts)
  local options = { noremap = true, silent = true }
  if opts then
    options = vim.tbl_extend('force', options, opts)
  end
  vim.api.nvim_set_keymap(mode, lhs, rhs, options)
end

-- Change leader to comma
vim.g.mapleader = ','

-- Map Esc to qq
map('i', 'qq', '<Esc>')
map('v', 'qq', '<Esc>')

-- Map :source to mm
map('n', 'mm', ':source<CR>')

-- Buffer management
map('n', '<C-o>', ':bprev<CR>')
map('n', '<C-p>', ':bnext<CR>')
map('n', '<C-x>', ':bd<CR>')

--  Remove search highlights
map('n', '<leader>n', ':nohl<CR>')

-- Fast saving with <leader> and s
map('n', '<leader>s', ':w<CR>')
map('i', '<leader>s', '<C-c>:w<CR>')

-- Close all windows and exit from Neovim with <leader> and q
map('n', '<leader>q', ':qa!<CR>')

-- Map <Esc> to exit in terminal mode
map('t', 'qq', [[<C-\><C-n>]])

------------------------------------------------------------
-- Plugin Mappings
------------------------------------------------------------
-- Autocompletion (coc.nvim)
vim.cmd([[
  function! s:show_documentation()
    if CocAction('hasProvider', 'hover')
      call CocActionAsync('doHover')
     else
      call feedkeys('K', 'in')
    endif
  endfunction

  inoremap <silent><expr> <c-@> coc#refresh()
  nnoremap <silent> D :call <SID>show_documentation()<CR>

  " GoTo code navigation.
  nmap <silent> gd <Plug>(coc-definition)
  nmap <silent> gy <Plug>(coc-type-definition)
  nmap <silent> gi <Plug>(coc-implementation)
  nmap <silent> gr <Plug>(coc-references)

  " Utils"
  nmap rn <Plug>(coc-rename)
  xmap f <Plug>(coc-format-selected)
  nmap f <Plug>(coc-format-selected)

  " Autocomplete when enter
  inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>""
]])

-- Mappings for for fzf.vim
map('n', '<C-f>', ':Files<CR>')
map('n', '<C-g>', ':Rg<CR>')

-- Mappings for nerdtree
map('n', '<C-s>', ':NvimTreeFindFileToggle<CR>')
