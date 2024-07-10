import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../config/api";
import { TBasicPaginationResponse } from "../utils/types/Response";
import {
  TPayloadSaveGerbangs,
  TRequestGerbangsGetAll,
  TResponseGerbangsGetAll,
} from "./gerbangs-model";

const endpoint = "/gerbangs";

class GerbangsServices {
  getAll({
    limit,
    page,
    IdCabang,
    NamaCabang,
    NamaGerbang,
    id,
  }: TRequestGerbangsGetAll): Promise<
    TBasicPaginationResponse<TResponseGerbangsGetAll>
  > {
    return api
      .get(`${endpoint}`, {
        params: {
          page,
          limit,
          IdCabang,
          NamaCabang,
          NamaGerbang,
          id,
        },
      })
      .then((response) => response.data.data);
  }
  save(isEdit = false, payload: TPayloadSaveGerbangs) {
    if (isEdit) {
      return api.put(`${endpoint}/`, payload).then((response) => response.data);
    }
    return api.post(endpoint, payload).then((response) => response.data);
  }
  delete(payload: Pick<TPayloadSaveGerbangs, "IdCabang" | "id">) {
    return api
      .delete(`${endpoint}/`, {
        data: payload,
      })
      .then((res) => res.data);
  }
}

const gerbangsService = new GerbangsServices();

export const useGerbangGetAll = (params?: TRequestGerbangsGetAll) => {
  return useQuery({
    queryKey: ["gerbang-all", params],
    queryFn: () => gerbangsService.getAll(params),
  });
};

export const useSaveGerbang = () => {
  return useMutation({
    // mutationKey
    mutationFn: ({
      isEdit,
      payload,
    }: {
      isEdit: boolean;
      payload: TPayloadSaveGerbangs;
    }) => gerbangsService.save(isEdit, payload),
  });
};

export const useDeleteGerbang = () => {
  return useMutation({
    // mutationKey
    mutationFn: ({
      id,
      IdCabang,
    }: Pick<TPayloadSaveGerbangs, "IdCabang" | "id">) =>
      gerbangsService.delete({
        id,
        IdCabang,
      }),
  });
};
