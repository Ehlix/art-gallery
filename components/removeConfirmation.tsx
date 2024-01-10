import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {MdDelete} from "react-icons/md";
import * as React from "react";
import {useState} from "react";


// const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

interface RemoveConfirmation {
  callback: (t: boolean) => void;
  className: string;
}

export const RemoveConfirmation = ({className, callback}: RemoveConfirmation) => {
  const [isOpen, setOpen] = useState<boolean>(false);


  const confirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    callback(true);
    setOpen(false);
  };

  const openHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const cancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Trigger className={className} asChild>
        <button
          onClick={e => openHandler(e)}
          className="pointer-events-auto inline-flex items-center justify-center rounded-md bg-none font-medium leading-none outline-none text-t-error/80 h-[30px] w-[30px] hover:text-t-error focus:shadow-black">
          <MdDelete size={25}/>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="data-[state=open]:animate-overlayShow fixed inset-0"/>
        <AlertDialog.Content
          className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[92vw] max-w-[600px] text-t-hover-1 translate-x-[-50%] translate-y-[-50%] rounded-sm bg-t-main-2 border-t-main border-2 p-5 px-6 shadow-black/60 shadow-[0px_0px_0px_5000px] focus:outline-none">
          <AlertDialog.Title className="m-0 font-medium text-[20px]">
            Are you sure you want to remove this artwork?
          </AlertDialog.Title>
          <AlertDialog.Description
            className="mt-4 mb-5 text-base leading-normal">
            This action cannot be undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-7 sm:flex-col sm:gap-5">
            <AlertDialog.Cancel asChild>
              <button
                onClick={e => cancelHandler(e)}
                className="inline-flex items-center justify-center rounded-md border px-5 text-xl font-medium leading-none outline-none border-t-hover-1 text-t-hover-1 h-[40px] hover:bg-t-hover-1/20 focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={e => confirmHandler(e)}
                className="inline-flex items-center justify-center rounded-md border px-5 text-xl font-medium leading-none outline-none text-red11 text-t-error border-t-error h-[40px] hover:bg-t-error/20 focus:shadow-[0_0_0_2px]">
                Yes, remove
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};