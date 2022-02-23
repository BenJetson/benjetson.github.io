#!/usr/bin/env bash

# Redirect users from the netlify domain to the QA subdomain.
cat <<EOF > _site/_redirects
http://benjetson.netlify.com/* https://qa.bengodfrey.net/:splat 301!
https://benjetson.netlify.com/* https://qa.bengodfrey.net/:splat 301!
http://benjetson.netlify.app/* https://qa.bengodfrey.net/:splat 301!
https://benjetson.netlify.app/* https://qa.bengodfrey.net/:splat 301!
EOF
