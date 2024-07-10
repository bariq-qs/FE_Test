import { TBasicPaginationRequest } from "../utils/types/Response";

export type TResLalinsGetAll = {
  id: number;
  IdCabang: number;
  IdGerbang: number;
  Tanggal: Date;
  Shift: number;
  IdGardu: number;
  Golongan: number;
  IdAsalGerbang: number;
  Tunai: number;
  DinasOpr: number;
  DinasMitra: number;
  DinasKary: number;
  eMandiri: number;
  eBri: number;
  eBni: number;
  eBca: number;
  eNobu: number;
  eDKI: number;
  eMega: number;
  eFlo: number;
};
export type TReqLalinsGetAll = TBasicPaginationRequest & {
  tanggal?: string;
};
