import * as yup from "yup";

const schemaFormGerbang = yup.object({
  idRuas: yup.number().required("Harus diisi."),
  idGerbang: yup.number().required("Harus diisi."),
  namaRuas: yup.string().required("Harus diisi."),
  namaGerbang: yup.string().required("Harus diisi."),
});

type TSchemaFormGerbang = yup.InferType<typeof schemaFormGerbang>;

export { schemaFormGerbang };

export type { TSchemaFormGerbang };
