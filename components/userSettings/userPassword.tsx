import * as Form from "@radix-ui/react-form";
import * as React from "react";
import {useState} from "react";
import {cn} from "@/utils/twMergeClsx";
import {FaAsterisk} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
  changePasswordSchema,
  changePasswordType
} from "@/validations/changePasswordSchema";

type Props = {};

export const UserPassword = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<changePasswordType>({
    resolver: yupResolver(changePasswordSchema),
  });


  const onSubmit = () => {

  };

  return (
    <>
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col">
        <h4
          className="mb-1 flex gap-1 text-xl text-t-hover-1">
          Change Password
        </h4>
        <Form.Field className="" name="current password">
          <Form.Label
            className="mt-3 mb-1 flex gap-1 text-lg text-t-main">
            <FaAsterisk size={7} title="Required" className="cursor-help"/>
            Current password
          </Form.Label>
          <Form.Control asChild>
            <input
              className={cn('', {
                "border-t-error focus:border-t-error hover:border-t-error": errors.password
              })}
              type="password"
              placeholder="*********"
              {...register('password')}
            />
          </Form.Control>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.password?.message}
          </span>
        </Form.Field>
        <Form.Field className="" name="new password">
          <Form.Label
            className="mt-3 mb-1 flex gap-1 text-lg text-t-main">
            <FaAsterisk size={7} title="Required" className="cursor-help"/>
            New password
          </Form.Label>
          <Form.Control asChild>
            <input
              className={cn('', {
                "border-t-error focus:border-t-error hover:border-t-error": errors.newPassword
              })}
              type="password"
              placeholder="*********"
              {...register('newPassword')}
            />
          </Form.Control>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.newPassword?.message}
          </span>
        </Form.Field>
        <Form.Field className="" name="confirm new password">
          <Form.Label
            className="mt-3 mb-1 flex gap-1 text-lg text-t-main">
            <FaAsterisk size={7} title="Required" className="cursor-help"/>
            * Confirm new password
          </Form.Label>
          <Form.Control asChild>
            <input
              className={cn('', {
                "border-t-error focus:border-t-error hover:border-t-error": errors.newPasswordConfirm
              })}
              type="password"
              placeholder="*********"
              {...register('newPasswordConfirm')}
            />
          </Form.Control>
          <span className="text-sm -tracking-tight text-t-error">
            {
              errors.newPasswordConfirm
                ?
                'password not equals'
                :
                ''
            }
          </span>
        </Form.Field>
        <div className="flex justify-center items-center">
          <Form.Submit asChild>
            <button
              className="mt-2 flex items-center justify-center rounded-md px-2 font-medium leading-none transition-all duration-300 bg-t-hover-2 w-[200px] text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1"
              disabled={loading}>
              {
                loading
                ?
                'Loading..'
                :
                'Change password'
              }
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </>
  );
};