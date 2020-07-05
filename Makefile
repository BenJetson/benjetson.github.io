
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

.PHONY: clean
clean:
	bundle exec jekyll clean

.PHONY: build
build:
	bundle exec jekyll build \
		--config=_config.yml,_config_build.yml,

.PHONY: build-qa
build-qa:
	JEKYLL_ENV=production bundle exec jekyll build \
		--config=_config.yml,_config_build.yml,_config_qa.yml

	# Prevent robots from indexing the QA tier.
	printf "User-agent: *\nDisallow: /\n" > _site/robots.txt

.PHONY: test
test:
	./scripts/test.sh
