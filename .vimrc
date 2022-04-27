call plug#begin('~/.vim/plugged')
" - Functionality - "
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'sheerun/vim-polyglot'
Plug 'jiangmiao/auto-pairs'
Plug 'tpope/vim-fugitive'
Plug 'chrisbra/changesPlugin'
Plug 'ntpeters/vim-better-whitespace'
Plug 'preservim/nerdtree'
Plug 'tpope/vim-surround'
Plug 'elixir-editors/vim-elixir'

" Webdev
Plug 'ap/vim-css-color'
Plug 'leafOfTree/vim-svelte-plugin'
Plug 'alvan/vim-closetag'
Plug 'mattn/emmet-vim'
Plug 'nikvdp/ejs-syntax'

" - Customization - "
Plug 'morhetz/gruvbox'
Plug 'itchyny/lightline.vim'
Plug 'mengelbrecht/lightline-bufferline'
Plug 'ryanoasis/vim-devicons'
call plug#end()

let g:svelte_indent_script = 2
let g:svelte_indent_style = 2
let g:closetag_filenames = '*.html,*.svelte,*.ejs'

au BufNewFile,BufRead *.ejs set filetype=html
filetype plugin indent on
