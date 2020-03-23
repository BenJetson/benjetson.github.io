#!/usr/bin/env bash

bundle exec jekyll clean
bundle exec jekyll build --config=_config.yml,_config_build.yml
