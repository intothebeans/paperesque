# Paperesque <!-- omit from toc -->

A lightweight [Hugo](https://gohugo.io) theme with a couple of neat tricks.

You can see it in action on [capnfabs.net](https://capnfabs.net).

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
- Custom alerts with animations

## Table of Contents <!-- omit from toc -->

- [1. Install](#1-install)
  - [1.1. git subtree (easiest!)](#11-git-subtree-easiest)
  - [1.2. git submodules](#12-git-submodules)
  - [1.3. Select the theme in your `config.toml`](#13-select-the-theme-in-your-configtoml)
- [2. Using Features](#2-using-features)
  - [2.1. Homepage](#21-homepage)
    - [2.1.1. 1. A custom list of links.](#211-1-a-custom-list-of-links)
    - [2.1.2. 2. A section + custom content in a sidebar.](#212-2-a-section--custom-content-in-a-sidebar)
  - [2.2. Links in the top-right corner](#22-links-in-the-top-right-corner)
  - [2.3. Removing original images after resizing](#23-removing-original-images-after-resizing)
  - [2.4. Visual differentiation for drafts](#24-visual-differentiation-for-drafts)
  - [2.5. Footnotes turn into margin notes](#25-footnotes-turn-into-margin-notes)
  - [2.6. Make pages only visible / accessible by URL](#26-make-pages-only-visible--accessible-by-url)
  - [2.7. Music Shortcode](#27-music-shortcode)
  - [2.8. Code blocks with copy button](#28-code-blocks-with-copy-button)
  - [2.9. Scroll progress bar](#29-scroll-progress-bar)
  - [2.10. Custom Alerts](#210-custom-alerts)
- [3. Testing against the example site](#3-testing-against-the-example-site)
- [4. Hacking / Modifying the JS](#4-hacking--modifying-the-js)
  - [4.1. Set up](#41-set-up)
  - [4.2. Dev builds](#42-dev-builds)
  - [4.3. Production builds (i.e. before you commit code / deploy code)](#43-production-builds-ie-before-you-commit-code--deploy-code)
  - [4.4. Other resources](#44-other-resources)

## 1. <a name='Install'></a>Install

### 1.1. <a name='gitsubtreeeasiest'></a>git subtree (easiest!)

Copy the files into your repo using `git subtree` (this is way easier to use than submodules; [here's an explainer](https://www.atlassian.com/git/tutorials/git-subtree)):

```sh
git subtree add --prefix themes/paperesque https://github.com/capnfabs/paperesque mainline --squash
```

This will add a commit to your repo with everything ready to go. You'll probably want to modify parts of this theme for your own usage! Subtree makes that easy, because you've just copied the code into your repo ✨

### 1.2. <a name='gitsubmodules'></a>git submodules

If you're sure you want to use git submodules:

```sh
git submodule add -b mainline https://github.com/capnfabs/paperesque themes/paperesque
```

### 1.3. <a name='Selectthethemeinyourconfig.toml'></a>Select the theme in your `config.toml`

Add / Modify the `theme` field in your `config.toml` for your hugo site:

```toml
theme = "paperesque"
```

## 2. <a name='UsingFeatures'></a>Using Features

### 2.1. <a name='Homepage'></a>Homepage

You've got two options for the homepage:

#### 2.1.1. <a name='Acustomlistoflinks.'></a>1. A custom list of links.

**Example**: see [examples/1-with-homepage-menu](examples/1-with-homepage-menu/).

This was the _only_ thing supported until Dec 2022-ish.

See the [example readme](examples/1-with-homepage-menu/README.md) for details on how to implement this.

#### 2.1.2. <a name='Asectioncustomcontentinasidebar.'></a>2. A section + custom content in a sidebar.

**Example**: see [examples/2-with-homepage-sidebar-content](examples/2-with-homepage-sidebar-content/).

This is what's in use on capnfabs.net today. I like it much better.

See the [example readme](examples/2-with-homepage-sidebar-content/README.md) for details on how to implement this.

### 2.2. <a name='Linksinthetop-rightcorner'></a>Links in the top-right corner

These are config driven! Add this to your `config.toml` (for example):

```toml
[[params.topmenu]]
  name = "about"
  url = "about/"

[[params.topmenu]]
  name = "contact"
  url = "contact/"

[[params.topmenu]]
  name = "rss"
  url = "posts/index.xml"
```

### 2.3. <a name='Removingoriginalimagesafterresizing'></a>Removing original images after resizing

The `fitfigure` shortcode is exactly the same as the `figure` shortcode, but it automatically resizes your images to fit the container, _and_ provides different resolutions for different DPIs (1x, 2x).

Whenever you use this shortcode, the theme makes a mental note of the resource you specified.

Now, you need to do some configuration if you want the originals to be removed from the output.

First, add this to your site's `config.toml`:

```toml
[outputs]
page = ["HTML", "droplist"]
```

Now, as part of your build process, run:

```sh
./themes/paperesque/buildscripts/drop-resources.py [hugo-output-directory]
```

(the Hugo output directory is usually `./public`).

That's it! Resized resources will be removed.

This is _off by default_ because it peppers your build output with `.droplist` files, and if you're not expecting them, it's going to be an unpleasant surprise.

### 2.4. <a name='Visualdifferentiationfordrafts'></a>Visual differentiation for drafts

This one's on, and can't be switched off. Drafts have an orange stripey background everywhere. You can't miss them.

### 2.5. <a name='Footnotesturnintomarginnotes'></a>Footnotes turn into margin notes

This is _on by default_.

You can switch it off site-wide by adding `disableMarginNotes = true` to your `params` in your `config.toml`, i.e.

```toml
[params]
disableMarginNotes = true
```

Alternatively, you can turn it off per-page by adding the `disableMarginNotes = true` to your front-matter for the page.

### 2.6. <a name='MakepagesonlyvisibleaccessiblebyURL'></a>Make pages only visible / accessible by URL

You can prevent a page from being publicly visible (included in lists etc) by adding the following to your front-matter:

```toml
sitemap:
    disable: true
params:
    mostlyHidden: true
```

- Note that `sitemap.disable` is only available since [Hugo 0.125.0](https://github.com/gohugoio/hugo/releases/tag/v0.125.0), so ensure you're building with that if you're relying upon this feature.

### 2.7. <a name='MusicShortcode'></a>Music Shortcode

You can include ABC notation music sheets in your posts with the `music` shortcode.
The available parameters are:

- `id (score)` - the custom ID for ABCJS to distinguish different scores
- `audio (false)` - whether to enable audio playback
- `download (false)` - whether to include a download link for the MIDI file. Only works if `audio` is also true.
- `abcoptions (null)` - a JSON object with options to pass to ABCJS when rendering the sheet. See the [ABCJS documentation](https://paulrosen.github.io/abcjs/visual/render-abc-options.html)

### 2.8. <a name='Codeblockswithcopybutton'></a>Code blocks with copy button

The copy button can be set using the info string of the code block. For example:

    ```python{copy-button="true" style="gruvbox" lineNos=inline}
    print("Hello, world!")
    ```

The custom render hook makes setting `lineNos=true` do nothing since it doesn't create a table. Use inline instead.

Copy buttons can be disabled site wide in the config file with:

```toml
[params]
enableCopyCodeButton = false
```

### 2.9. <a name='Scrollprogressbar'></a>Scroll progress bar

This is enabled for each page by default and can be disabled per-page in the front matter with:

```toml
[params]
progressBar = false
```

It can also be disabled site-wide in the config file with:

```toml
[params]
disableProgressBars = true
```

### 2.10. <a name='CustomAlerts'></a>Custom Alerts

The custom alert render hook allows you to create custom alerts as easily as possible. Dropdown alers also come with nice animations. The default types are taken from [Obsidian](https://help.obsidian.md/callouts). To add your own types start by adding it to the `$symbols` map in `layouts/_markup/render-blockquote-alert.html`. It takes the alert name as the key and a hyphen delimited string for the [iconify](https://icon-sets.iconify.design/) icon. It won't work if you use a colon to separate the icon set and icon name. Then in `assets/scss/_alerts.scss` add your alert to whichever color you'd like it to use in the `$alert-colors` map. To change the way the title of the alert displays, add an entry in the corresponding language file in `i18n/`.

See also the [Hugo documentation](https://gohugo.io/render-hooks/blockquotes/#alerts)

## 3. <a name='Testingagainsttheexamplesite'></a>Testing against the example site

You can build the example site with this theme with:

```
cd examples/[example]
hugo serve --themesDir=../../..
```

## 4. <a name='HackingModifyingtheJS'></a>Hacking / Modifying the JS

The javascript in use (`assets/js/main.js`) is built from the `./js/` directory. Here are instructions for how to modify the JS:

### 4.1. <a name='Setup'></a>Set up

First, you need to [install the `yarn` package manager](https://yarnpkg.com/getting-started/install).

Then, run:

```sh
yarn install
```

to install the required dependencies.

### 4.2. <a name='Devbuilds'></a>Dev builds

Run:

```sh
yarn watch
```

Simple as that!

### 4.3. <a name='Productionbuildsi.e.beforeyoucommitcodedeploycode'></a>Production builds (i.e. before you commit code / deploy code)

```sh
yarn build
```

Minifying the JS is handled by Hugo. For some reason, ABCJS breaks if it's minified with parcel.

### 4.4. <a name='Otherresources'></a>Other resources

- The explanation for how a lot of this works is in [this blog post](https://capnfabs.net/posts/hugo-theme-exclude-processed-images/), so take a look there if you get stuck or want to borrow some of the ideas without grabbing all of them.
- You can see who else is using this theme by [searching Github for `paperesque filename:config.toml`](https://github.com/search?q=paperesque+filename%3Aconfig.toml&type=Code) (requires login).
