---
title: "Site Configuration"
date: 2025-09-15T13:49:02-04:00
draft: false
tags: [hugobasicsite, markdown, configuration]
toc: true
disableCopyCodeButton: true
---

This theme is highly configurable, and this page can be referenced for all the options. You can also use the [`hugo.toml`](https://github.com/intothebeans/paperesque/blob/mainline/examples/demo-site/hugo.toml) file for the demo site as reference
<!-- more -->
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
  - To display a title above the section content, add a `display_section_expanded_title` key with the title you want to show.
- Post previews can be enabled by setting `showPreviews` to `true` in the frontmatter of your homepage. By default, this is set to `false`.

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

The icon used next to the home link can be set with the `nav_icon` site parameter. It takes a valid iconify icon string separated with a hyphen. For example:

```toml
[params]
nav_icon = "bxs-home"
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

## Semi-hide Pages

You can prevent a page from being publicly visible (included in lists etc) by adding the following to your front-matter:

```toml
sitemap:
    disable: true
params:
    mostlyHidden: true
```

- Note that `sitemap.disable` is only available since [Hugo 0.125.0](https://github.com/gohugoio/hugo/releases/tag/v0.125.0), so ensure you're building with that if you're relying upon this feature.

## Custom Alerts

The custom alert render hook allows you to create custom alerts as easily as possible. Dropdown alerts also come with nice animations. The default types are taken from [Obsidian.](https://help.obsidian.md/callouts)

To add your own type:

1. Create a dictionary entry in your site parameters including the name of your alert and the icon you want to use for it. For example:

    ```toml
    [[params.customalerts]]
    name = "birds"
    icon = "mdi-bird"
    ```

2. Add your alert colors to an SCSS map in `assets/scss/_custom-alerts.scss`. For example:

    ```scss
    $custom-alert-colors: (
    blue:  (
        "birds"
    )
    );
    ```

    The available colors are `blue`, `aqua`, `green`, `orange`, `yellow`, `red`, and `purple`. You can add as many alerts to each color as you want.
3. To change the way the title of the alert displays, add an entry in the corresponding language file in `i18n/`.

See also the [Hugo documentation](https://gohugo.io/render-hooks/blockquotes/#alerts)

## Custom Colors

You can override color variables in the `assets/css/color-overrides.css` file. This allows you to override theme colors without needing to modify the theme directly.
