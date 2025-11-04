export interface User {
  _id: string;
  username: string;
  fullname: string;
  signature?: {
    public_id: string;
    secure_url: string;
  } | null;
  status: boolean;
}
