// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/movex-dev/movie-server/infrastructure/ent/predicate"
	"github.com/movex-dev/movie-server/infrastructure/ent/video"
)

// VideoUpdate is the builder for updating Video entities.
type VideoUpdate struct {
	config
	hooks     []Hook
	mutation  *VideoMutation
	modifiers []func(*sql.UpdateBuilder)
}

// Where appends a list predicates to the VideoUpdate builder.
func (vu *VideoUpdate) Where(ps ...predicate.Video) *VideoUpdate {
	vu.mutation.Where(ps...)
	return vu
}

// SetTitle sets the "title" field.
func (vu *VideoUpdate) SetTitle(s string) *VideoUpdate {
	vu.mutation.SetTitle(s)
	return vu
}

// SetNillableTitle sets the "title" field if the given value is not nil.
func (vu *VideoUpdate) SetNillableTitle(s *string) *VideoUpdate {
	if s != nil {
		vu.SetTitle(*s)
	}
	return vu
}

// SetDescription sets the "description" field.
func (vu *VideoUpdate) SetDescription(s string) *VideoUpdate {
	vu.mutation.SetDescription(s)
	return vu
}

// SetNillableDescription sets the "description" field if the given value is not nil.
func (vu *VideoUpdate) SetNillableDescription(s *string) *VideoUpdate {
	if s != nil {
		vu.SetDescription(*s)
	}
	return vu
}

// SetURL sets the "url" field.
func (vu *VideoUpdate) SetURL(s string) *VideoUpdate {
	vu.mutation.SetURL(s)
	return vu
}

// SetNillableURL sets the "url" field if the given value is not nil.
func (vu *VideoUpdate) SetNillableURL(s *string) *VideoUpdate {
	if s != nil {
		vu.SetURL(*s)
	}
	return vu
}

// AddVideoIDs adds the "videos" edge to the Video entity by IDs.
func (vu *VideoUpdate) AddVideoIDs(ids ...int) *VideoUpdate {
	vu.mutation.AddVideoIDs(ids...)
	return vu
}

// AddVideos adds the "videos" edges to the Video entity.
func (vu *VideoUpdate) AddVideos(v ...*Video) *VideoUpdate {
	ids := make([]int, len(v))
	for i := range v {
		ids[i] = v[i].ID
	}
	return vu.AddVideoIDs(ids...)
}

// Mutation returns the VideoMutation object of the builder.
func (vu *VideoUpdate) Mutation() *VideoMutation {
	return vu.mutation
}

// ClearVideos clears all "videos" edges to the Video entity.
func (vu *VideoUpdate) ClearVideos() *VideoUpdate {
	vu.mutation.ClearVideos()
	return vu
}

// RemoveVideoIDs removes the "videos" edge to Video entities by IDs.
func (vu *VideoUpdate) RemoveVideoIDs(ids ...int) *VideoUpdate {
	vu.mutation.RemoveVideoIDs(ids...)
	return vu
}

