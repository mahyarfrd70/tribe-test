export interface CardProps {
  title: string;
  body: string;
  createdAt: string;
  name: string;
  commentsCount: number;
  likesCount: number;
  hasDeletePermission: boolean;
  reacted: boolean;
  onDeletePost: () => void;
  onReact: () => void;
}
