source ~/.vim/vimrc/sets.vim
source ~/.vim/vimrc/plugins.vim
source ~/.vim/vimrc/colorscheme.vim
source ~/.vim/vimrc/nerdtree.vim
source ~/.vim/vimrc/lightline.vim

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

" Mappings
filetype plugin indent on
inoremap jj <Esc>
