'use client';
import {FaAsterisk} from "react-icons/fa";
import * as React from "react";
import {useEffect, useState} from "react";
import * as Form from "@radix-ui/react-form";
import {cn} from "@/utils/twMergeClsx";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {changeEmailSchema, changeEmailType} from "@/validations/changeEmailSchema";
import {useIsMount} from "@/hooks/useIsMount";

type Props = {
  email: string
};


export const UserEmail = ({email: defaultEmail}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(defaultEmail);
  const isMount = useIsMount();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm<changeEmailType>({
    resolver: yupResolver(changeEmailSchema),
  });

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };

  const onSubmit = () => {

  };

  useEffect(() => {
    setValue('email', email, {shouldValidate: true});
  }, [email]);

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
                "border-t-error focus:border-t-error hover:border-t-error": errors.email
              })}
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => {
                emailChangeHandler(e);
              }}
            />
          </Form.Control>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.email?.message}
          </span>
        </Form.Field>
        <Form.Field className="" name="password">
          <Form.Label
            className="mt-3 mb-1 flex gap-1 text-lg text-t-main">
            <FaAsterisk size={7} title="Required" className="cursor-help"/>
            Confirm password
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
        <div className="flex items-center justify-center">
          <Form.Submit asChild>
            <button
              className="mt-2 flex items-center justify-center rounded-md px-2 font-medium leading-none transition-all duration-300 bg-t-hover-2 w-[200px] text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1"
              disabled={loading}>
              {
                loading
                  ?
                  'Loading..'
                  :
                  'Change email'
              }
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </>
  );

};