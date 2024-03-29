'use client';
import * as Form from '@radix-ui/react-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema, RegisterType } from '@/validations/authSchema';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { Database } from '@/lib/database.types';
import Link from 'next/link';

export const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (payload: RegisterType) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          site: payload.email.replace(new RegExp(`(.*)@.*`), '$1'),
          name: payload.name,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message, { theme: 'colored' });
    } else if (data.user) {
      await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      router.replace('/');
      router.refresh();
    }
  };

  return (
    <>
      <ToastContainer />
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 rounded-md p-10 text-lg bg-t-main/20 w-[40vw] sm:w-full md:w-[70vw] lg:w-[60vw] shadow-xl shadow-t-shadow-1"
      >
        <h3 className="mb-5 text-4xl font-bold -tracking-tight text-t-hover-1">
          Sign Up
        </h3>

        <Form.Field className="" name="name">
          <Form.Label className="text-base font-medium text-t-hover-1">
            * Name
          </Form.Label>
          <Form.Control asChild>
            <input
              className={
                errors.name &&
                'border-t-error focus:border-t-error hover:border-t-error '
              }
              placeholder="Mark Serunov"
              {...register('name')}
            />
          </Form.Control>
          <span className="text-sm text-t-error">{errors.name?.message}</span>
        </Form.Field>

        <Form.Field className="" name="email">
          <Form.Label className="text-base font-medium text-t-hover-1">
            * Email
          </Form.Label>
          <Form.Control asChild>
            <input
              className={
                errors.email &&
                'border-t-error focus:border-t-error hover:border-t-error '
              }
              type="email"
              placeholder="example@email.com"
              {...register('email')}
            />
          </Form.Control>
          <span className="text-sm text-t-error">{errors.email?.message}</span>
        </Form.Field>

        <Form.Field className="" name="password">
          <Form.Label className="text-base font-medium text-t-hover-1">
            * Password
          </Form.Label>
          <Form.Control asChild>
            <input
              className={
                errors.password &&
                'border-t-error focus:border-t-error hover:border-t-error '
              }
              type="password"
              placeholder="*********"
              {...register('password')}
            />
          </Form.Control>
          <span className="text-sm text-t-error">
            {errors.password?.message}
          </span>
        </Form.Field>
        <Form.Field className="" name="confirm password">
          <Form.Label className="text-base font-medium text-t-hover-1">
            * Confirm password
          </Form.Label>
          <Form.Control asChild>
            <input
              className={
                errors.passwordConfirm &&
                'border-t-error hover:border-t-error focus:border-t-error'
              }
              type="password"
              placeholder="*********"
              {...register('passwordConfirm')}
            />
          </Form.Control>
          <span className="text-sm text-t-error">
            {errors.passwordConfirm ? 'password not equals' : ''}
          </span>
        </Form.Field>
        <Form.Submit asChild>
          <button
            className="mt-2 flex items-center justify-center rounded-md px-2 font-medium leading-none transition-all duration-300 bg-t-hover-2 w-[150px] text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1"
            disabled={loading}
          >
            {loading ? 'Loading..' : 'Create account'}
          </button>
        </Form.Submit>
        <div className="flex gap-2">
          <h3>Already have an account?</h3>
          <Link
            href="/auth/sign-in"
            className="text-t-hover-2 hover:text-t-hover-3"
          >
            Sign in
          </Link>
        </div>
      </Form.Root>
    </>
  );
};
