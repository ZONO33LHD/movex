import { gql } from '@apollo/client';

// 動画を作成するミューテーション
export const CREATE_VIDEO = gql`
  mutation CreateVideo($input: VideoInput!) {
    createVideo(input: $input) {
      id
      title
      description
      thumbnailUrl
      videoUrl
      duration
      createdAt
      updatedAt
      published
      views
      likes
      categoryId
    }
  }
`;

// 動画を更新するミューテーション
export const UPDATE_VIDEO = gql`
  mutation UpdateVideo($id: ID!, $input: VideoInput!) {
    updateVideo(id: $id, input: $input) {
      id
      title
      description
      thumbnailUrl
      videoUrl
      duration
      createdAt
      updatedAt
      published
      views
      likes
      categoryId
    }
  }
`;

// 動画を削除するミューテーション
export const DELETE_VIDEO = gql`
  mutation DeleteVideo($id: ID!) {
    deleteVideo(id: $id) {
      id
      title
    }
  }
`;

// 動画の公開状態を切り替えるミューテーション
export const TOGGLE_VIDEO_PUBLISH = gql`
  mutation ToggleVideoPublish($id: ID!) {
    toggleVideoPublish(id: $id) {
      id
      published
    }
  }
`; 