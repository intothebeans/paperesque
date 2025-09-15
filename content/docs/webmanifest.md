---
title: "Webmanifest"
date: 2025-09-15T17:21:21-04:00
draft: false
tags: [hugobasicsite, webmanifest, configuration]
---

## Configuration

The Paperesque theme includes support for generating a Web App Manifest (PWA manifest) that allows your site to be installed as a web app on mobile devices and desktops.

Add the following parameters to your `config.toml` or `hugo.toml` under `[params]`:

```toml
[params]
  # Basic site info (these are used if not defined in webmanifest section)
  description = "Your site description"
  shortname = "Short Name" # Used as short_name in manifest, defaults to truncated title

  # Web manifest specific settings
  [params.webmanifest]
    # Display mode: "fullscreen", "standalone", "minimal-ui", or "browser"
    display = "minimal-ui"

    # Orientation: "portrait", "landscape", or "any"
    orientation = "portrait"

    # Theme color (color of the browser UI when app is launched)
    theme_color = "#689d6a"

    # Background color (shown while app is loading)
    background_color = "#ffffff"

    # App categories for app stores
    categories = ["lifestyle", "productivity", "education"]

    # Optional: Shortcuts (app shortcuts/quick actions)
    [[params.webmanifest.shortcuts]]
      name = "Latest Posts"
      url = "/posts/"

    [[params.webmanifest.shortcuts]]
      name = "About"
      url = "/about/"

    # Optional: Related native apps
    [[params.webmanifest.related_applications]]
      platform = "play"
      url = "https://play.google.com/store/apps/details?id=com.example.app"
      id = "com.example.app"
```

## Icons

The manifest template automatically looks for icons in your `static/` folder with these naming patterns:

- `android-chrome-{size}x{size}.png` (where size is 72, 96, 128, 144, 152, 192, 384, 512)
- Fallback to `apple-touch-icon.png` if available
- Final fallback to `favicon-32x32.png`

## Default Values

If you don't configure the webmanifest parameters, the template uses these defaults:

- **name**: Site title
- **short_name**: First 12 characters of site title
- **description**: Site params description or subtitle
- **display**: "minimal-ui"
- **orientation**: "portrait"
- **theme_color**: "#689d6a" (Paperesque green)
- **background_color**: "#ffffff"
- **categories**: ["lifestyle", "productivity"]
