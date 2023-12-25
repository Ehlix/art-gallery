import * as yup from 'yup';
import {bytesToMb} from "@/utils/utils";
import {SelectedFileType, Thumbnail} from "@/components/newProject/newProjectMain";

export const newProjectSchema = yup.object({
  title: yup.string().min(5).max(50).required(),
  thumbnail: yup.mixed<Thumbnail>().test('thumbnailLength', 'upload thumbnail', (thumbnail) => {
    return !!thumbnail;
  }).test('thumbnail', 'only JPEG, PNG image are allowed',
    (thumbnail) => {
      return thumbnail && (thumbnail.file === null || thumbnail.file.type === 'image/jpg' || thumbnail.file.type === 'image/jpeg' || thumbnail.file.type === 'image/png');
    }),
  image: yup.mixed<Array<SelectedFileType>>().test('image', 'only JPEG, PNG image are allowed', (selectedFiles) => {
    return selectedFiles ? selectedFiles.every((v) => {
      return (v.file === null || v.file.type === 'image/jpg' || v.file.type === 'image/jpeg' || v.file.type === 'image/png');
    }) : false;
  }).test('imageSize', 'image must ve less than 15mb', (selectedFiles) => {
    return selectedFiles ? selectedFiles.every((v) => {
      return (v.file === null) || bytesToMb(v.file.size) <= 15;
    }) : false;
  }).test('length', 'upload 1-5 images', (file) => {
    return file && file?.length > 0 && file?.length <= 5;
  }),
  description: yup.string().min(5).max(500).required(),
  medium: yup.mixed<Array<string> | []>().test('categories', 'select 1-3 categories', (data: any) => {
    return data?.length > 0 && data?.length <= 3;
  }),
  subject: yup.mixed<Array<string> | []>().test('categories', 'select 1-3 categories', (data: any) => {
    return data?.length > 0 && data?.length <= 3;
  }),
}).required();

export type NewProjectType = yup.InferType<typeof newProjectSchema>;