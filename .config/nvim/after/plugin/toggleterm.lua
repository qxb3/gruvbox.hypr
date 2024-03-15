require('toggleterm').setup({
  open_mapping = [[<C-t>]],
  direction = 'float',
  shade_terminals = false,
  float_opts = {
    border = 'single',
    width = function()
      local winwidth = vim.fn.winwidth(0)

      return math.floor(winwidth - (winwidth / 6))
    end,
    height = function()
      local winheight = vim.fn.winheight(0)

      return math.floor(winheight - (winheight / 5))
    end
  }
})
