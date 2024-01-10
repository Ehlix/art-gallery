import {twMerge} from "tailwind-merge";
import {ClassValue, clsx} from "clsx";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
