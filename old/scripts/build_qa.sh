#!/usr/bin/env bash

# Clear any existing Jekyll build artifacts.
bundle exec jekyll clean

# Perform Jekyll build, with production target environment and build/QA config.
JEKYLL_ENV=production bundle exec jekyll build \
    --config=_config.yml,_config_build.yml,_config_qa.yml

# Prevent robots from indexing the QA tier.
./scripts/no_robots.sh

# Redirect users from the netlify domain to the QA subdomain.
./scripts/netlify_redirects.sh
