import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {MdDelete} from "react-icons/md";
import * as React from "react";


// const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

interface RemoveConfirmation {
  callback: (t: boolean) => void;
  className:string
}

export default function RemoveConfirmation({className, callback}: RemoveConfirmation) {


  function clickHandler() {
    callback(true);
  }

  return (
    <AlertDialog.Root >
      <AlertDialog.Trigger className={className} asChild>
        <button
          className="inline-flex items-center justify-center bg-none font-medium leading-none outline-none text-t-error/80 h-[30px] w-[30px] rounded-md hover:text-t-error focus:shadow-black">
          <MdDelete/>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Content
          className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[92vw] max-w-[600px] text-t-hover-1 translate-x-[-50%] translate-y-[-50%] rounded-sm bg-t-main-2 border-t-main border-2 p-5 px-6 shadow-black/60 shadow-[0px_0px_0px_5000px]  focus:outline-none">
          <AlertDialog.Title className="m-0 font-medium text-[20px]">
            Are you sure you want to remove this artwork?
          </AlertDialog.Title>
          <AlertDialog.Description
            className="mt-4 mb-5 leading-normal text-base">
            This action cannot be undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-7 sm:gap-5 sm:flex-col">
            <AlertDialog.Cancel asChild>
              <button
                className="text-xl inline-flex items-center justify-center font-medium leading-none outline-none border-t-hover-1 border text-t-hover-1 h-[40px] rounded-md px-5 hover:bg-t-hover-1/20 focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={clickHandler}
                className="text-xl inline-flex items-center justify-center font-medium leading-none outline-none text-red11 border text-t-error border-t-error h-[40px] rounded-md px-5 hover:bg-t-error/20 focus:shadow-[0_0_0_2px]">
                Yes, remove
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};