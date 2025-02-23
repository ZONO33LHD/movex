//go:build tools
// +build tools

package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/99designs/gqlgen/graphql/introspection"
	_ "github.com/dmarkham/enumer"
	_ "github.com/google/wire/cmd/wire"
	_ "github.com/matryer/moq"
	_ "github.com/stormcat24/protodep"
	_ "github.com/tenntenn/testtime/cmd/testtime"
	_ "github.com/yoheimuta/protolint/cmd/protolint"
	_ "gotest.tools/gotestsum"
)