// RemoveVideos removes "videos" edges to Video entities.
func (vu *VideoUpdate) RemoveVideos(v ...*Video) *VideoUpdate {
	ids := make([]int, len(v))
	for i := range v {
		ids[i] = v[i].ID
	}
	return vu.RemoveVideoIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (vu *VideoUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, vu.sqlSave, vu.mutation, vu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (vu *VideoUpdate) SaveX(ctx context.Context) int {
	affected, err := vu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (vu *VideoUpdate) Exec(ctx context.Context) error {
	_, err := vu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (vu *VideoUpdate) ExecX(ctx context.Context) {
	if err := vu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (vu *VideoUpdate) check() error {
	if v, ok := vu.mutation.Title(); ok {
		if err := video.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "Video.title": %w`, err)}
		}
	}
	if v, ok := vu.mutation.Description(); ok {
		if err := video.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf(`ent: validator failed for field "Video.description": %w`, err)}
		}
	}
	if v, ok := vu.mutation.URL(); ok {
		if err := video.URLValidator(v); err != nil {
			return &ValidationError{Name: "url", err: fmt.Errorf(`ent: validator failed for field "Video.url": %w`, err)}
		}
	}
	return nil
}

// Modify adds a statement modifier for attaching custom logic to the UPDATE statement.
func (vu *VideoUpdate) Modify(modifiers ...func(u *sql.UpdateBuilder)) *VideoUpdate {
	vu.modifiers = append(vu.modifiers, modifiers...)
	return vu
}

func (vu *VideoUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := vu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(video.Table, video.Columns, sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt))
	if ps := vu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := vu.mutation.Title(); ok {
		_spec.SetField(video.FieldTitle, field.TypeString, value)
	}
	if value, ok := vu.mutation.Description(); ok {
		_spec.SetField(video.FieldDescription, field.TypeString, value)
	}
	if value, ok := vu.mutation.URL(); ok {
		_spec.SetField(video.FieldURL, field.TypeString, value)
	}
	if vu.mutation.VideosCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   video.VideosTable,
			Columns: video.VideosPrimaryKey,
			Bidi:    true,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := vu.mutation.RemovedVideosIDs(); len(nodes) > 0 && !vu.mutation.VideosCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   video.VideosTable,
			Columns: video.VideosPrimaryKey,
			Bidi:    true,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := vu.mutation.VideosIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   video.VideosTable,
			Columns: video.VideosPrimaryKey,
			Bidi:    true,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_spec.AddModifiers(vu.modifiers...)
	if n, err = sqlgraph.UpdateNodes(ctx, vu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{video.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	vu.mutation.done = true
	return n, nil
}

// VideoUpdateOne is the builder for updating a single Video entity.
type VideoUpdateOne struct {
	config
	fields    []string
	hooks     []Hook
	mutation  *VideoMutation
	modifiers []func(*sql.UpdateBuilder)
}

// SetTitle sets the "title" field.
func (vuo *VideoUpdateOne) SetTitle(s string) *VideoUpdateOne {
	vuo.mutation.SetTitle(s)
	return vuo
}

// SetNillableTitle sets the "title" field if the given value is not nil.
func (vuo *VideoUpdateOne) SetNillableTitle(s *string) *VideoUpdateOne {
	if s != nil {
		vuo.SetTitle(*s)
	}
	return vuo
}

// SetDescription sets the "description" field.
func (vuo *VideoUpdateOne) SetDescription(s string) *VideoUpdateOne {
	vuo.mutation.SetDescription(s)
	return vuo
}

// SetNillableDescription sets the "description" field if the given value is not nil.
func (vuo *VideoUpdateOne) SetNillableDescription(s *string) *VideoUpdateOne {
	if s != nil {
		vuo.SetDescription(*s)
	}
	return vuo
}

// SetURL sets the "url" field.
func (vuo *VideoUpdateOne) SetURL(s string) *VideoUpdateOne {
	vuo.mutation.SetURL(s)
	return vuo
}

// SetNillableURL sets the "url" field if the given value is not nil.
func (vuo *VideoUpdateOne) SetNillableURL(s *string) *VideoUpdateOne {
	if s != nil {
		vuo.SetURL(*s)
	}
	return vuo
}

// AddVideoIDs adds the "videos" edge to the Video entity by IDs.
func (vuo *VideoUpdateOne) AddVideoIDs(ids ...int) *VideoUpdateOne {
	vuo.mutation.AddVideoIDs(ids...)
	return vuo
}

// AddVideos adds the "videos" edges to the Video entity.
func (vuo *VideoUpdateOne) AddVideos(v ...*Video) *VideoUpdateOne {
	ids := make([]int, len(v))
	for i := range v {
		ids[i] = v[i].ID
	}
	return vuo.AddVideoIDs(ids...)
}

// Mutation returns the VideoMutation object of the builder.
func (vuo *VideoUpdateOne) Mutation() *VideoMutation {
	return vuo.mutation
}

// ClearVideos clears all "videos" edges to the Video entity.
func (vuo *VideoUpdateOne) ClearVideos() *VideoUpdateOne {
	vuo.mutation.ClearVideos()
	return vuo
}

// RemoveVideoIDs removes the "videos" edge to Video entities by IDs.
func (vuo *VideoUpdateOne) RemoveVideoIDs(ids ...int) *VideoUpdateOne {
	vuo.mutation.RemoveVideoIDs(ids...)
	return vuo
}

// RemoveVideos removes "videos" edges to Video entities.
func (vuo *VideoUpdateOne) RemoveVideos(v ...*Video) *VideoUpdateOne {
	ids := make([]int, len(v))
	for i := range v {
		ids[i] = v[i].ID
	}
	return vuo.RemoveVideoIDs(ids...)
}

// Where appends a list predicates to the VideoUpdate builder.
func (vuo *VideoUpdateOne) Where(ps ...predicate.Video) *VideoUpdateOne {
	vuo.mutation.Where(ps...)
	return vuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (vuo *VideoUpdateOne) Select(field string, fields ...string) *VideoUpdateOne {
	vuo.fields = append([]string{field}, fields...)
	return vuo
}

// Save executes the query and returns the updated Video entity.
func (vuo *VideoUpdateOne) Save(ctx context.Context) (*Video, error) {
	return withHooks(ctx, vuo.sqlSave, vuo.mutation, vuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (vuo *VideoUpdateOne) SaveX(ctx context.Context) *Video {
	node, err := vuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (vuo *VideoUpdateOne) Exec(ctx context.Context) error {
	_, err := vuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (vuo *VideoUpdateOne) ExecX(ctx context.Context) {
	if err := vuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (vuo *VideoUpdateOne) check() error {
	if v, ok := vuo.mutation.Title(); ok {
		if err := video.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "Video.title": %w`, err)}
		}
	}
	if v, ok := vuo.mutation.Description(); ok {
		if err := video.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf(`ent: validator failed for field "Video.description": %w`, err)}
		}
	}
	if v, ok := vuo.mutation.URL(); ok {
		if err := video.URLValidator(v); err != nil {
			return &ValidationError{Name: "url", err: fmt.Errorf(`ent: validator failed for field "Video.url": %w`, err)}
		}
	}
	return nil
}

