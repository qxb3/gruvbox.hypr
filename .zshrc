if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

export ZSH="/data/data/com.termux/files/home/.zsh/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"
zstyle ':omz:update' frequency 12

HISTFILE=$HOME/.zsh/.zsh_history
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=243,underline"

plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh
export LANG=en_US.UTF-8
export EDITOR='vim'
export GPG_TTY=$TTY

# Aliases
alias c='clear'
alias x='exit'
alias open='xdg-open'
alias cdi='cd $(find dev -maxdepth 2 -type d | fzf --preview-window hidden)'
alias rs='termux-reload-settings'
alias ts='test-screen'
alias bf='brainfuck'
alias grex='grex -c'
alias cc='rm -rf ~/.cache/yarn ~/.cache/typescript ~/.npm/_cacache'
alias fzf='fzf --reverse --border=rounded --margin 5% --preview="cat {}" --preview-window=up,30% --prompt="❯ " --pointer="❯" --color="spinner:yellow,border:bright-white"'
alias top='vtop --theme gruvbox'
alias vtop='vtop --theme gruvbox'
alias lserver='live-server'

[[ ! -f ~/.zsh/.p10k.zsh ]] || source ~/.zsh/.p10k.zsh
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH" #For yarn
