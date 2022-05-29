

build:
	mv apps/zubr-web/src/environments/env.prod.ts apps/zubr-web/src/environments/env.ts && \
	npm ci && \
	npm run test && \
	npm run web:prod
