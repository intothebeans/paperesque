---
title: "Justfile"
date: 2025-09-15T16:49:05-04:00
draft: false
tags: [development]
---

## Quick Reference

```sh
Available recipes:
    build-full     # Builds the Hugo site with critical CSS to the `test-site` folder [alias: bf]
    build-hugo     # Builds the Hugo site to the `test-site` folder [alias: bh]
    build-js       # Builds the JavaScript files with Parcel [alias: bjs]
    default        # Default recipe - shows help
    serve          # Serves the Hugo site at `http://localhost:1314` with live reload
    serve-critical # Serves with critical CSS generation first
    watch-js       # Watches the JS files with Parcel for development [alias: wjs]

    [deploy]
    deploy         # Updates the `demo-site` branch with theme updates from `mainline`

    [helpers]
    clean          # Removes all built files and caches
    clean-build    # Clean build artifacts only

    [performance]
    critical       # Generate critical CSS using Node.js (requires Node.js and npm/yarn)

    [workflow]
    dev            # Development workflow - install, build JS, generate critical CSS, serve
    prod           # Production workflow - full optimized build
```

## Resources

- [just documentation](https://github.com/casey/just)
