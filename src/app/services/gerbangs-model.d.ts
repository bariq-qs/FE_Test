import { TBasicPaginationRequest } from "../utils/types/Response";

export type TResponseGerbangsGetAll = {
  id: number;
  IdCabang: number;
  NamaCabang: string;
  NamaGerbang: string;
};

export type TRequestGerbangsGetAll = TBasicPaginationRequest &
  Partial<TResponseGerbangGetAll>;

export type TPayloadSaveGerbangs = TResponseGerbangsGetAll;
