lua << EOF
require('bufferline').setup({
  options = {
    modified_icon = '•',
    seperator_style = 'padded_slant'
  }
})
EOF

nnoremap <silent><C-o> :bprevious<CR>
nnoremap <silent><C-p> :bnext<CR>
nnoremap <silent><C-x> :bd<CR>
