let g:svelte_indent_script = 2
let g:svelte_indent_style = 2
let g:user_emmet_settings = {
\  'variables': {'lang': 'en'},
\  'html': {
\    'default_attributes': {
\      'option': {'value': v:null},
\      'textarea': {'id': v:null, 'name': v:null, 'cols': 10, 'rows': 10},
\    },
\    'snippets': {
\      'html:5': "<!DOCTYPE html>\n"
\              ."<html lang=\"${lang}\">\n"
\              ."<head>\n"
\              ."\t<meta charset=\"${charset}\">\n"
\              ."\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE-edge\">\n"
\              ."\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n"
\              ."\t<title></title>\n"
\              ."</head>\n"
\              ."<body>\n\t${child}|\n</body>\n"
\              ."</html>",
\     'svelte:main': "<script>\n\t${child}|\n</script>\n\n"
\                   ."<svelte:head>\n\t<title></title>\n</svelte:head>\n\n"
\                   ."<main>\n</main>\n\n"
\                   ."<style>\n</style>",
\     'svelte:component': "<script>\n\t${child}|\n</script>\n\n"
\                   ."<div>\n</div>\n\n"
\                   ."<style>\n</style>"
\    },
\  },
\}
