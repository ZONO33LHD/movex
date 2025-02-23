export GO111MODULE := on
export GOBIN := $(PWD)/bin
export PATH := $(GOBIN):$(PATH)
PID = server.pid
REPOSITORY_ROOT = $(shell git rev-parse --show-toplevel)
GO_TEST_OPTION = -v -p=1 -parallel=1 -race -orverlay=`go run github.com/tenntenn/cmd/testtime -u`

PROTOC_GO_OPTION = -I./proto \
--proto_path=. \
--go_out=./proto \
--go_opt=paths=source_relative \
--go-grpc_out=./proto \
--go-grpc_opt=paths=source_relative \
--validate_out=lang=go:./proto \
--validate_opt=paths=source_relative

build: ## Build binary
	GOFLAGS="-ldflags=-X=google.golang.org/protobuf/reflect/protoregistry.conflictPolicy=warn" go build -o bin/server ./cmd/server

clean: ## Remove artifacts
	${RM} bin/server

test: ## Run tests
	go test $(GO_TEST_OPTION) ./...

test-coverage: ## Run tests with coverage
	go test $(GO_TEST_OPTION) -coverprofile=coverage.out ./...

.PHONY: all

all:
	go build -o bin/protogen ./cmd/protogen

run: ## Run docker container
	docker build -t movie-server .
	docker run -d -p 8080:8080 movie-server

init: ## Install development tools
	@go list -tags=tools -e -f='{{ .Imports }}' ./tools.go | tr -d [ | tr -d ] | xargs -L 1 go install
.PHONY: init

wire-generate: ## Generate wire_gen.go from ./registry/wire.go
	@go run github.com/google/wire/cmd/wire gen ./registry
.PHONY: wire-generate

wire-check: ## Check wire generate can be executed successfully
	@go run github.com/google/wire/cmd/wire check ./registry
.PHONY: wire-check

ent-describe: ## Run `ent describe`
	@go run -mod=mod entgo.io/ent/cmd/ent describe ./infrastructure/ent/schema
.PHONY: ent-generate

ent-init: ## Run `ent init` to initialize ent schema
	@go run -mod=mod entgo.io/ent/cmd/ent --target=infrastructure/ent/schema new $(ARGS)
.PHONY: ent-init

ent-generate: ## Run `ent generate`
	@go run -mod=mod entgo.io/ent/cmd/ent generate \
		--feature sql/lock \
		--feature sql/upsert \
		--feature sql/modifier \
		--feature sql/execquery \
		./infrastructure/ent/schema
.PHONY: ent-generate
