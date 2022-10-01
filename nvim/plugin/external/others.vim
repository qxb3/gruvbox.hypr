" vim-impatient (Startup optimization)
lua require('impatient')

" vim-svelte-plugin
let g:svelte_indent_script = 2
let g:svelte_indent_style = 2

" vim-closetag
let g:closetag_filenames = '*.html,*.svelte,*.ejs'

" vim-better-whitespace
let g:strip_whitespace_on_save = 1
let g:strip_whitespace_confirm = 0

" vim-commentary
autocmd FileType apache setlocal commentstring=#\ %s
