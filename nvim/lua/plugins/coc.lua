" Show autocomplete and docs
inoremap <silent><expr> <c-@> coc#refresh()
nnoremap <silent> D :call <SID>show_documentation()<CR>

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

function! s:show_documentation()
  if CocAction('hasProvider', 'hover')
    call CocActionAsync('doHover')
   else
    call feedkeys('K', 'in')
  endif
endfunction

" Joyfull stuf
nmap rn <Plug>(coc-rename)
xmap f <Plug>(coc-format-selected)
nmap f <Plug>(coc-format-selected)

" Autocomplete when enter
inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm() : "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>""
