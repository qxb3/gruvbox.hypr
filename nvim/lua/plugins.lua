require('packer').startup(function(use)
  use 'wbthomason/packer.nvim'


  ------------------------------------------------------------
  -- General Plugins
  ------------------------------------------------------------
  -- Autocompletion
  use {'neoclide/coc.nvim', branch = 'release'}

  -- File tree
  use {
    'kyazdani42/nvim-tree.lua',
    requires = {
      'kyazdani42/nvim-web-devicons'
    }
  }

  -- Fuzzy finder using fzf
  use {
    'junegunn/fzf',
    dir = '~/.fzf',
    run = './install --all'
  }
	use 'junegunn/fzf.vim'

  ------------------------------------------------------------
  -- UI Plugins
  ------------------------------------------------------------
  use 'akinsho/bufferline.nvim'         -- BufferLine
  use 'nvim-lualine/lualine.nvim'       -- LuaLine
  use 'sheerun/vim-polyglot'            -- Syntax highlighting
  use 'chrisbra/changesPlugin'          -- Easy visibility on changes i made on a file
  use 'ryanoasis/vim-devicons'          -- Dev icons without color
  use 'kyazdani42/nvim-web-devicons'    -- Dev icons with color
  use 'rcarriga/nvim-notify'            -- Fancy notification ui
  use 'gruvbox-community/gruvbox'       -- Colorscheme

  ------------------------------------------------------------
  -- Useful Plugins
  ------------------------------------------------------------
  use 'jiangmiao/auto-pairs'            -- Auto pairs
  use 'ntpeters/vim-better-whitespace'  -- Removes whitespaces
  use 'mattn/emmet-vim'                 -- Emmet
  use 'tpope/vim-surround'              -- Vim surround
  use 'alvan/vim-closetag'              -- Automatically closes html tags
  use 'tpope/vim-commentary'            -- For fast commenting
  use 'djoshea/vim-autoread'            -- Updates the buffer if the file updates externally
  use 'airblade/vim-rooter'             -- Updates the root to the root of the project

  ------------------------------------------------------------
  -- Other Plugins
  ------------------------------------------------------------
  use 'leafOfTree/vim-svelte-plugin'    -- Svelte specific plugin
  use 'lewis6991/impatient.nvim'        -- Startup optimzation
  use 'akinsho/toggleterm.nvim'         -- Toggleterm
  use 'norcalli/nvim-colorizer.lua'     -- Adds color to hex, rbg etc... values

end)

-- impatient.nvim
require('impatient')

-- nvim-colorizer.lua
require('colorizer').setup()

-- vim-svelte-plugin
vim.g.svelte_indent_script = 2
vim.g.svelte_indent_style = 2

-- vim-closetag
vim.g.closetag_filenames = '*.html,*.svelte,*.ejs'

-- vim-better-whitespace
vim.g.strip_whitespace_on_save = 1
vim.g.strip_whitespace_confirm = 0

-- vim-commentary
vim.cmd([[autocmd FileType apache setlocal commentstring=#\ %s]])
