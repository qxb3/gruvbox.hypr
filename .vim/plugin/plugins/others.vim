" This file is for setting plugins options
" That doesn't really need their own files

" Svelte
let g:svelte_indent_script = 2
let g:svelte_indent_style = 2

" Closetag
let g:closetag_filenames = '*.html,*.svelte,*.ejs'

" Vim better whitespace
let g:strip_whitespace_on_save = 1
let g:strip_whitespace_confirm = 0

" Vim commentary
autocmd FileType apache setlocal commentstring=#\ %s

" fzf.vim
let $FZF_DEFAULT_COMMAND='find . \( -name node_modules -o -name .git \) -prune -o -print'
let g:fzf_preview_window = ['up:50%']
let g:fzf_layout = { 'window': { 'width': 0.9, 'height': 0.9, 'relative': v:true, 'border': 'rounded' } }
