import { useQuery } from "@tanstack/react-query";
import api from "../config/api";
import type { TReqLalinsGetAll, TResLalinsGetAll } from "./lalins-model";
import { TBasicPaginationResponse } from "../utils/types/Response";

const endpoint = "/lalins";

class LalinsServices {
  getAll(params?: TReqLalinsGetAll): Promise<TBasicPaginationResponse<TResLalinsGetAll>> {
    return api
      .get(`${endpoint}`, {
        params,
      })
      .then((response) => response.data.data);
  }
}

const lalinsService = new LalinsServices();

export const useLalinsGetAll = (params?: TReqLalinsGetAll) => {
  return useQuery({
    queryKey: ["lalins-all", params],
    queryFn: () =>
      lalinsService.getAll(params),
  });
};
