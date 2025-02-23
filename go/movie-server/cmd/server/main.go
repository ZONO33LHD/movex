package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime"
	"time"

	"github.com/joho/godotenv"

	"github.com/movex-dev/movie-server/domain/config"
	infralog "github.com/movex-dev/movie-server/infrastructure/log"
	ihttp "github.com/movex-dev/movie-server/interface/http"
	"github.com/movex-dev/movie-server/registry"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	ctx := context.Background()
	cfg := config.MustNew(ctx)
	logger := infralog.New(os.Stdout)
	logger.Info(ctx, "starting server...")

	muxServer, cleanup, err := registry.InitMuxServer(ctx, cfg)
	if err != nil {
		log.Panic("failed to init mux server: %v", err)
	}
	defer cleanup()

	withLoggerHandler := func(next http.Handler) http.HandlerFunc {
		return ihttp.WithLogger(next.ServeHTTP, logger)
	}

	rootMux := http.NewServeMux()
	rootMux.Handle("/", withLoggerHandler(muxServer.Mux))

	logger.Info(ctx, fmt.Sprintf("Starting a server on port %d with %s", cfg.Port, runtime.Version()))
	httpServer := &http.Server{
		Addr:              fmt.Sprintf(":%d", cfg.Port),
		Handler:           rootMux,
		ReadHeaderTimeout: 30 * time.Second,
	}
	if err := httpServer.ListenAndServe(); err != nil {
		cleanup()
		log.Panic(err)
	}
}
