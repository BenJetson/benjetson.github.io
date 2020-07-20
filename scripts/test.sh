#!/usr/bin/env bash

TEST_ERRS=0

fail() {
    TEST_ERRS=$((TEST_ERRS + 1))
}

check_err() {
    retval=$?

    if [[ $retval -eq 0 ]]; then
        printf "\n\033[0;32m✅ PASS: %s\033[0;0m\n" "$*"
        return
    fi

    fail
    printf "\n\033[0;31m⛔️ FAIL: %s\033[0;0m\n" "$*"

    return
}

fail_now() {
    fail
    printf "\n\033[0;31m⛔️ FAIL: Forced termination caused abort!\033[0;0m\n"

    exit
}

trap fail_now INT TERM

results() {
    printf "\n --- ALL TESTS STOPPED ---\n"

    if [[ $TEST_ERRS -eq 0 ]]; then
        printf "\033[0;32m✅ ALL TESTS PASS\033[0;0m\n"
        exit 0
    fi

    printf "\033[0;31m⛔️ %s TEST FAILURE(S) DETECTED\033[0;0m\n" "$TEST_ERRS"
    exit $TEST_ERRS
}

trap results EXIT

start_banner() {
    printf "\nℹ️  RUN: %s\n\n" "$*"
}

# Allow for errors; run all tests.
set +e

test_name="Jekyll Build"
start_banner "$test_name"
./scripts/build.sh
check_err "$test_name"

test_name="Front Matter Tests"
start_banner "$test_name"
./scripts/test_project_frontmatter.py
check_err "$test_name"



exit 0
