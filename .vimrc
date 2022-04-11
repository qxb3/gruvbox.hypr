set nocompatible
syntax on

" text editor config
set number
set wrap!
set tabstop=2
set shiftwidth=2
set expandtab
" set cursorline
set ruler
set autoindent
set smartindent
set encoding=utf-8
set termguicolors

call plug#begin('~/.vim/plugged')
" - Functionality - "
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'sheerun/vim-polyglot'
Plug 'jiangmiao/auto-pairs'
Plug 'junegunn/vim-easy-align'
Plug 'tpope/vim-fugitive'
Plug 'chrisbra/changesPlugin'
Plug 'ntpeters/vim-better-whitespace'
Plug 'preservim/nerdtree'
Plug 'tpope/vim-surround'

" Webdev
Plug 'ap/vim-css-color'
Plug 'leafOfTree/vim-svelte-plugin'
Plug 'alvan/vim-closetag'
Plug 'mattn/emmet-vim'

" - Customization - "
Plug 'morhetz/gruvbox'
Plug 'itchyny/lightline.vim'
Plug 'mengelbrecht/lightline-bufferline'
Plug 'ryanoasis/vim-devicons'
call plug#end()

" Theme
colorscheme gruvbox
set background=dark
let g:gruvbox_contrast_dark = "hard"
let g:gruvbox_italicize_strings = 1
let g:gruvbox_improved_warnings = 1

" Nerdtree
nnoremap <C-f> :NERDTreeToggle %<CR>
let g:NERDTreeQuitOnOpen = 1
let g:NERDTreeShowHidden = 1

" Lightline
set showtabline=2
let g:lightline = {
      \ 'colorscheme': 'gruvbox',
      \ 'active': {
      \   'left': [ [ 'mode', 'paste' ], [ 'readonly', 'filename', 'modified' ] ]
      \ },
      \ 'tabline': {
      \   'left': [ ['buffers'] ],
      \   'right': [ ['close'] ]
      \ },
      \ 'component_expand': {
      \   'buffers': 'lightline#bufferline#buffers'
      \ },
      \ 'component_type': {
      \   'buffers': 'tabsel'
      \ }
      \ }
let g:lightline#bufferline#enable_nerdfont = 1
let g:lightline#bufferline#enable_devicons = 1
let g:lightline#bufferline#show_number = 1
let g:lightline#bufferline#unnamed = '[No Name]'
" Close the buffer using Ctrl+x
nnoremap <silent> <C-x> :bdelete<CR>
" Switch to the previous buffer using Ctrl+h
nnoremap <silent> <C-o> :bprev<CR>
" Switch to the next buffer using Ctrl+l
nnoremap <silent> <C-p> :bnext<CR>

" Svelte
let g:svelte_indent_script = 2
let g:svelte_indent_style = 2
let g:user_emmet_settings = {
\  'variables': {'lang': 'en'},
\  'html': {
\    'default_attributes': {
\      'option': {'value': v:null},
\      'textarea': {'id': v:null, 'name': v:null, 'cols': 10, 'rows': 10},
\    },
\    'snippets': {
\      'html:5': "<!DOCTYPE html>\n"
\              ."<html lang=\"${lang}\">\n"
\              ."<head>\n"
\              ."\t<meta charset=\"${charset}\">\n"
\              ."\t<title></title>\n"
\              ."\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
\              ."</head>\n"
\              ."<body>\n\t${child}|\n</body>\n"
\              ."</html>",
\     'svelte:main': "<script>\n\t${child}|\n</script>\n\n"
\                   ."<svelte:head>\n\t<title></title>\n</svelte:head>\n\n"
\                   ."<main>\n</main>\n\n"
\                   ."<style>\n</style>",
\     'svelte:component': "<script>\n\t${child}|\n</script>\n\n"
\                   ."<div>\n</div>\n\n"
\                   ."<style>\n</style>"
\    },
\  },
\}

" Closetag
let g:closetag_filenames = '*.html,*.svelte'

" Auto expand html
function! Expander()
  let line   = getline(".")
  let col    = col(".")
  let first  = line[col-2]
  let second = line[col-1]
  let third  = line[col]
  if first ==# ">"
    if second ==# "<" && third ==# "/"
      return "\<CR>\<C-o>==\<C-o>O"
    else
      return "\<CR>"
    endif
  else
    return "\<CR>"
  endif
endfunction

inoremap <expr> <CR> Expander()

" Others
filetype plugin indent on
inoremap jj <Esc>
