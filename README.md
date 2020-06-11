# benjetson.github.io

This repository contains the code that powers my personal webpage.

You can see the production version live at [www.bengodfrey.net](https://www.bengodfrey.net),
which is built from the [`master` branch](https://github.com/BenJetson/benjetson.github.io/tree/master).

## Preview

![Screenshot of Homepage](https://user-images.githubusercontent.com/10427974/83982130-ef15f600-a8f1-11ea-879f-a6ff099b6c2a.png)

## How It's Made

The site is built upon modern web technologies, built upon software from these
awesome open source projects:

- [**Jekyll**](https://www.jekyllrb.com) – static site builder
- [**Liquid**](https://shopify.github.io/liquid) – templating engine
- [**Bootstrap 4**](https://getbootstrap.com/docs/4.5) – interface framework
- [**PrefixFree**](https://leaverou.github.io/prefixfree) – client side CSS
  vendor prefixing

The site is powered by these services:

- [**GitHub Pages**](https://pages.github.com) – hosting provider
- [**GitHub Actions**](https://github.com/features/actions) – continuous
  integration
- [**Disqus**](https://www.disqus.com) – comment platform provider

## Local Development

Perform the following steps to set up a machine for local development.

1. Install Ruby via RVM

   ```sh
   url -sSL https://get.rvm.io | bash -s stable
   rvm install 2.5.3
   ```

1. Install Bundler to handle Ruby dependencies

   ```sh
   gem install bundler
   ```

1. Install Ruby dependencies.

   ```sh
   bundle install
   ```

1. Install Python dependencies.

   ```sh
   pip3 install -r requirements.txt
   ```

1. Install Node

   ```sh
   brew install node
   ```

1. Install NodeJS dependencies.

   ```sh
   npm install
   ```

1. Configure Git hooks.

   ```sh
   pre-commit install
   ```

1. Install ShellCheck

   ```sh
   brew install shellcheck
   ```

1. Configure VSCode editor

   1. Install Extensions
      1. `editorconfig.editorconfig`
      1. `esbenp.prettier-vscode`
      1. `davidanson.vscode-markdownlint`
      1. `timonwong.shellcheck`
   1. Use these settings to enable automatic formatting of project files:

      ```json
      "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
      "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
      "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      },
      "python.formatting.provider": "black",
      "editor.formatOnSave": true
      ```
