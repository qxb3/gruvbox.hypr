-- local action_state = require("telescope.actions.state")
-- if actions ~= nil then
--   actions.master_stack = function(prompt_bufnr)
--     local picker = action_state.get_current_picker(prompt_bufnr)
--     actions.close(prompt_bufnr)
--     vim.cmd([[tabnew]])
--     for index, entry in ipairs(picker:get_multi_selection()) do
--       if index == 1 then
--         vim.cmd("edit " .. entry.filename)
--       elseif index == 2 then
--         vim.cmd("vsplit " .. entry.filename)
--       else
--         vim.cmd("split " .. entry.filename)
--       end
--     end
--     vim.cmd([[wincmd =]])
--   end
-- end

local builtin = require('telescope.builtin')
local actions = require("telescope.actions")

require('telescope').setup({
  defaults = {
    file_ignore_patterns = {
      'node_modules', 'dist', 'build', 'static',
      'packer_compiled.lua', 'nvim-tree.lua',
      'target', 'CMakeFiles'
    },
    mappings = {
      n = {
        ['<CR>'] = actions.select_vertical
      },
      i = {
        ['<CR>'] = actions.select_vertical
      }
    }
  }
})

vim.keymap.set('n', '<C-x>', ':bd<CR>', { silent = true })

vim.keymap.set('n', '<C-f>', builtin.find_files, {})
vim.keymap.set('n', '<C-g>', builtin.live_grep, {})
vim.keymap.set('n', '<C-b>', builtin.buffers, {})

vim.keymap.set('n', '<leader>gc', builtin.git_commits, {})
vim.keymap.set('n', '<leader>gb', builtin.git_branches, {})
