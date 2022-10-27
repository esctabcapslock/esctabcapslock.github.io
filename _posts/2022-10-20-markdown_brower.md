---
layout: post
mathjax: false
highlightjs: true
title: "마크다운 브라우저로 미리보기"
category: "웹"
---

- 웹 브라우저에서 마크다운 파일은 랜더링해 주지 않는 것이 불편했음.
- 마크다운을 vscode 편집기로 미리보지 말고 웹브라우저로 볼 수 있게 해 보았다.
- `node server`로 실행함.

- `package.json`
```json
{
  "dependencies": {
    "marked": "^4.1.1"
  }
}
```

- `server.js`
```js
const http = require('http')
const fs = require('fs')
const marked = require('marked').marked
const port = 80


const vscode_markdown_css = `<style>
${fs.readFileSync('./vscode_markdown.css')}
img { display: block; margin: 0px auto; }   
</style>\n\n`

marked.use({
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false
});


http.createServer((req, res) => {
    let pathname = decodeURIComponent(req.url)
    if(pathname=='/') pathname = '/readme.md'
    console.log('[url]', pathname, __dirname + pathname, fs.existsSync(__dirname + pathname))
    try {
        if (fs.existsSync(__dirname + pathname)) {
            if (!fs.statSync(__dirname + pathname).isDirectory()) {
                let filedata = fs.readFileSync(__dirname + pathname)
                res.statusCode = 200
                if (pathname.endsWith('.html')) res.setHeader("Content-Type", "text/html; charset=utf-8")
                else if (pathname.endsWith('.css')) res.setHeader("Content-Type", "text/css; charset=utf-8")
                else if (pathname.endsWith('.js')) res.setHeader("Content-Type", "text/javascript; charset=utf-8")
                else if (pathname.endsWith('.md')) {
                    res.setHeader("Content-Type", "text/html; charset=utf-8")
                    filedata = marked.parser(marked.lexer(vscode_markdown_css+filedata.toString()))
                }
                res.end(filedata)
                return
            } else {
                const data = `<ul>${fs.readdirSync(__dirname + pathname).map(e => `<li><a href=".${pathname}/${e}">${e}</a></li>`).join('')}</ul>`
                res.setHeader("Content-Type", "text/html; charset=utf-8")
                res.end(data)
                return
            }

        } else throw ("설정 X")

    } catch (error) {
        console.error('에러 발생, ', error)
        res.statusCode = 404
        res.setHeader("Content-Type", "text/plain; charset=utf-8")
        res.end(`${JSON.stringify({ error })}`)
        return
    }

}).listen(port, console.log(`server is running at http://localhost:${port}`))


```


- `vscode_markdown.css`
- vscode 작업관리자로 열어서 적당히 코드 복붙한 거임.

<details><summary>보기</summary>

```css
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

 html, body {
	font-family: var(--markdown-font-family, -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", system-ui, "Ubuntu", "Droid Sans", sans-serif);
	font-size: var(--markdown-font-size, 14px);
	padding: 0 26px;
	line-height: var(--markdown-line-height, 22px);
	word-wrap: break-word;
}

body {
	padding-top: 1em;
}

/* Reset margin top for elements */
h1, h2, h3, h4, h5, h6,
p, ol, ul, pre {
	margin-top: 0;
}

h2, h3, h4, h5, h6 {
	font-weight: normal;
	margin-bottom: 0.2em;
}

#code-csp-warning {
	position: fixed;
	top: 0;
	right: 0;
	color: white;
	margin: 16px;
	text-align: center;
	font-size: 12px;
	font-family: sans-serif;
	background-color:#444444;
	cursor: pointer;
	padding: 6px;
	box-shadow: 1px 1px 1px rgba(0,0,0,.25);
}

#code-csp-warning:hover {
	text-decoration: none;
	background-color:#007acc;
	box-shadow: 2px 2px 2px rgba(0,0,0,.25);
}

body.scrollBeyondLastLine {
	margin-bottom: calc(100vh - 22px);
}

body.showEditorSelection .code-line {
	position: relative;
}

body.showEditorSelection :not(tr,ul,ol).code-active-line:before,
body.showEditorSelection :not(tr,ul,ol).code-line:hover:before {
	content: "";
	display: block;
	position: absolute;
	top: 0;
	left: -12px;
	height: 100%;
}

.vscode-high-contrast.showEditorSelection  :not(tr,ul,ol).code-line .code-line:hover:before {
	border-left: none;
}

body.showEditorSelection li.code-active-line:before,
body.showEditorSelection li.code-line:hover:before {
	left: -30px;
}

.vscode-light.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(0, 0, 0, 0.15);
}

.vscode-light.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(0, 0, 0, 0.40);
}

.vscode-dark.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(255, 255, 255, 0.4);
}

.vscode-dark.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(255, 255, 255, 0.60);
}

