<!-- markdownlint-disable MD033-->
# Paperesque <!-- omit from toc -->

A unique [Hugo](https://gohugo.io) theme with a couple of neat tricks.

You can see it in action on the [demo site](https://paperesque.pages.dev).

Here's what makes it special:

- Has a shortcode for resizing images to fit the page, _and_ tools for removing originals from the output
- Footnotes turn into margin notes when there's enough space.
- Tools for editing and controlling publication:
  - Visual differentiation for drafts
  - The ability to "mostly hide" pages so that they're only accessible by knowing the URL.
- Support for ABC notation music sheets and playback via [abcjs](https://abcjs.net/)
- Fun animations and transitions
- Gruvbox, the best theme with dynamic light/dark modes
- Copy button for markdown code blocks
- Support for [iconify](https://icon-sets.iconify.design/) web components
- Scroll progress bar
- Custom callout alerts with animations
- Critical CSS support for avoiding pesky flash of unstyled content

## Table of Contents <!-- omit from toc -->

- [1. Install](#1-install)
  - [1.1. git subtree (easiest!)](#11-git-subtree-easiest)
  - [1.2. git submodules](#12-git-submodules)
  - [1.3. Select the theme in your `config.toml`](#13-select-the-theme-in-your-configtoml)
- [2. Using Features](#2-using-features)
- [Credits](#credits)
  - [Libraries](#libraries)

## 1. <a name='Install'></a>Install

### 1.1. <a name='gitsubtreeeasiest'></a>git subtree (easiest!)

Copy the files into your repo using `git subtree` (this is way easier to use than submodules; [here's an explainer](https://www.atlassian.com/git/tutorials/git-subtree)):

```sh
git subtree add --prefix themes/paperesque https://github.com/intothebeans/paperesque mainline --squash
```

This will add a commit to your repo with everything ready to go. You'll probably want to modify parts of this theme for your own usage! Subtree makes that easy, because you've just copied the code into your repo ✨

### 1.2. <a name='gitsubmodules'></a>git submodules

If you're sure you want to use git submodules:

```sh
git submodule add -b mainline https://github.com/intothebeans/paperesque themes/paperesque
```

### 1.3. <a name='Selectthethemeinyourconfig.toml'></a>Select the theme in your `config.toml`

Add / Modify the `theme` field in your `config.toml` for your hugo site:

```toml
theme = "paperesque"
```

## 2. <a name='UsingFeatures'></a>Using Features

Checkout the documentation at [https://paperesque.pages.dev/docs/](https://paperesque.pages.dev/docs/) or the [docs folder](examples/demo-site/content/docs).

## Credits

This is a fork of the original [Paperesque theme](https://github.com/capnfabs/paperesque) by @capnfabs.

### Libraries

- [ABCJS](https://abcjs.net/) by Paul Rosen (MIT)
- [Iconify](https://icon-sets.iconify.design/) by Iconify (MIT)
- [critical](https://github.com/addyosmani/critical) by Addy Osmani (Apache 2.0)
