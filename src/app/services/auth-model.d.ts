export type TResAuthLogin = {
  token: string;
  code: number;
  is_logged_in: number;
  message: string;
  status: boolean;
};

export type TReqAuthLogin = {
  username: string;
  password: string;
};
