#!/usr/bin/env bash

# Prevent robots from indexing the deployed resources.
cat <<EOF > _site/robots.txt
User-agent: *
Disallow: /
EOF
