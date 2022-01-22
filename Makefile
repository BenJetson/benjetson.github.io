
.PHONY: start
start: _config.yml _config_dev.yml _config_lan.yml _config_local.yml
	docker-compose up server

.PHONY: stop
stop:
	docker-compose down

.PHONY: lint
lint:
	docker-compose up linter

.PHONY: clean
clean: stop
	rm -rf \
		.sass_cache \
		_site \
		node_modules \
		vendor \
	;
	docker-compose rm -v

.PHONY: image
image: clean
	docker-compose build

.PHONY: shell
shell:
	docker-compose run --rm server bash

.PHONY: health-check
health-check:
	docker-compose run --rm server bundle exec \
		/mnt/app/scripts/health_check.rb \
		/mnt/app/_config.yml

.PHONY: upgrade
upgrade:
	docker-compose run --user root --rm server bundle update
	make image

.PHONY: serve
serve: _config.yml _config_dev.yml
	bundle exec jekyll serve --config=_config.yml,_config_dev.yml

_config_local.yml:
	@printf "WARNING: Local machine configuration file is missing. "
	@printf "Enter data at the prompts to make one.\n\n"
	@./scripts/make_config_local.sh

.PHONY: serve-lan
serve-lan: _config.yml _config_dev.yml _config_lan.yml _config_local.yml
	JEKYLL_ENV=lan bundle exec jekyll serve \
		--config=_config.yml,_config_dev.yml,_config_lan.yml,_config_local.yml

.PHONY: init
init:
	bundle install

.PHONY: build
build:
	./scripts/build.sh

.PHONY: build-netlify
build-netlify:
	./scripts/build_netlify.sh

.PHONY: build-preview
build-preview:
	./scripts/build_preview.sh

.PHONY: build-qa
build-qa:
	./scripts/build_qa.sh

.PHONY: test
test:
	./scripts/test.sh
