//go:build wireinject
// +build wireinject

package registry

import (
	"context"
	"net/http"

	_ "github.com/jackc/pgx/v5/stdlib"

	"github.com/google/wire"
	"github.com/movex-dev/movie-server/domain/config"
)

type MuxServer struct {
	Mux *http.ServeMux
}

func InitMuxServer(ctx context.Context, cfg *config.Vars) (*MuxServer, func(), error) {
	panic(wire.Build(
		wire.FieldsOf(new(*config.Vars), "Database"),
		entClientProvider,
		newMux,
		wire.Struct(new(MuxServer), "Mux"),
	))
}
