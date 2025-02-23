package errors

import (
	"database/sql"
	"errors"

	// "github.com/movex-dev/movie-server/infrastructure/ent"

	"github.com/morikuni/failure"
)

const (
	CodeNotFound failure.StringCode = "not-found"
)

func IsNotFound(err error) bool {
	// if ok := ent.IsNotFound(err); ok {
	// 	return true
	// }
	if failure.Is(err, CodeNotFound) {
		return true
	}
	return errors.Is(err, sql.ErrNoRows)
}

func IsRetryable(err error) bool {
	var re *RetryableError
	return errors.As(err, &re)
}
