source "${HOME}/.zgen/zgen.zsh"

if ! zgen saved; then
  zgen load romkatv/powerlevel10k powerlevel10k

  zgen save
fi

ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=240,underline"
ZSH_AUTOSUGGEST_STRATEGY="completion"
HISTFILE=$HOME/.zsh/.zsh_history
HISTSIZE=100000
SAVEHIST=$HISTSIZ

source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

bindkey "^[[H" beginning-of-line
bindkey "^[[F" end-of-line

zstyle ':completion:*' list-colors 'di=1;34:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43'
zstyle ':completion:*' menu select
zstyle ':completion:*' group-name ''
zstyle ':completion:::::' completer _expand _complete _ignored _approximate

alias c='clear'
alias x='exit'
alias open='xdg-open'
alias rs='termux-reload-settings'

[[ ! -f ~/.zsh/.p10k.zsh ]] || source ~/.zsh/.p10k.zsh
