## 1.1.0 (2026-05-20)

### ✨ Features

- add option to enable toc by default
- add related posts section and enhance table of contents in article layout
- add custom blockquote alerts with the site config and scss overrides
- add support for hugo table of contents
- add iconify shortcode
- add web app manifest support and update example configurations

### 🐛🚑️ Fixes

- correct mediaType key in outputFormats and add related indices for tags and keywords
- fix color flashes due to incorrect theme variables being inlined
- fixed multiple scores causing variable collisions
- fix issues in render hooks
- adjusted some colors and spacing for mobile; fixed typos/missing properties
- fixed progress bar for mobile with sticky nav

### ♻️ Refactorings

- update how attrlink target and ref are defined in figure shortcode
- update how post previews are handled
- post listing uses a dedicated partial for improved maintainability
- improve logic for enabling and disabling copy code button
- remove timestamp from auto-generated critical CSS comments
- completely overhaul js to allow for more fine grained loading in the browser

### 🌐♿️ Language & Accessibility

- add default label to icon shortcode
- add label to homepage icon

### 🎨🏗️ Style & Architecture

- clean up scss formatting
- define font families as variables

### 👇 squash

- merge feat/optimization

### 💄🚸 UI & UIX

- update content warning text style
- update color variables for better theme consistency and remove user-select from alert items
- remove aside shortcode and update content warning styles
- update background color for contrast with content sheet
- add summaries to posts on homepage and update styles
- update list styling
- add color overrides option

### 📌➕⬇️➖⬆️ Dependencies

- upgrade deps

### 📝💡 Documentation

- update read me
- document shortcodes and render hooks
- add comments for all site options in hugo.toml
- update developer docs
- split config docs into per page and sitewide
- update custom alert documentation
- add tags to docs

### 🔐🚧📈✏️💩👽️🍻💬🥚🌱🚩🥅🩺 Others

- clean up typos and grammar errors in docs

### 🔥⚰️ Clean up

- eslint and stylelint installed via yarn
- remove unused colors from css palette
- reduce number of webfonts to speed up loading

### 🔧🔨📦️ Configuration, Scripts, Packages

- update theme metadata
- update justfile groupings
- tweak git settings

### 🗑️ deprecation

- remove references to twitter

### 🙈 Ignore

- stop tracking auto generated critical scss

### 🚚🍱 Resources & Assets

- move documentation to demo site
- rename site config to hugo.toml
- rename example 2 to demo-site

### 🧑‍💻 Developer Experience

- allow disabling inline critical css for testing
- switch from package.json to just to handle tasks

## 1.0.0 (2025-09-12)

### ✨ Features

- add optional scroll progress bar
- add optional copy code button for markdown rendered code blocks
- add custom markup rendering for links
- add scroll to top button
- add custom alerts and alert animations
- add abcjs features (music rendering, playback)
- add button to toggle between light and dark theme

### 🐛🚑️ Fixes

- fixed scroll to top button tab index and display behavior
- fix audio context creation to be on scroll (user event) for abcjs

### ♻️ Refactorings

- update sass variables and custom properties for adaptability
- overhaul how alerts are handled in html and js; add additional alert types
- move scroll button handling to separate file and handle mobile scroll button
- split components into multiple files
- move color specific variables to their own file
- convert code into scss and split into multiple files to reduce redundancy and help with maintainability

### 🌐♿️ Language & Accessibility

- add additional labels to elements
- make all custom button/clickable elements keyboard focusable and activate on keypress
- add caption support to the video figure shortcodes

### 🎨🏗️ Style & Architecture

- change formatter for scss to prettier
- add stylelint to development environment and enhance SCSS responsiveness and structure

### 🏷️ Types

- renamed attribute to enable markdown code copy button

### 💄🚸 UI & UIX

- clamp floating footnotes width to prevent overflowing the viewport
- attribute links in figure shortcodes open in a new tab by default
- update colors for links, keyboard elements, and .btn class; set .btn font-weight to bold
- adjust abcjs audio controls alignment and update download button styles
- update hr style and change nav underline svg
- add hover underlines to navigation links
- set navigation to be sticky on mobile devices
- update right links styling when collapsed
- switch to using flexbox to manage nav layout; disable scroll to top button on tablet and mobile
- enhance navigation with iconify icon and improve layout structure; various small ui tweaks
- update colors with gruvbox palette

### 📄 License

- add my name to the license

### 📌➕⬇️➖⬆️ Dependencies

- add prettier for eslint and eslint as dev dependencies
- add iconify web component

### 📝💡 Documentation

- add documentation to explain music shortcode, progress bar options, and code copy options

### 📱💫 Design

- add scaling animation to abcjs audio control buttons
- add nudge animations for navigation links; update button styles and transitions
- add transition delays for class btn on tablets down; disable animations if users prefer reduced motion
- scroll button size changes dynamically based on view width; mobile scroll button handled with pure css
- scroll to top button now uses a smooth transition unless user prefers reduces motion
- add animations for collapsed menu opening and closing
- add transitions for changing from light to dark mode

### 🔍️ SEO

- change title spacing and delimeter

### 🔐🚧📈✏️💩👽️🍻💬🥚🌱🚩🥅🩺 Others

- change customisation to customization 🇺🇸 🦅🇺🇸

### 🔥⚰️ Clean up

- remove unneeded instrument variable from music shortcode
- remove syntax.css to allow for syntax styling via hugo config

### 🔧🔨📦️ Configuration, Scripts, Packages

- add config files for dev tools

### 🚚🍱 Resources & Assets

- switch from url encoded fonts to font files

### 🧑‍💻 Developer Experience

- add missing eslint dependencies and update config
