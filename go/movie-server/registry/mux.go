package registry

import (
	"net/http"

	"github.com/movex-dev/movie-server/domain/config"
	"github.com/movex-dev/movie-server/infrastructure/ent"
	ihttp "github.com/movex-dev/movie-server/interface/http"
)

func newMux(
	cfg *config.Vars,
	entClient *ent.Client,
) *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", ihttp.NewHealthCheckHandler(entClient).HealthCheck)

	return mux
}
