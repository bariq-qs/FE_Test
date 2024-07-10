import * as yup from "yup"

const schemaLogin = yup.object({
  username: yup.string().required('Harus diisi.'),
  password: yup.string().required('Harus diisi.').min(6, 'Minimal 6 karakter.')
})

type TSchemaLogin = yup.InferType<typeof schemaLogin>

export {
  schemaLogin
}

export type {
  TSchemaLogin
}