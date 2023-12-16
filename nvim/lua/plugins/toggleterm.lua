require('toggleterm').setup({
  open_mapping = [[<C-t>]],
  direction = 'float',
  shade_terminals = false,
  size = function(term)
    if term.direction == 'horizontal' then
      return 5
    elseif term.direction == 'vertical' then
      return 20
    end
  end,
  float_opts = {
    border = 'single',
    width = 100,
    height = 30,
  },
})
