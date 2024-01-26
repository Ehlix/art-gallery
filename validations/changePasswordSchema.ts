import * as yup from 'yup';

export const changePasswordSchema = yup
  .object({
    password: yup.string().min(6).max(30).required(),
    newPassword: yup.string().min(6).max(30).required(),
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword')])
      .required(),
  })
  .required();

export type changePasswordType = yup.InferType<typeof changePasswordSchema>;
