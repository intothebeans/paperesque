---
title: "Page Configuration"
date: 2026-05-19T22:01:53-04:00
tags: [hugobasicsite, markdown, configuration]
toc: true
disableCopyCodeButton: true
---

A number of options can be configured at the page level in the front matter.
<!-- more -->

## Floating Footnotes

This is _on by default_.

You can switch it off site-wide by adding `disableMarginNotes = true` to your `params` in your `hugo.toml`, i.e.

```toml
[params]
disableMarginNotes = true
```

Alternatively, you can turn it off per-page by adding the `disableMarginNotes = true` to your front-matter for the page.

## Table of Contents

Rendering a table of contents is enabled on a per-page basis by adding `toc: true` to the front-matter of the page.

Table of contents can alse be enabled by default for all posts by adding `showToc = true` to the `params` in your `hugo.toml`:

```toml
[params]
showToc = true
```

## Code Blocks with Copy Button

The default is to enable the copy button for all code blocks.

The copy button can be disabled per-block using the info string of the code block. For example:

    ```python{copy-button="false" style="gruvbox" lineNos=inline}
    print("Hello, world!")
    ```

The custom render hook makes setting `lineNos=true` do nothing since it doesn't create a table. Use inline instead.

Global behavior can be set in your `hugo.toml` or page wide in the frontmatter:

```toml
[params]
# disable all copy buttons site-wide or per-page
disableCopyCodeButton = false
```

## Progress Bar

This is enabled for each page by default and can be disabled per-page in the front matter with:

```toml
[params]
progressBar = false
```

It can also be disabled site-wide in `hugo.toml` with:

```toml
[params]
disableProgressBars = true
```
