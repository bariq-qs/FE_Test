export type TBasicPaginationResponse<TData> = {
  total_pages: number;
  current_page: number;
  count: number;
  rows: {
    count: number;
    rows: TData[];
  };
};

export type TBasicResponse<TData> = {
  data: Array<TData>;
};

export type TBasicPaginationRequest = {
  limit: number;
  page: number;
};
