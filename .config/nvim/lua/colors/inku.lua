-- inku

local M = {}

function M.setup()
  vim.cmd [[highlight clear]]
  vim.cmd [[if exists("syntax_on") | syntax reset | endif]]

  -- Define Color Palette
  local colors = {
    bg = "#C9C6BC",  -- Soft gray background
    fg = "#2A2A2A",  -- Dark gray foreground text
    accent = "#5F819D", -- Cool blue for UI elements
    red = "#CC6666",  -- Soft red for errors or alerts
    green = "#8C9440",  -- Muted green for success
    yellow = "#F0C674",  -- Soft yellow for highlights
    blue = "#81A2BE",  -- Cool blue for system info
    purple = "#85678F",  -- Muted purple for decoration
    teal = "#5E8D87",  -- Soft teal for accents
    gray = "#707880",  -- Neutral gray for borders
    white = "#FFFFFF",  -- Bright white for important text
  }

  -- Set Background and Foreground
  vim.cmd("hi Normal guibg=" .. colors.bg .. " guifg=" .. colors.fg)
  vim.cmd("hi NormalNC guibg=" .. colors.bg .. " guifg=" .. colors.fg)
  vim.cmd("hi StatusLine guibg=" .. colors.accent .. " guifg=" .. colors.bg)
  vim.cmd("hi StatusLineNC guibg=" .. colors.gray .. " guifg=" .. colors.bg)

  -- Highlighting for Specific Elements
  vim.cmd("hi Comment guifg=" .. colors.gray)  -- Muted gray for comments
  vim.cmd("hi String guifg=" .. colors.green)  -- Green for strings
  vim.cmd("hi Keyword guifg=" .. colors.purple)  -- Purple for keywords
  vim.cmd("hi Function guifg=" .. colors.blue)  -- Blue for functions
  vim.cmd("hi Identifier guifg=" .. colors.accent)  -- Accent color for identifiers
  vim.cmd("hi Type guifg=" .. colors.teal)  -- Teal for type names
  vim.cmd("hi Constant guifg=" .. colors.red)  -- Red for constants

  -- Search and Matching
  vim.cmd("hi Search guibg=" .. colors.yellow .. " guifg=" .. colors.bg)  -- Highlight search results
  vim.cmd("hi IncSearch guibg=" .. colors.blue .. " guifg=" .. colors.bg)  -- Highlight current search
  vim.cmd("hi MatchParen guibg=" .. colors.gray .. " guifg=" .. colors.fg)  -- Match parentheses highlighting

  -- Visual Mode and Selection
  vim.cmd("hi Visual guibg=" .. colors.accent .. " guifg=" .. colors.bg)
  vim.cmd("hi VisualNOS guibg=" .. colors.accent .. " guifg=" .. colors.bg)

  -- Line Numbers and Cursor
  vim.cmd("hi LineNr guifg=" .. colors.gray)  -- Line numbers in gray
  vim.cmd("hi CursorLineNr guifg=" .. colors.white)  -- Highlight current line number
  vim.cmd("hi Cursor guibg=" .. colors.accent .. " guifg=" .. colors.bg)  -- Cursor color

  -- Error and Warnings
  vim.cmd("hi Error guifg=" .. colors.red .. " guibg=" .. colors.bg)  -- Red for errors
  vim.cmd("hi Warning guifg=" .. colors.yellow .. " guibg=" .. colors.bg)  -- Yellow for warnings

  -- Git and Diff Mode
  vim.cmd("hi DiffAdd guifg=" .. colors.green .. " guibg=" .. colors.bg)  -- Green for additions
  vim.cmd("hi DiffChange guifg=" .. colors.blue .. " guibg=" .. colors.bg)  -- Blue for changes
  vim.cmd("hi DiffDelete guifg=" .. colors.red .. " guibg=" .. colors.bg)  -- Red for deletions
  vim.cmd("hi DiffText guifg=" .. colors.purple .. " guibg=" .. colors.bg)  -- Purple for diff text

  -- Tabline
  vim.cmd("hi TabLine guibg=" .. colors.bg .. " guifg=" .. colors.gray)  -- Tabline background and inactive tabs
  vim.cmd("hi TabLineFill guibg=" .. colors.bg)  -- Inactive space on tabline
  vim.cmd("hi TabLineSel guibg=" .. colors.accent .. " guifg=" .. colors.bg)  -- Selected tab

  -- Statusline
  vim.cmd("hi StatusLine guibg=" .. colors.accent .. " guifg=" .. colors.bg)
  vim.cmd("hi StatusLineNC guibg=" .. colors.bg .. " guifg=" .. colors.gray)

  -- Highlighting for Punctuation
  vim.cmd("hi Delimiter guifg=" .. colors.accent)  -- Accent color for punctuation
end

return M
