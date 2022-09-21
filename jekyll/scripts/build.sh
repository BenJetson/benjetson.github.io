#!/usr/bin/env bash

# Clear any existing Jekyll build artifacts.
bundle exec jekyll clean

# Perform Jekyll build, with production target environment and build config.
JEKYLL_ENV=production bundle exec jekyll build \
    --config=_config.yml,_config_build.yml
