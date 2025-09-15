set shell := ["bash", "-uc"]

# Default recipe - shows help
default:
    @just --list

# Development Commands

# Serves the Hugo site at `http://localhost:1314` with live reload
serve:
    cd examples/demo-site && hugo server --themesDir ../../../ --disableFastRender -p 1314

# Serves with critical CSS generation first
serve-critical:
    @just critical
    cd examples/demo-site && hugo server --themesDir ../../../ --disableFastRender -p 1314

# Build Commands

alias bh := build-hugo
# Builds the Hugo site to the `test-site` folder
build-hugo:
    cd examples/demo-site && hugo --themesDir ../../../ -d ../../test-site --minify

alias bf := build-full
# Builds the Hugo site with critical CSS to the `test-site` folder
build-full:
    @just clean-build
    @just critical
    @just build-hugo

# JavaScript Commands

alias bjs := build-js
# Builds the JavaScript files with Parcel
build-js: _copy-js-deps
    yarn parcel build --no-source-maps

alias wjs := watch-js
# Watches the JS files with Parcel for development
watch-js:
    yarn parcel watch

# Performance Optimization Commands

# Generate critical CSS using Node.js (requires Node.js and npm/yarn)
[group('performance')]
critical:
    #!/usr/bin/env bash
    if command -v node &> /dev/null; then
        echo "Generating critical CSS with Node.js..."
        node scripts/generate-critical-css.js
    else
        echo "Node.js not found, falling back to manual critical CSS extraction"
        just critical-manual
    fi

# Deployment and Maintenance Commands

# Updates the `demo-site` branch with theme updates from `mainline`
[group('deploy')]
deploy:
    #!/usr/bin/env bash
    set -euxo pipefail
    CURRENT_BRANCH=$(git branch --show-current)
    THEME_FILES=("layouts" "static" "assets" "theme.toml" "i18n" "README.md" "LICENSE.md" "CHANGELOG.md")

    git fetch origin
    git checkout mainline
    git pull origin mainline

    git checkout demo-site
    git pull origin demo-site

    git merge mainline --no-commit || true

    git reset HEAD themes/paperesque/ 2>/dev/null || true

    git checkout mainline -- "${THEME_FILES[@]}"

    rm -rf themes/paperesque

    mkdir -p themes/paperesque

    for file in "${THEME_FILES[@]}"; do
        if [ -e "$file" ]; then
            mv "$file" "themes/paperesque/"
        fi
    done

    git add .

    if git diff --staged --quiet; then
        echo "No changes to deploy."
    else
        git commit -m "🔄️ merge: update theme from mainline ($(git rev-parse --short mainline))"
    fi

    git checkout "$CURRENT_BRANCH"

# Utility Commands

# Clean build artifacts only
[group('helpers')]
clean-build:
    rm -rf public resources

# Removes all built files and caches
[group('helpers')]
[confirm('Confirm removal of test-site, public, .parcel-cache, and resources folders?')]
clean:
    rm -rf test-site public .parcel-cache resources

# Development workflow - install, build JS, generate critical CSS, serve
[group('workflow')]
dev:
    @just build-js
    @just critical
    @just serve

# Production workflow - full optimized build
[group('workflow')]
prod:
    @just build-js
    @just build-full

# Copies JavaScript dependencies from node_modules
_copy-js-deps:
    yarn cpx 'node_modules/iconify-icon/dist/iconify-icon.min.js' 'assets/js/'
    yarn cpx 'node_modules/abcjs/dist/abcjs-basic-min.js' 'assets/js/'
    yarn cpx 'node_modules/abcjs/abcjs-audio.css' 'assets/css/'
