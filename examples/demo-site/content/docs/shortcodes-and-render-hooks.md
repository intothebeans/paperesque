---
title: "Shortcodes & Render Hooks"
date: 2026-05-19T22:24:11-04:00
tags: [shortcodes, hugobasicsite, markdown, render hooks]
description: How to use the shortcodes and render hooks included in this theme.
toc: true
disableCopyCodeButton: true
---

## Shortcodes

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes) for rich content, along with a [Privacy Config](https://gohugo.io/configuration/privacy/) and a set of Simple Shortcodes that enable static and no-JS versions of various social media embeds.

### figure

This shortcode is slightly modified by this theme. It adds `attrtarget` and `attrrel` parameters to the default Hugo figure shortcode, which allow you to specify the `target` and `rel` attributes of the link in the attribution.

### cw

This is a content warning shortcode with no arguments.

Example:

{{< cw >}}
This is a content warning.
{{< /cw >}}

### icon

Renders an iconify icon. The first argument is the name of the icon in the format `iconset:iconname`

#### size

(optional `int`) The size of the icon. Can be any valid CSS size value, such as `24px` or `1.5em`. Defaults to `24px`.

#### color

(optional `string`) The color of the icon. Can be any valid CSS color value, such as `#ff0000` or `red`. Defaults to `currentColor`.

#### label

(optional `string`) The aria-label for the icon. If not provided, it will be set to the name of the icon.

#### class

(optional `string`) Additional CSS classes to apply to the icon.

Example:

{{< icon "ph:cow-bold" >}}{{< icon "tdesign:bean-filled" >}}{{< icon "tdesign:bean-filled" >}}Who would trade a cow for beans???{{< icon "tdesign:bean-filled" >}}{{< icon "game-icons:witch-flight" >}}{{< icon "tdesign:bean-filled" >}}

### fitfigure

More information about this is available on the [site configuration page](/docs/site-configuration/#removing-original-images-after-resizing).

### music

See the dedicated [Music Shortcode documentation](/docsmusic-shortcode) for more information.

### svgfigure

This shortcode is a copy-paste of the [original figure code](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/shortcodes/figure.html) from Hugo commit `aba2647c152ffff927f42523b77ee6651630cd67`, with the `img` tag replaced with an `object` tag, with `type=svg`. This allows for embedded SVGs to be animated with CSS in Safari 13.1. See also: <https://stackoverflow.com/q/60975613/996592>

### twoup

This shortcode is a simple wrapper around the `figure` shortcode that allows you to display two figures side by side.

### vidfigure

This shortcode allows the use of a video element within a figure. It has all the same parameters as the `figure` shortcode, along with the following additional parameters:

#### src

(required `string`) The source URL of the video.

#### alt

(optional `string`) The alt text for the video. This is used for accessibility purposes and will be displayed if the video cannot be loaded.

#### caption

(optional `string`) The caption for the video. This will be displayed below the video. If no `alt` attribute is provided, the caption will be used as the alt text for the video.

#### width

(optional `int`) The width of the video. Can be any valid CSS size value, such as `640px` or `100%`.

#### height

(optional `int`) The height of the video. Can be any valid CSS size value, such as `360px` or `100%`.

#### captions

>[!INFO]
> Currently only supports one captions file.

(optional `string`) The source URL of the video captions file. This should be in WebVTT format.

#### capsrclang

(optional `string`) The language of the captions file. This should be a valid BCP 47 language tag, such as `en` for English or `es` for Spanish. Defaults to `en`.

#### caplabel

(optional `string`) The label for the captions track. Defaults to `English`.

## Render Hooks

Render hooks are how Hugo converts Markdown syntax into HTML. This theme includes render hooks for alerts, code blocks, and links.

Custom alerts are described in more detail on the [site configuration page](/docs/site-configuration/#custom-alerts).

Code blocks are custom rendered to support the copy code button alongside syntax highlighting.

The link render hook is modified to open external links in a new tab and add `rel="noopener noreferrer nofollow"` for security reasons. An external link is defined as any link that does not start with the site's base URL or a relative path. Email links have custom JavaScript for opening the user's email client, and internal links are left unchanged.
