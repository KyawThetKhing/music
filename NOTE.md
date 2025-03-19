# NOTES

## postcss

#### PostCSS is a tool for transforming CSS with JavaScript plugins. It takes your CSS file and applies a series of plugins to it, transforming it into a final optimized CSS file. It’s widely used for things like:

#### Autoprefixing: Adding vendor prefixes to CSS rules where needed.

#### Minifying CSS: Making CSS files smaller and faster to load.

#### Using future CSS features today: Plugins that allow you to use CSS features that aren’t yet widely supported.

## purgecss

#### Basically tailwind css have a large file size of around 300KB, that's why using with purgecss will make the final css file size smaller by removing unused styles.

#### adding "css.lint.unknownAtRules": "ignore" to .vscode/settings.json will prevent the linting errors for tailwind css.
