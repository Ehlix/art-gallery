import * as yup from "yup";

export const changeEmailSchema = yup.object({
  email: yup.string().email('enter valid email').required('required email'),
  password: yup.string().min(6).max(30).required(),
}).required();

export type changeEmailType = yup.InferType<typeof changeEmailSchema>;