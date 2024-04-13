vim.api.nvim_call_function('cyclist#add_listchar_option_set', {'chars', {
  eol = '↲',
  tab = '» ',
  trail = '',
  extends = '<',
  precedes = '>',
  conceal = '┊',
  nbsp = '␣',
}})

vim.api.nvim_call_function('cyclist#activate_listchars', {'chars'})
