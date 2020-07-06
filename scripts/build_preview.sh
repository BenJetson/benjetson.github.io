#!/usr/bin/env bash

# Clear any existing Jekyll build artifacts.
bundle exec jekyll clean

# Create Netlify config file with the deploy preview URL.
cat << EOF > _config_netlify.yml
################################################################################
# _config_netlify.yml                                                          #
#                                                                              #
# This config file will be used by the Makefile when the Jekyll build is       #
# targeting the QA tier.                                                       #
#                                                                              #
# This file is ignored by Git and contains values sourced from the environment #
# at build time. It will be regenerated by each run of make build-qa.          #
################################################################################

tier: preview
url: $DEPLOY_PRIME_URL
EOF

# Perform Jekyll build, with production target environment and build/QA config.
JEKYLL_ENV=production bundle exec jekyll build \
    --config=_config.yml,_config_build.yml,_config_qa.yml,_config_netlify.yml

# Prevent robots from indexing the deploy previews.
./scripts/no_robots.sh

# Redirect users from the netlify domain to the QA subdomain.
./scripts/netlify_redirects.sh
