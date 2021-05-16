#!/bin/bash
# shellcheck disable=SC2015 # chaining is intentional for tests.

PRETTIER_VERSION=2.3.0
MDLINT_CLI_VERSION=0.23.1

banner() {
    echo
    echo "==== $* ===="
    echo
}

SHOULD_FAIL=0

onfail() {
    last_status=$?

    if [ $SHOULD_FAIL -eq 0 ] || [ $last_status -ne 0 ]; then
        echo
        echo "<!> FAIL: the last command returned an exit code of $last_status,"
        echo "          which will cause this build to fail after all steps."
        echo
        SHOULD_FAIL=$last_status
    fi
}

onok() {
    echo
    echo "<i> PASS: received exit code of zero."
    echo
}

cleanup() {
    banner RESULTS
    if [ $SHOULD_FAIL -ne 0 ]; then
        echo "FAIL: Some portion of this job raised a fatal error. Check logs."
    else
        echo "PASS: No error conditions were detected."
    fi
    echo

    exit $SHOULD_FAIL
}

ctrlc() {
    echo
    echo
    echo "ERROR: Canceled by user! Will fail."
    echo

    SHOULD_FAIL=1
}

trap cleanup EXIT HUP QUIT TERM
trap ctrlc INT

# Make errors NOT halt the script so all jobs can complete.
set -e

banner PRETTIER
npx prettier@$PRETTIER_VERSION . --check \
    && onok || onfail

banner MARKDOWN LINT
npx -p markdownlint-cli@$MDLINT_CLI_VERSION markdownlint .                                                                                                                                                                                           \
    && onok || onfail

banner EDITORCONFIG LINT

eclint_ignored=$(cat .eclintignore)
eclint_ignored=$(echo -n "$eclint_ignored" | tr '\n' ',')

eclint -exclude "{$eclint_ignored}" \
    && onok || onfail


banner FRONT MATTER
./scripts/test_project_frontmatter.py \
    && onok || onfail

banner PYTHON STYLE
black . --check \
    && onok || onfail

banner SHELLCHECK
shellcheck scripts/*.sh \
    && onok || onfail
