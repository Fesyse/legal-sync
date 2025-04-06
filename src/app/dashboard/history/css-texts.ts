export const cssTexts = [
  `:root {
  --mt-overlay: rgba(251, 251, 251, 0.75);
  --mt-transparent-foreground: rgba(0, 0, 0, 0.4);
  --mt-bg-secondary: rgba(251, 251, 251, 0.8);
  --mt-code-background: #082b781f;
  --mt-code-color: #d4d4d4;
  --mt-secondary: #9d9d9f;
  --mt-pre-background: #ececec;
  --mt-pre-border: #e0e0e0;
  --mt-pre-color: #2f2f31;
  --mt-hr: #dcdcdc;
  --mt-drag-handle-hover: #5c5c5e;

  --mt-accent-bold-blue: #05c;
  --mt-accent-bold-teal: #206a83;
  --mt-accent-bold-green: #216e4e;
  --mt-accent-bold-orange: #a54800;
  --mt-accent-bold-red: #ae2e24;
  --mt-accent-bold-purple: #5e4db2;

  --mt-accent-gray: #758195;
  --mt-accent-blue: #1d7afc;
  --mt-accent-teal: #2898bd;
  --mt-accent-green: #22a06b;
  --mt-accent-orange: #fea362;
  --mt-accent-red: #c9372c;
  --mt-accent-purple: #8270db;

  --mt-accent-blue-subtler: #cce0ff;
  --mt-accent-teal-subtler: #c6edfb;
  --mt-accent-green-subtler: #baf3db;
  --mt-accent-yellow-subtler: #f8e6a0;
  --mt-accent-red-subtler: #ffd5d2;
  --mt-accent-purple-subtler: #dfd8fd;

  --hljs-string: #aa430f;
  --hljs-title: #b08836;
  --hljs-comment: #999999;
  --hljs-keyword: #0c5eb1;
  --hljs-attr: #3a92bc;
  --hljs-literal: #c82b0f;
  --hljs-name: #259792;
  --hljs-selector-tag: #c8500f;
  --hljs-number: #3da067;
}

.dark {
  --mt-overlay: rgba(31, 32, 35, 0.75);
  --mt-transparent-foreground: rgba(255, 255, 255, 0.4);
  --mt-bg-secondary: rgba(31, 32, 35, 0.8);
  --mt-code-background: #ffffff13;
  --mt-code-color: #2c2e33;
  --mt-secondary: #595a5c;
  --mt-pre-background: #080808;
  --mt-pre-border: #23252a;
  --mt-pre-color: #e3e4e6;
  --mt-hr: #26282d;
  --mt-drag-handle-hover: #969799;

  --mt-accent-bold-blue: #85b8ff;
  --mt-accent-bold-teal: #9dd9ee;
  --mt-accent-bold-green: #7ee2b8;
  --mt-accent-bold-orange: #fec195;
  --mt-accent-bold-red: #fd9891;
  --mt-accent-bold-purple: #b8acf6;

  --mt-accent-gray: #738496;
  --mt-accent-blue: #388bff;
  --mt-accent-teal: #42b2d7;
  --mt-accent-green: #2abb7f;
  --mt-accent-orange: #a54800;
  --mt-accent-red: #e2483d;
  --mt-accent-purple: #8f7ee7;

  --mt-accent-blue-subtler: #09326c;
  --mt-accent-teal-subtler: #164555;
  --mt-accent-green-subtler: #164b35;
  --mt-accent-yellow-subtler: #533f04;
  --mt-accent-red-subtler: #5d1f1a;
  --mt-accent-purple-subtler: #352c63;

  --hljs-string: #da936b;
  --hljs-title: #f1d59d;
  --hljs-comment: #aaaaaa;
  --hljs-keyword: #6699cc;
  --hljs-attr: #90cae8;
  --hljs-literal: #f2777a;
  --hljs-name: #5fc0a0;
  --hljs-selector-tag: #e8c785;
  --hljs-number: #b6e7b6;
}

.minimal-tiptap-editor .ProseMirror {
  display: flex;
  max-width: 100%;
  cursor: text;
  flex-direction: column;
  z-index: 0;
  outline: 0;
}

.minimal-tiptap-editor .ProseMirror > div.editor {
  display: block;
  flex: 1;
  white-space: pre-wrap;
}

.minimal-tiptap-editor .ProseMirror .block-node:not(:last-child),
.minimal-tiptap-editor .ProseMirror .list-node:not(:last-child),
.minimal-tiptap-editor .ProseMirror .text-node:not(:last-child) {
  margin-bottom: 2.5rem;
}

.minimal-tiptap-editor .ProseMirror ol,
.minimal-tiptap-editor .ProseMirror ul {
  padding-left: 1.5rem;
}

.minimal-tiptap-editor .ProseMirror blockquote,
.minimal-tiptap-editor .ProseMirror dl,
.minimal-tiptap-editor .ProseMirror ol,
.minimal-tiptap-editor .ProseMirror p,
.minimal-tiptap-editor .ProseMirror pre,
.minimal-tiptap-editor .ProseMirror ul {
  margin: 0;
}

.minimal-tiptap-editor .ProseMirror li {
  line-height: 1.7;
}

.minimal-tiptap-editor .ProseMirror p {
  word-break: break-word;
}

.minimal-tiptap-editor .ProseMirror li .text-node:has(+ .list-node),
.minimal-tiptap-editor .ProseMirror li > .list-node,
.minimal-tiptap-editor .ProseMirror li > .text-node,
.minimal-tiptap-editor .ProseMirror li p {
  margin-bottom: 0;
}

.minimal-tiptap-editor .ProseMirror blockquote {
  position: relative;
  padding-left: 0.875rem;
}

.minimal-tiptap-editor .ProseMirror blockquote::before,
.minimal-tiptap-editor .ProseMirror blockquote.is-empty::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: var(--mt-accent-foreground);
  opacity: 0.15;
  border-radius: 0.25rem;
}

.minimal-tiptap-editor .ProseMirror hr {
  margin: 0.75rem 0;
  height: 0.5px;
  width: 100%;
  border: none;
  background-color: var(--mt-hr);
}

.minimal-tiptap-editor .ProseMirror-focused hr.ProseMirror-selectednode {
  outline: var(--mt-muted-foreground) solid 2px;
  outline-offset: 1px;
  border-radius: 0.5rem;
}

.minimal-tiptap-editor .ProseMirror .ProseMirror-gapcursor {
  pointer-events: none;
  position: absolute;
  display: none;
}

.minimal-tiptap-editor .ProseMirror .ProseMirror-hideselection {
  caret-color: transparent;
}

.minimal-tiptap-editor .ProseMirror.resize-cursor {
  cursor: col-resize;
}

.minimal-tiptap-editor .ProseMirror .selection {
  display: inline-block;
}

.minimal-tiptap-editor .ProseMirror s span {
  text-decoration: line-through;
}

.minimal-tiptap-editor .ProseMirror .selection,
.minimal-tiptap-editor .ProseMirror *::selection,
::selection {
  background-color: var(--mt-accent);
}

.minimal-tiptap-editor .ProseMirror .selection::selection {
  background-color: transparent;
}
`,
  `.minimal-tiptap-editor .ProseMirror code.inline {
  border-radius: 0.25rem;
  border: 1px solid var(--mt-code-color);
  background-color: var(--mt-code-background);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.minimal-tiptap-editor .ProseMirror pre {
  position: relative;
  overflow: auto;
  border-radius: 0.25rem;
  border: 1px solid var(--mt-pre-border);
  background-color: var(--mt-pre-background);
  color: var(--mt-pre-color);
  font-family: monospace;
  text-align: left;
  hyphens: none;
  white-space: pre;
}

.minimal-tiptap-editor .ProseMirror code {
  line-height: 1.7;
  word-break: break-word;
}

.minimal-tiptap-editor .ProseMirror pre code {
  display: block;
  overflow-x: auto;
  padding: 0.875rem;
}

.minimal-tiptap-editor .ProseMirror pre {
  .hljs-keyword,
  .hljs-operator,
  .hljs-function,
  .hljs-built_in,
  .hljs-builtin-name {
    color: var(--hljs-keyword);
  }

  .hljs-attr,
  .hljs-symbol,
  .hljs-property,
  .hljs-attribute,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-params {
    color: var(--hljs-attr);
  }

  .hljs-name,
  .hljs-regexp,
  .hljs-link,
  .hljs-type,
  .hljs-addition {
    color: var(--hljs-name);
  }

  .hljs-string,
  .hljs-bullet {
    color: var(--hljs-string);
  }

  .hljs-title,
  .hljs-subst,
  .hljs-section {
    color: var(--hljs-title);
  }

  .hljs-literal,
  .hljs-type,
  .hljs-deletion {
    color: var(--hljs-literal);
  }

  .hljs-selector-tag,
  .hljs-selector-id,
  .hljs-selector-class {
    color: var(--hljs-selector-tag);
  }

  .hljs-number {
    color: var(--hljs-number);
  }

  .hljs-comment,
  .hljs-meta,
  .hljs-quote {
    color: var(--hljs-comment);
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
}
`,
  `.minimal-tiptap-editor .ProseMirror ol {
  list-style: decimal;
}

.minimal-tiptap-editor .ProseMirror ol ol {
  list-style: lower-alpha;
}

.minimal-tiptap-editor .ProseMirror ol ol ol {
  list-style: lower-roman;
}

.minimal-tiptap-editor .ProseMirror ul {
  list-style: disc;
}

.minimal-tiptap-editor .ProseMirror ul ul {
  list-style: circle;
}

.minimal-tiptap-editor .ProseMirror ul ul ul {
  list-style: square;
}
`,
  `.minimal-tiptap-editor .ProseMirror > p.is-editor-empty::before {
  content: attr(data-placeholder);
  position: absolute;
  pointer-events: none;
  float: left;
  height: 0;
  color: var(--mt-secondary);
}
`,
  `.minimal-tiptap-editor .ProseMirror .heading-node {
  position: relative;
  font-weight: 600;
}

.minimal-tiptap-editor .ProseMirror .heading-node:first-child {
  margin-top: 0;
}

.minimal-tiptap-editor .ProseMirror h1 {
  margin-top: 2.875rem;
  margin-bottom: 1rem;
  font-size: 1.375rem;
  line-height: 1.7;
  letter-spacing: -0.004375rem;
}

.minimal-tiptap-editor .ProseMirror h2 {
  margin-top: 2rem;
  margin-bottom: 0.875rem;
  font-size: 1.1875rem;
  line-height: 1.7;
  letter-spacing: 0.003125rem;
}

.minimal-tiptap-editor .ProseMirror h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.0625rem;
  line-height: 1.5;
  letter-spacing: 0.00625rem;
}

.minimal-tiptap-editor .ProseMirror h4 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.minimal-tiptap-editor .ProseMirror h5 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.minimal-tiptap-editor .ProseMirror a.link {
  color: var(--mt-primary);
  cursor: pointer;
}

.minimal-tiptap-editor .ProseMirror a.link:hover {
  text-decoration: underline;
}
`,
  `[data-rmiz-ghost] {
  position: absolute;
  pointer-events: none;
}

[data-rmiz-btn-zoom],
[data-rmiz-btn-unzoom] {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  color: #fff;
  height: 40px;
  margin: 0;
  outline-offset: 2px;
  padding: 9px;
  touch-action: manipulation;
  width: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

[data-rmiz-btn-zoom]:not(:focus):not(:active) {
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  pointer-events: none;
  white-space: nowrap;
  width: 1px;
}

[data-rmiz-btn-zoom] {
  position: absolute;
  inset: 10px 10px auto auto;
  cursor: zoom-in;
}

[data-rmiz-btn-unzoom] {
  position: absolute;
  inset: 20px 20px auto auto;
  cursor: zoom-out;
  z-index: 1;
}

[data-rmiz-content="found"] img,
[data-rmiz-content="found"] svg,
[data-rmiz-content="found"] [role="img"],
[data-rmiz-content="found"] [data-zoom] {
  cursor: inherit;
}

[data-rmiz-modal]::backdrop {
  display: none;
}

[data-rmiz-modal][open] {
  position: fixed;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: hidden;
}

[data-rmiz-modal-overlay] {
  position: absolute;
  inset: 0;
  transition: background-color 0.3s;
}

[data-rmiz-modal-overlay="hidden"] {
  background-color: rgba(255, 255, 255, 0);
}

[data-rmiz-modal-overlay="visible"] {
  background-color: rgba(255, 255, 255, 1);
}

[data-rmiz-modal-content] {
  position: relative;
  width: 100%;
  height: 100%;
}

[data-rmiz-modal-img] {
  position: absolute;
  cursor: zoom-out;
  image-rendering: high-quality;
  transform-origin: top left;
  transition: transform 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  [data-rmiz-modal-overlay],
  [data-rmiz-modal-img] {
    transition-duration: 0.01ms !important;
  }
}
[data-rmiz-ghost] {
  position: absolute;
  pointer-events: none;
}

[data-rmiz-btn-zoom],
[data-rmiz-btn-unzoom] {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  color: #fff;
  height: 40px;
  margin: 0;
  outline-offset: 2px;
  padding: 9px;
  touch-action: manipulation;
  width: 40px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

[data-rmiz-btn-zoom]:not(:focus):not(:active) {
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  pointer-events: none;
  white-space: nowrap;
  width: 1px;
}

[data-rmiz-btn-zoom] {
  position: absolute;
  inset: 10px 10px auto auto;
  cursor: zoom-in;
}

[data-rmiz-btn-unzoom] {
  position: absolute;
  inset: 20px 20px auto auto;
  cursor: zoom-out;
  z-index: 1;
}

[data-rmiz-content="found"] img,
[data-rmiz-content="found"] svg,
[data-rmiz-content="found"] [role="img"],
[data-rmiz-content="found"] [data-zoom] {
  cursor: inherit;
}

[data-rmiz-modal]::backdrop {
  display: none;
}

[data-rmiz-modal][open] {
  position: fixed;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: hidden;
}

[data-rmiz-modal-overlay] {
  position: absolute;
  inset: 0;
  transition: background-color 0.3s;
}

[data-rmiz-modal-overlay="hidden"] {
  background-color: rgba(255, 255, 255, 0);
}

[data-rmiz-modal-overlay="visible"] {
  background-color: rgba(255, 255, 255, 1);
}

[data-rmiz-modal-content] {
  position: relative;
  width: 100%;
  height: 100%;
}

[data-rmiz-modal-img] {
  position: absolute;
  cursor: zoom-out;
  image-rendering: high-quality;
  transform-origin: top left;
  transition: transform 0.3s;
}

@media (prefers-reduced-motion: reduce) {
  [data-rmiz-modal-overlay],
  [data-rmiz-modal-img] {
    transition-duration: 0.01ms !important;
  }
}
`,
];