.vscode-high-contrast.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(255, 160, 0, 0.7);
}

.vscode-high-contrast.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(255, 160, 0, 1);
}


ul ul,
ul ol,
ol ul,
ol ol {
	margin-bottom: 0;
}

img, video {
	max-width: 100%;
	max-height: 100%;
}

a {
	text-decoration: none;
	color: #3794ff;
}

a:hover {
	text-decoration: underline;
	color: #3794ff;
}

a:focus,
input:focus,
select:focus,
textarea:focus {
	outline: 1px solid -webkit-focus-ring-color;
	outline-offset: -1px;
}

p {
	margin-bottom: 0.7em;
}

ul,
ol {
	margin-bottom: 0.7em;
}

hr {
	border: 0;
	height: 2px;
	border-bottom: 2px solid;
}

h1 {
	padding-bottom: 0.3em;
	line-height: 1.2;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	font-weight: normal;
}

table {
	border-collapse: collapse;
	margin-bottom: 0.7em;
}

th {
	text-align: left;
	border-bottom: 1px solid;
}

th,
td {
	padding: 5px 10px;
}

table > tbody > tr + tr > td {
	border-top: 1px solid;
}

blockquote {
	margin: 0 7px 0 5px;
	padding: 0 16px 0 10px;
	border-left-width: 5px;
	border-left-style: solid;
}

code {
	font-family: var(--vscode-editor-font-family, "SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace);
	font-size: 1em;
	line-height: 1.357em;
}

body.wordWrap pre {
	white-space: pre-wrap;
}

pre:not(.hljs),
pre.hljs code > div {
	padding: 16px;
	border-radius: 3px;
	overflow: auto;
}

pre code {
	color: var(--vscode-editor-foreground);
	tab-size: 4;
}

/** Theming */

.vscode-light pre {
	background-color: rgba(220, 220, 220, 0.4);
}

.vscode-dark pre {
	background-color: rgba(10, 10, 10, 0.4);
}

.vscode-high-contrast pre {
	background-color: var(--vscode-textCodeBlock-background);
}

.vscode-high-contrast h1 {
	border-color: rgb(0, 0, 0);
}

.vscode-light th {
	border-color: rgba(0, 0, 0, 0.69);
}

.vscode-dark th {
	border-color: rgba(255, 255, 255, 0.69);
}

.vscode-light h1,
.vscode-light hr,
.vscode-light td {
	border-color: rgba(0, 0, 0, 0.18);
}

.vscode-dark h1,
.vscode-dark hr,
.vscode-dark td {
	border-color: rgba(255, 255, 255, 0.18);
}

/* 인라인 */

html {
	scrollbar-color: var(--vscode-scrollbarSlider-background) var(--vscode-editor-background);
}

body {
	background-color: transparent;
	color: var(--vscode-editor-foreground);
	font-family: var(--vscode-font-family);
	font-weight: var(--vscode-font-weight);
	font-size: var(--vscode-font-size);
	margin: 0;
	padding: 0 20px;
}

img, video {
	max-width: 100%;
	max-height: 100%;
}

a, a code {
	color: #3794ff;
}

a:hover {
	color: #3794ff;
}

a:focus,
input:focus,
select:focus,
textarea:focus {
	outline: 1px solid -webkit-focus-ring-color;
	outline-offset: -1px;
}

code {
	color: #a31515;
}

blockquote {
	background: var(--vscode-textBlockQuote-background);
	border-color: var(--vscode-textBlockQuote-border);
}

kbd {
	color: var(--vscode-editor-foreground);
	border-radius: 3px;
	vertical-align: middle;
	padding: 1px 3px;

	background-color: hsla(0,0%,50%,.17);
	border: 1px solid rgba(71,71,71,.4);
	border-bottom-color: rgba(88,88,88,.4);
	box-shadow: inset 0 -1px 0 rgba(88,88,88,.4);
}
.vscode-light kbd {
	background-color: hsla(0,0%,87%,.5);
	border: 1px solid hsla(0,0%,80%,.7);
	border-bottom-color: hsla(0,0%,73%,.7);
	box-shadow: inset 0 -1px 0 hsla(0,0%,73%,.7);
}

::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

::-webkit-scrollbar-corner {
	background-color: var(--vscode-editor-background);
}

::-webkit-scrollbar-thumb {
	background-color: var(--vscode-scrollbarSlider-background);
}
::-webkit-scrollbar-thumb:hover {
	background-color: var(--vscode-scrollbarSlider-hoverBackground);
}
::-webkit-scrollbar-thumb:active {
	background-color: var(--vscode-scrollbarSlider-activeBackground);
}
::highlight(find-highlight) {
	background-color: var(--vscode-editor-findMatchHighlightBackground);
}
::highlight(current-find-highlight) {
	background-color: var(--vscode-editor-findMatchBackground);
}
```

</details>