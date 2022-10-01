let $FZF_DEFAULT_COMMAND='find . \( -name node_modules -o -name .git \) -prune -o -print'
let g:fzf_preview_window = ['up:50%']
let g:fzf_layout = { 'window': { 'width': 0.9, 'height': 0.9, 'relative': v:true, 'border': 'rounded' } }

nnoremap <C-f> :Files<CR>
nnoremap <C-g> :Rg<CR>
