import {MutableRefObject, useEffect} from "react";

type UseClickOutside = (
  ref: MutableRefObject<Element | null>,
  callback: () => void
) => void
export const useClickOutside: UseClickOutside = (ref, callback) => {
  const handleClick = (e: MouseEvent) => {
    // @ts-ignore
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
