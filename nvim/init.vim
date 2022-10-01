call plug#begin(stdpath('data') . '/plugged')

Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
Plug 'sheerun/vim-polyglot'
Plug 'preservim/nerdtree'
Plug 'lewis6991/impatient.nvim'
Plug 'jiangmiao/auto-pairs'
Plug 'ntpeters/vim-better-whitespace'
Plug 'mattn/emmet-vim'
Plug 'tpope/vim-commentary'
Plug 'chrisbra/changesPlugin'
" Plug 'airblade/vim-rooter'
Plug 'djoshea/vim-autoread'

Plug 'ap/vim-css-color'
Plug 'leafOfTree/vim-svelte-plugin'
Plug 'alvan/vim-closetag'

Plug 'sainnhe/edge'
Plug 'kyazdani42/nvim-web-devicons'
Plug 'ryanoasis/vim-devicons'
Plug 'akinsho/bufferline.nvim', { 'tag': 'v2.*' }
Plug 'nvim-lualine/lualine.nvim'

call plug#end()
