" Auto source .vimrc
autocmd! bufwritepost .vimrc source %

au BufNewFile,BufRead *.ejs,*.marko,*.md set filetype=html
nnoremap mm ``