// Modify adds a statement modifier for attaching custom logic to the UPDATE statement.
func (vuo *VideoUpdateOne) Modify(modifiers ...func(u *sql.UpdateBuilder)) *VideoUpdateOne {
	vuo.modifiers = append(vuo.modifiers, modifiers...)
	return vuo
}

func (vuo *VideoUpdateOne) sqlSave(ctx context.Context) (_node *Video, err error) {
	if err := vuo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(video.Table, video.Columns, sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt))
	id, ok := vuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Video.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := vuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, video.FieldID)
		for _, f := range fields {
			if !video.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != video.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := vuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := vuo.mutation.Title(); ok {
		_spec.SetField(video.FieldTitle, field.TypeString, value)
	}
	if value, ok := vuo.mutation.Description(); ok {
		_spec.SetField(video.FieldDescription, field.TypeString, value)
	}
	if value, ok := vuo.mutation.URL(); ok {
		_spec.SetField(video.FieldURL, field.TypeString, value)
	}
	if vuo.mutation.VideosCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   video.VideosTable,
			Columns: video.VideosPrimaryKey,
			Bidi:    true,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := vuo.mutation.RemovedVideosIDs(); len(nodes) > 0 && !vuo.mutation.VideosCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   video.VideosTable,
			Columns: video.VideosPrimaryKey,
			Bidi:    true,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := vuo.mutation.VideosIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2M,
			Inverse: false,
			Table:   video.VideosTable,
			Columns: video.VideosPrimaryKey,
			Bidi:    true,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(video.FieldID, field.TypeInt),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_spec.AddModifiers(vuo.modifiers...)
	_node = &Video{config: vuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, vuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{video.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	vuo.mutation.done = true
	return _node, nil
}
