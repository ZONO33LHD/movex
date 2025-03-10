package http

import (
	"context"
	"fmt"
	"net/http"

	"github.com/movex-dev/movie-server/infrastructure/log"

	"go.uber.org/zap"
)

func writeError(ctx context.Context, w http.ResponseWriter, code int, message string, err error) {
	log.MustFromContext(ctx).Error(ctx, message, zap.Error(err))
	w.WriteHeader(code)
	if message == "" {
		message = err.Error()
	}
	_, _ = fmt.Fprint(w, message)
}

func writeWarning(ctx context.Context, w http.ResponseWriter, message string, err error) {
	log.MustFromContext(ctx).Warn(ctx, message, zap.Error(err))
	w.WriteHeader(http.StatusUnauthorized)
	if message == "" {
		message = err.Error()
	}
	_, _ = fmt.Fprint(w, message)
}
