package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

type Video struct {
	ent.Schema
}

func (Video) Fields() []ent.Field {
	return []ent.Field{
		field.String("title").NotEmpty(),
		field.String("description").NotEmpty(),
		field.String("url").NotEmpty(),
	}
}

func (Video) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("videos", Video.Type),
	}
}
