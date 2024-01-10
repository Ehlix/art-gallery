import {SelectedFileType} from "@/components/newProject/newProjectMain";

export const sortSelectedFiles = (a: SelectedFileType, b: SelectedFileType) => {
  if (a.order > b.order) {
    return 1;
  } else {
    return -1;
  }
};