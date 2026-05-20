---
title: "Justfile"
date: 2025-09-15T16:49:05-04:00
draft: false
tags: [development]
---

## Quick Reference

```sh
Available recipes:
    default        # Default recipe - shows help

    [build]
    build-full     # Builds the Hugo site with critical CSS to the `test-site` folder [alias: bf]
    build-hugo     # Builds the Hugo site to the `test-site` folder [alias: bh]

    [deploy]
    deploy         # Updates the `demo-site` branch with theme updates from `mainline`

    [dev]
    serve          # Serves the Hugo site at `http://localhost:1314` with live reload
    serve-critical # Serves with critical CSS generation first

    [helpers]
    clean          # Removes all built files and caches
    clean-build    # Clean build artifacts only

    [js]
    build-js       # Builds the JavaScript files with Parcel [alias: bjs]
    critical       # Generate critical CSS using Node.js (requires Node.js and npm/yarn)
    watch-js       # Watches the JS files with Parcel for development [alias: wjs]

    [workflow]
    dev            # Development workflow - install, build JS, generate critical CSS, serve
    prod           # Production workflow - full optimized build
```

## Resources

- [just documentation](https://github.com/casey/just)
