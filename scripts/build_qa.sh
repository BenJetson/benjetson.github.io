#!/usr/bin/env bash

# Clear any existing Jekyll build artifacts.
bundle exec jekyll clean

# Perform Jekyll build, with production target environment and build/QA config.
JEKYLL_ENV=production bundle exec jekyll build \
    --config=_config.yml,_config_build.yml,_config_qa.yml

# Prevent robots from indexing the QA tier.
cat <<EOF > _site/robots.txt
User-agent: *
Disallow: /
EOF

# Redirect users from the netlify domain to the QA subdomain.
cat <<EOF > _site/_redirects
http://benjetson.netlify.com/* https://qa.bengodfrey.net/:splat 301!
http://benjetson.netlify.app/* https://qa.bengodfrey.net/:splat 301!
EOF
