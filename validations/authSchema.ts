import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().min(4).max(50).required(),
  email: yup.string().email('enter valid email').required('required email'),
  password: yup.string().min(6).max(30).required(),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), 'qq']).required(),
}).required();

export type RegisterType = yup.InferType<typeof registerSchema>;


export const loginSchema = yup.object({
  email: yup.string().email('enter valid email').required(),
  password: yup.string().min(6).max(30).required(),
}).required();

export type LoginType = yup.InferType<typeof loginSchema>;