package http

import (
	"fmt"
	"net/http"

	"github.com/movex-dev/movie-server/domain/errors"
	"github.com/movex-dev/movie-server/infrastructure/ent"
	"github.com/movex-dev/movie-server/infrastructure/log"

	"go.uber.org/zap"
)

type HealthCheckHandler struct {
	entClient *ent.Client
}

func NewHealthCheckHandler(entClient *ent.Client) *HealthCheckHandler {
	return &HealthCheckHandler{
		entClient: entClient,
	}
}

func (h *HealthCheckHandler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	_, err := h.entClient.Video.Query().First(r.Context())
	if err != nil {
		if !errors.IsNotFound(err) {
			log.MustFromContext(r.Context()).Error(r.Context(), "failed to get subject", zap.Error(err))
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		// not found is ok
	}
	w.WriteHeader(http.StatusOK)
	_, _ = fmt.Fprint(w, "OK")
}
