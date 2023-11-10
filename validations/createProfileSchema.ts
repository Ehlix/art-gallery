import * as yup from "yup";


export const createProfileSchema = yup.object({
  name: yup.string().test('name', 'required 3-50 characters', (title) => {
    return !!title && title.length >= 3 && title.length <= 50;
  }).required(),
  headline: yup.string().test('headline', 'required 3-100 characters', (title) => {
    return !!title && title.length >= 3 && title.length <= 100;
  }).required(),
  city: yup.string().test('city', 'required 3-50 characters', (title) => {
    return !!title && title.length >= 3 && title.length <= 50;
  }).required(),
  country: yup.string().test('country', 'country is required', (title) => {
    return !!title;
  }).required()
}).required();

export type CreateProfileType = yup.InferType<typeof createProfileSchema>;