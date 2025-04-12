alter table "public"."comments"
  add constraint "comments_video_id_fkey"
  foreign key ("video_id")
  references "public"."videos"
  ("id") on update no action on delete cascade;
