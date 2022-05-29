

build:
	cp apps/zubr-web/src/environments/env.prod.ts apps/zubr-web/src/environments/env.ts && \
	npm run test && \
	npm run web:prod && \
	cp apps/zubr-web/src/_redirects dist/apps/zubr-web

