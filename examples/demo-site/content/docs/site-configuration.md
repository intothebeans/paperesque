---
title: "Site Configuration"
date: 2025-09-15T13:49:02-04:00
draft: false
---

- [Setting Up the Homepage](#setting-up-the-homepage)
  - [1. A custom list of links](#1-a-custom-list-of-links)
  - [2. A section of content plus a sidebar](#2-a-section-of-content-plus-a-sidebar)
- [Running the example sites](#running-the-example-sites)
- [Navigation Menu](#navigation-menu)
- [Removing Original Images After Resizing](#removing-original-images-after-resizing)
- [Floating Footnotes](#floating-footnotes)
- [Semi-hide Pages](#semi-hide-pages)
- [Code Blocks with Copy Button](#code-blocks-with-copy-button)
- [Progress Bar](#progress-bar)
- [Custom Alerts](#custom-alerts)

## Setting Up the Homepage

There are two main options for the homepage:

### 1. A custom list of links

This is simply a content page with links you want to show. Consider this a legacy option as I'm not making changes with compatibility in mind.

See [examples/1-with-homepage-menu](examples/1-with-homepage-menu) for a working example.

### 2. A section of content plus a sidebar

This is the recommended option. You can use any section of your site (e.g. `posts`, `articles`, etc.) as the main content area, and optionally add a sidebar with links and things.

To enable this functionality:

- Ensure that there are no `[[params.menu]]` entries in your `hugo.toml` (which cause the list of links to be displayed, as per option 1 above).
- Create a `/content/_index.md`. The content of that page will render as the homepage.
- In the [frontmatter](https://gohugo.io/content-management/front-matter/) for the [`/content/_index.md`](content/_index.md), add a `display_section` key. The name of that section will be used to render a list of content.

Note that both the content and the `display_section` key are optional. If your `_index.md` only contains content, it will be centered in the page.

See [examples/demo-site](examples/demo-site) for a working example. Or just go the [homepage](https://paperesque.pages.dev) of this demo site.

## Running the example sites

From the example directory, run

```sh
hugo serve --themesDir ../../..
```

## Navigation Menu

These are set in your `hugo.toml` under `[[params.menu]]` entries. For example:

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

## Removing Original Images After Resizing

The `fitfigure` shortcode is exactly the same as the `figure` shortcode, but it automatically resizes your images to fit the container, _and_ provides different resolutions for different DPIs (1x, 2x).

Whenever you use this shortcode, the theme makes a mental note of the resource you specified.

Now, you need to do some configuration if you want the originals to be removed from the output.

First, add this to your site's `hugo.toml`:

```toml
[outputs]
page = ["HTML", "droplist"]
```

Now, as part of your build process, run:

```sh
./themes/paperesque/buildscripts/drop-resources.py ./test-site
```

(the Hugo output directory is usually `./public`, but I use `./test-site` for dev purposes. Cause I'm quirky).

That's it! Resized resources will be removed.

This is _off by default_ because it peppers your build output with `.droplist` files, and if you're not expecting them, it's going to be an unpleasant surprise.

## Floating Footnotes

This is _on by default_.

You can switch it off site-wide by adding `disableMarginNotes = true` to your `params` in your `hugo.toml`, i.e.

```toml
[params]
disableMarginNotes = true
```

Alternatively, you can turn it off per-page by adding the `disableMarginNotes = true` to your front-matter for the page.

## Semi-hide Pages

You can prevent a page from being publicly visible (included in lists etc) by adding the following to your front-matter:

```toml
sitemap:
    disable: true
params:
    mostlyHidden: true
```

- Note that `sitemap.disable` is only available since [Hugo 0.125.0](https://github.com/gohugoio/hugo/releases/tag/v0.125.0), so ensure you're building with that if you're relying upon this feature.

## Code Blocks with Copy Button

The default is to enable the copy button fo all code blocks.

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

his is enabled for each page by default and can be disabled per-page in the front matter with:

```toml
[params]
progressBar = false
```

It can also be disabled site-wide in `hugo.toml` with:

```toml
[params]
disableProgressBars = true
```

## Custom Alerts

The custom alert render hook allows you to create custom alerts as easily as possible. Dropdown alers also come with nice animations. The default types are taken from [Obsidian](https://help.obsidian.md/callouts).

To add your own type:

1. Add it to the `$symbols` map in [layouts/\_markup/render-blockquote-alert.html](layouts/_markup/render-blockquote-alert.html). It takes the alert name as the key and a hyphen delimited string for the [iconify](https://icon-sets.iconify.design/) icon. It won't work if you use a colon to separate the icon set and icon name.
2. In [assets/scss/\_alerts.scss](assets/scss/_alerts.scss) add your alert to whichever color you'd like it to use in the `$alert-colors` map.
3. To change the way the title of the alert displays, add an entry in the corresponding language file in `i18n/`.

See also the [Hugo documentation](https://gohugo.io/render-hooks/blockquotes/#alerts)
