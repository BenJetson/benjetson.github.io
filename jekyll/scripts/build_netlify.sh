#!/usr/bin/env bash

# When running the build on the Netlify server, the build may have been
# triggered for either a deploy preview or a deploy to the QA tier.
#
# The way that the Netlify instance is configured here, the QA tier deploys
# are tagged with $CONTEXT set to "production".
#
# The switch below controls which build script is run, based on $CONTEXT.
#
# See also: https://docs.netlify.com/configure-builds/environment-variables

case "$CONTEXT" in
    production)
        printf "Starting QA build!\n"
        ./scripts/build_qa.sh
        ;;
    *)
        printf "Starting preview build!\n"
        ./scripts/build_preview.sh
        ;;
esac
