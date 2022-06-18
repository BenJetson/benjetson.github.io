
GATSBY = npx gatsby

.PHONY: dev
dev:
	$(GATSBY) develop

.PHONY: dev-lan
dev-lan:
	$(GATSBY) develop -H 0.0.0.0

.PHONY: install
install:
	npm install

.PHONY: clean
clean:
	$(GATSBY) clean


