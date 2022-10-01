lua << EOF
require('toggleterm').setup({
  open_mapping = [[tt]],
  direction = 'float',
  size = function(term)
    if term.direction == 'horizontal' then
      return 10
    elseif term.direction == 'vertical' then
      return 35
    end
  end,
  float_opts = {
    border = 'double',
    width = 60,
    height = 13,
    winblend = 30
  },
  winbar = {
    enabled = true
  }
})
EOF
