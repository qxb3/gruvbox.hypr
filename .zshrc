if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

export ZSH="/data/data/com.termux/files/home/.oh-my-zsh"
ZSH_THEME="powerlevel10k/powerlevel10k"
zstyle ':omz:update' frequency 12

plugins=(
  git
  zsh-autosuggestions
)

source $ZSH/oh-my-zsh.sh
export LANG=en_US.UTF-8
export EDITOR='vim'

# Git aliases
alias gi='git init'
alias gs='git status'
alias ga='git add'
alias gl='git log'
alias gc='git commit'
alias gp='git push'

# Others aliases
alias c='clear'
alias x='exit'
alias open='xdg-open'
alias rs='termux-reload-settings'

[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"
