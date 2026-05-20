---
title: "Development"
date: 2025-09-15T15:58:19-04:00
draft: false
tags: [javascript, development, css]
toc: true
---
## Dependencies

- The nix package manager
OR
- Node.js and yarn
- Hugo
- Dart-Sass

### Dev Tooling

- Just (optional, but recommended for ease of use)
- precommit
- commitizen
- cz-conventional-gitmoj (for fun gitmoji conventional commits)

## Setting up the environment

You can either run `nix-shell` to enter a nix shell with all dependencies installed, or you can install the dependencies manually using Node.js, yarn, and Python.

## Modifying the JavaScript

JavaScript files are located in the `js` folder, and are built using parcel and placed in the `assets/js` folder. To modify the JavaScript, you will need to rebuild it to reflect the changes.

### Building

There is a `justfile` provided with build commands you can read about [on the docs page](/docs/justfile "Justfile Command Reference").

If you want to build the JavaScript files manually, you can run:

```sh
yarn build --no-source-maps
```

and to watch for changes and rebuild automatically, run:

```sh
yarn watch
```

## Critical CSS

Critical CSS is handled using the `just` command runner and the `critical` npm package. If no CSS is generated, the theme falls back to use `critical.scss` as the manual critical CSS.

Critical CSS can be generated using `just critical`

### Configuration

This is the default `critical.config.json` file:

```json
{
  "critical": {
    "base": "./test-site/",
    "dimensions": [
      {
        "height": 900,
        "width": 1300
      },
      {
        "height": 900,
        "width": 375
      },
      {
        "height": 900,
        "width": 768
      }
    ],
    "ignore": {
      "selectors": [
        ".hover",
        ".focus",
        ".active",
        ":hover",
        ":focus",
        ":active",
        ".animation",
        ".transition",
        ".scroll-button",
        "#progress-header"
      ],
      "atrules": ["@font-face", "@media print"]
    },
    "extract": true,
    "inline": false
  },
  "pages": [
    {
      "url": "index.html",
      "name": "home",
      "description": "Homepage critical CSS"
    },
    {
      "url": "birds/index.html",
      "name": "list",
      "description": "List page critical CSS"
    },
    {
      "url": "about/index.html",
      "name": "single",
      "description": "Single page critical CSS"
    }
  ]
}
```

## Other Resources

- The explanation for how a lot of this works is in [this blog post](https://capnfabs.net/posts/hugo-theme-exclude-processed-images/ "Blog post about excluding processed images"), so take a look there if you get stuck or want to borrow some of the ideas without grabbing all of them.
- You can see who else is using this theme by [searching Github for `paperesque filename:hugo.toml`](https://github.com/search?q=paperesque+filename%3Ahugo.toml&type=Code "Search github for paperesque in hugo.toml") or [`paperesque filename:config.toml`](https://github.com/search?q=paperesque+filename%3Aconfig.toml&type=Code "Search github for paperesque in config.toml")(requires login).
