require('packer').startup(function(use)
  use 'wbthomason/packer.nvim'

  ------------------------------------------------------------
  -- General Plugins
  ------------------------------------------------------------
  -- LSP
  use {
    'VonHeikemen/lsp-zero.nvim',
    branch = 'v2.x',
    requires = {
      -- LSP Support
      {'neovim/nvim-lspconfig'},             -- Required
      {'williamboman/mason.nvim'},           -- Optional
      {'williamboman/mason-lspconfig.nvim'}, -- Optional

      -- Autocompletion
      {'hrsh7th/nvim-cmp'},     -- Required
      {'hrsh7th/cmp-nvim-lsp'}, -- Required
      {'L3MON4D3/LuaSnip'},     -- Required
    }
  }

  use {
    'nvim-treesitter/nvim-treesitter',
    run = ':TSUpdate'
  }

  -- Plenary
  use 'nvim-lua/plenary.nvim'

  -- File tree
  use {
    'kyazdani42/nvim-tree.lua',
    requires = {
      'kyazdani42/nvim-web-devicons'
    }
  }

  -- Fuzzy finder using telescope
  use {
    'nvim-telescope/telescope.nvim',
    branch = '0.1.x',
    requires = { {'nvim-lua/plenary.nvim'} }
  }

  -- Renames variables / functions
  use {
    'filipdutescu/renamer.nvim',
    branch = 'master',
    requires = { {'nvim-lua/plenary.nvim'} }
  }

  ------------------------------------------------------------
  -- UI Plugins
  ------------------------------------------------------------
  use 'akinsho/bufferline.nvim'                       -- BufferLine
  use 'nvim-lualine/lualine.nvim'                     -- LuaLine
  use 'sheerun/vim-polyglot'                          -- Syntax highlighting
  use 'chrisbra/changesPlugin'                        -- Easy visibility on changes i made on a file
  use 'ryanoasis/vim-devicons'                        -- Dev icons without color
  use 'lukas-reineke/indent-blankline.nvim'           -- Indent Guide lines
  use 'echasnovski/mini.indentscope'                  -- Highlight indent scope
  use 'kyazdani42/nvim-web-devicons'                  -- Dev icons with color
  use 'rcarriga/nvim-notify'                          -- Fancy notification ui
  use 'xiyaowong/transparent.nvim'                    -- Remove Background
  use 'folke/tokyonight.nvim'                         -- Tokyonight Colorscheme

  ------------------------------------------------------------
  -- Useful Plugins
  ------------------------------------------------------------
  use 'uga-rosa/ccc.nvim'                             -- Color picker
  use 'ntpeters/vim-better-whitespace'                -- Removes whitespaces
  use 'mattn/emmet-vim'                               -- Emmet
  use 'windwp/nvim-autopairs'                         -- AutoPairs
  use 'tpope/vim-commentary'                          -- For fast commenting
  use 'djoshea/vim-autoread'                          -- Updates the buffer if the file updates externally
  use 'airblade/vim-rooter'                           -- Updates the root to the root of the project

  ------------------------------------------------------------
  -- Other Plugins
  ------------------------------------------------------------
  use 'leafOfTree/vim-svelte-plugin'    -- Svelte specific plugin
  use 'lewis6991/impatient.nvim'        -- Startup optimzation
  use 'voldikss/vim-floaterm'           -- Floaterm
  use 'norcalli/nvim-colorizer.lua'     -- Adds color to hex, rbg etc... values
  use 'ThePrimeagen/vim-be-good'        -- A game to practice vim-motion

end)

-- setups
require('impatient')
require('colorizer').setup()
require('nvim-autopairs').setup()
require('renamer').setup()

-- vim-svelte-plugin
vim.g.svelte_indent_script = 2
vim.g.svelte_indent_style = 2

-- vim-changesPlugin
vim.g.changes_add_sign = '█'
vim.g.changes_delete_sign = '█'
vim.g.changes_modified_sign = '█'

-- vim-closetag
vim.g.closetag_filenames = '*.html,*.svelte,*.ejs'

-- vim-better-whitespace
vim.g.strip_whitespace_on_save = 1
vim.g.strip_whitespace_confirm = 0

-- vim-commentary
vim.cmd([[autocmd FileType apache setlocal commentstring=#\ %s]])
