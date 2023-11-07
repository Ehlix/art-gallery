import * as yup from "yup";


export const createProfileSchema = yup.object({
  name: yup.string().test('name', 'required 3-50 characters', (title)=>{
    return !!title && title.length >= 3 && title.length <= 50
  }).required(),
  headline: yup.string().test('headline', 'required 3-100 characters', (title)=>{
    return !!title && title.length >= 3 && title.length <= 100
  }).required(),
  city: yup.string().test('city', 'required 3-50 characters', (title)=>{
    return !!title && title.length >= 3 && title.length <= 50
  }).required(),
  country: yup.string().test('country', 'country is required', (title)=>{
    return !!title
  }).required(),
  avatar: yup.mixed<File>().test('avatar', 'please upload avatar', (thumbnail) => {
    return !!thumbnail;
  }).test('avatarFileType', 'only JPEG, PNG image are allowed',
    (file) => {
      return file && (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png');
    }).required('avatar is required'),
  cover: yup.mixed<File>().test('avatar', 'please upload avatar', (thumbnail) => {
    return !!thumbnail;
  }).test('avatarFileType', 'only JPEG, PNG image are allowed',
    (file ) => {
      return file && (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png');
    }).required('cover is required'),
}).required();

export type CreateProfileType = yup.InferType<typeof createProfileSchema>;