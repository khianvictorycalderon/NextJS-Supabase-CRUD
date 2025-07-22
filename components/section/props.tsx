`use client`;

export interface SubmitFeedbackProps {
  type: "default" | "success" | "warning" | "error";
  message: string;
}

export const FeedbackColors = {
  default: "text-white",
  success: "text-green-500",
  warning: "text-yellow-400",
  error: "text-red-600"
}

export interface UserListProps {
  id: number;
  name: string;
  desc: string;
  address: string;
  created_at: string;
}