import { gql } from '@apollo/client';

// 動画一覧を取得するクエリ
export const GET_VIDEOS = gql`
  query GetVideos {
    videos {
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

// 特定の動画を取得するクエリ
export const GET_VIDEO = gql`
  query GetVideo($id: ID!) {
    video(id: $id) {
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