set shell := ["bash", "-uc"]

# Serves the Hugo site at `http://localhost:1314` with live reload
serve:
    cd examples/2-with-homepage-sidebar-content && hugo server --themesDir ../../../ --disableFastRender -p 1314

alias bh := build-hugo
# Builds the Hugo site to the `test-site` folder at the project root from `examples/2-with-homepage-sidebar-content`
build-hugo:
    cd examples/2-with-homepage-sidebar-content && hugo --themesDir ../../../ -d ../../test-site

alias bjs := build-js
# Builds the JavaScript files with Parcel
build-js: _copy-js-deps
    yarn parcel build --no-source-maps

alias wjs := watch-js
# Watches the JS files with Parcel for development
watch-js:
    yarn parcel watch

# Updates the `demo-site` branch with any updates to the theme files from the `mainline` branch
deploy:
    #!/usr/bin/env bash
    set -euxo pipefail
    CURRENT_BRANCH=$(git branch --show-current)
    THEME_FILES=("layouts" "static" "assets" "theme.toml" "i18n" "README.md" "LICENSE.md" "CHANGELOG.md")

    git fetch origin
    git checkout mainline
    git pull origin mainline

    git checkout demo-site
    # git pull origin demo-site

    git merge mainline --no-commit || true

    git reset HEAD themes/paperesque/ 2>/dev/null || true

    git checkout mainline -- "${THEME_FILES[@]}"

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



# Removes any previously built files and caches
[group('helpers')]
[confirm('Confirm removal of test-site, public, .parcel-cache, and resources folders?')]
clean:
    rm -rf test-site public .parcel-cache resources

# Copies JavaScript dependencies to the `assets/js` and `assets/css` folders from `node_modules`
_copy-js-deps:
    yarn cpx 'node_modules/iconify-icon/dist/iconify-icon.min.js' 'assets/js/'
    yarn cpx 'node_modules/abcjs/dist/abcjs-basic-min.js' 'assets/js/'
    yarn cpx 'node_modules/abcjs/abcjs-audio.css' 'assets/css/'
