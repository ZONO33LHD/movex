LOCAL_HASURA_ENDPOINT = http://localhost:5111
ADMIN_SECRET ?= admin_secret  # デフォルト値を設定しつつ、環境変数での上書きを許可

ifeq ($(OS),Windows_NT)
HASURA_CMD = $(USERPROFILE)/bin/hasura.exe
else
HASURA_CMD = hasura
endif

help: ## Show this help
	@perl -nle 'BEGIN {printf "Usage:\n  make \033[33m<target>\033[0m\n\nTargets:\n"} printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 if /^([a-zA-Z_-].+):.*\s+## (.*)/' $(MAKEFILE_LIST)
.PHONY: help

serve-movex-hasura: ## Serve movex hasura
ifeq ($(OS),Windows_NT)
	@docker stop movex-hasura-postgres hasura-movex-graphql-engine-1 2>nul || cmd /c exit 0
	@docker rm -f movex-hasura-postgres hasura-movex-graphql-engine-1 2>nul || cmd /c exit 0
	@docker volume rm hasura_db_data 2>nul || cmd /c exit 0
else
	@docker stop movex-hasura-postgres hasura-movex-graphql-engine-1 2>/dev/null || true
	@docker rm -f movex-hasura-postgres hasura-movex-graphql-engine-1 2>/dev/null || true
	@docker volume rm hasura_db_data 2>/dev/null || true
endif
	@docker compose up -d
ifeq ($(OS),Windows_NT)
	@timeout /t 15 /nobreak > nul
else
	@sleep 15
endif
	@"$(HASURA_CMD)" metadata clear --endpoint $(LOCAL_HASURA_ENDPOINT) --admin-secret $(ADMIN_SECRET)
	@"$(HASURA_CMD)" metadata apply --endpoint $(LOCAL_HASURA_ENDPOINT) --admin-secret $(ADMIN_SECRET)
	@"$(HASURA_CMD)" metadata reload --endpoint $(LOCAL_HASURA_ENDPOINT) --admin-secret $(ADMIN_SECRET)
	@"$(HASURA_CMD)" migrate apply --endpoint $(LOCAL_HASURA_ENDPOINT) --database-name movex --admin-secret $(ADMIN_SECRET)
	@"$(HASURA_CMD)" seed apply --admin-secret $(ADMIN_SECRET) --endpoint $(LOCAL_HASURA_ENDPOINT) --database-name movex
.PHONY: serve-movex-hasura

squash-migration-files: ## Squash hasura migration files
ifndef FROM
	$(usage)
endif
ifndef NAME
	$(usage)
endif
	@"$(HASURA_CMD)" migrate squash --from $(FROM) --endpoint $(LOCAL_HASURA_ENDPOINT) --name $(NAME) --database-name movex --admin-secret $(ADMIN_SECRET)

define usage
	@echo "FROM=<squashを始めるversionを指定>"
	@echo "NAME=<squash後のディレクトリ名を指定>"
	@echo "Usage: make squash-migration-files FROM=$$FROM NAME=$$NAME"
	@exit 1
endef
.PHONY: squash-migration-files

migrate-status: ## show status of migration
	@"$(HASURA_CMD)" migrate status --endpoint $(LOCAL_HASURA_ENDPOINT) --database-name movex --admin-secret $(ADMIN_SECRET)
.PHONY: migrate-status

migrate-create: ## create migration files
ifndef NAME
	@echo "Usage: make migrate-create NAME=migration_name"
	@exit 1
endif
	@"$(HASURA_CMD)" migrate create $(NAME) --endpoint $(LOCAL_HASURA_ENDPOINT) --database-name movex --admin-secret $(ADMIN_SECRET)
.PHONY: migrate-create
