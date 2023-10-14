import * as yup from 'yup';
import {bytesToMb} from "@/utils/utils";

export const newProjectSchema = yup.object({
  title: yup.string().min(5).max(50).required(),
  image: yup.mixed<Array<File>>().test('image', 'only JPEG, PNG image are allowed', (file) => {
    const isValid = file ? file.every((v: File) => {
      return v.type === 'image/jpg' || v.type === 'image/jpeg' || v.type === 'image/png';
    }) : false;
    return isValid;
  }).test('imageSize', 'image must ve less than 15mb', (file) => {
    const isValid = file ? file.every((v) => {
      return bytesToMb(v.size) <= 15;
    }) : false;
    return isValid;
  }).test('length', 'please load 1-5 images', (file) => {
    const isValid = file && file?.length > 0 && file?.length <= 5;
    return isValid;
  }),
  description: yup.string().min(5).max(500).required(),
  medium: yup.mixed<Array<string> | []>().test('categories', 'please select 3 category', (data: any) => {
    const isValid = data?.length === 3;
    return isValid;
  }),
}).required();

export type NewProjectType = yup.InferType<typeof newProjectSchema>;