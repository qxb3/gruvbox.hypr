require('toggleterm').setup({
  open_mapping = [[<C-t>]],
  direction = 'horizontal',
  size = function(term)
    if term.direction == 'horizontal' then
      return 5
    elseif term.direction == 'vertical' then
      return 35
    end
  end,
  float_opts = {
    border = 'single',
    width = 60,
    height = 13,
    winblend = 100
  },
  winbar = {
    enabled = true
  },
})
