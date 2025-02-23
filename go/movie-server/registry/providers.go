package registry

import (
	"database/sql"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	"github.com/movex-dev/movie-server/domain/config"
	"github.com/movex-dev/movie-server/infrastructure/ent"
)

func entClientProvider(db *config.Database) (*ent.Client, error) {
	sqlDB, err := sql.Open("pgx", db.DataSourceName())
	if err != nil {
		return nil, err
	}
	driver := entsql.OpenDB(dialect.Postgres, sqlDB)
	return ent.NewClient(ent.Driver(driver)), nil
}
