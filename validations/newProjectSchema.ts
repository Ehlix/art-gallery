import * as yup from 'yup';
import {bytesToMb} from "@/utils/utils";
import {SelectedFileType} from "@/components/newProject/imageUploadZone";

export const newProjectSchema = yup.object({
  title: yup.string().min(5).max(50).required(),
  image: yup.mixed<Array<SelectedFileType>>().test('image', 'only JPEG, PNG image are allowed', (selectedFiles) => {
    const isValid = selectedFiles ? selectedFiles.every((v) => {
      return v.file.type === 'image/jpg' || v.file.type === 'image/jpeg' || v.file.type === 'image/png';
    }) : false;
    return isValid;
  }).test('imageSize', 'image must ve less than 15mb', (selectedFiles) => {
    const isValid = selectedFiles ? selectedFiles.every((v) => {
      return bytesToMb(v.file.size) <= 15;
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
  subject: yup.mixed<Array<string> | []>().test('categories', 'please select 3 category', (data: any) => {
    const isValid = data?.length === 3;
    return isValid;
  }),
}).required();

export type NewProjectType = yup.InferType<typeof newProjectSchema>;