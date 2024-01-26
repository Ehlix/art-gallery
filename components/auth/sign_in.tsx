'use client';
import * as Form from '@radix-ui/react-form';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginType } from '@/validations/authSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (payload: LoginType) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) {
      setLoading(false);
      toast.error(error.message, { theme: 'colored' });
    } else if (data.user) {
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
          Sign In
        </h3>
        <Form.Field className="" name="email">
          <Form.Label className="text-base font-medium text-t-hover-1">
            Your Email
          </Form.Label>
          <Form.Control asChild>
            <input
              type="email"
              placeholder="email@example.com"
              {...register('email')}
            />
          </Form.Control>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.email?.message}
          </span>
        </Form.Field>

        <Form.Field className="" name="email">
          <Form.Label className="text-base font-medium text-t-hover-1">
            Password
          </Form.Label>
          <Form.Control asChild>
            <input
              type="password"
              placeholder="******"
              {...register('password')}
            />
          </Form.Control>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.password?.message}
          </span>
        </Form.Field>

        <Form.Submit asChild>
          <button
            className="mt-2 flex items-center justify-center rounded-md font-medium leading-none transition-all duration-300 bg-t-hover-2 w-[150px] text-t-main-2 h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1"
            disabled={loading}
          >
            {loading ? 'Please await . . .' : 'Sign in'}
          </button>
        </Form.Submit>
        <div className="flex gap-2">
          <h3>Don&apos;t have an account?</h3>
          <Link
            href="/auth/signup"
            className="text-t-hover-2 hover:text-t-hover-3"
          >
            Sign up
          </Link>
        </div>
      </Form.Root>
    </>
  );
};
