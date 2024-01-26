'use client';
import { FaAsterisk } from 'react-icons/fa';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { cn } from '@/utils/twMergeClsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  changeEmailSchema,
  changeEmailType,
} from '@/validations/changeEmailSchema';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { useRouter } from 'next/navigation';

type Props = {
  email: string;
};

export const UserEmail = ({ email: defaultEmail }: Props) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [curEmail, setCurEmail] = useState<string>(defaultEmail);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changeEmailType>({
    resolver: yupResolver(changeEmailSchema),
  });

  const onSubmit = (payload: changeEmailType) => {
    console.log(payload.email);
    setLoading(true);
    supabase.auth
      .updateUser(
        {
          email: payload.email,
        },
        { emailRedirectTo: 'http://localhost:3000/user/general' }
      )
      .then(({ data: res, error }) => {
        console.log(res.user);
        console.log(error);
        error && setLoading(false);
      });
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: res }) => {
      const email = res.user?.email;
      email ? setCurEmail(email) : router.refresh();
    });
  }, [router, supabase.auth]);

  return (
    <>
      <Form.Root onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <h4 className="mb-1 flex flex-wrap gap-1 text-xl text-t-hover-1">
          Change email: <span className="text-t-hover-5">{curEmail}</span>
        </h4>
        <Form.Field className="" name="current password">
          <Form.Label className="mt-3 mb-1 flex gap-1 text-lg text-t-main">
            <FaAsterisk size={7} title="Required" className="cursor-help" />
            New email
          </Form.Label>
          <Form.Control asChild>
            <input
              disabled={loading}
              className={cn({
                'border-t-error focus:border-t-error hover:border-t-error':
                  errors.email,
              })}
              type="email"
              placeholder="example@email.com"
              {...register('email')}
            />
          </Form.Control>
          <span className="text-sm -tracking-tight text-t-error">
            {errors.email?.message}
          </span>
        </Form.Field>
        <div className="flex items-center justify-center">
          <Form.Submit asChild>
            <button
              className="mt-2 flex items-center justify-center rounded-md px-2 font-medium leading-none transition-all duration-300 bg-t-hover-2 min-w-[200px] text-t-main-2 min-h-[40px] hover:bg-t-hover-3 disabled:bg-t-main disabled:text-t-hover-1"
              disabled={loading}
            >
              {loading
                ? 'Please check your email to confirm change'
                : 'Change email'}
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </>
  );
};
