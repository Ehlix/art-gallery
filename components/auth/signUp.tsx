'use client';
import * as Form from '@radix-ui/react-form';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema, RegisterType} from "@/validations/authSchema";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import * as React from "react";
import {useState} from "react";


export function SignUp() {

  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (payload: RegisterType) => {
    setLoading(true);
    const {data, error} = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          site: payload.email.replace(new RegExp(`(.*)@.*`), '$1'),
          name: payload.name,
        }
      }
    });
    setLoading(false);
    if (error) {
      toast.error(error.message, {theme: 'colored'});
    } else if (data.user) {
      await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password
      });
      router.refresh();
      router.push('/');
    }
  };

  return (
    <>
      <Form.Root onSubmit={handleSubmit(onSubmit)}
                 className="flex flex-col rounded-[5px] bg-t-main/20 p-[40px] text-[18px] w-[40vw] gap-[15px] sm:w-full md:w-[70vw] lg:w-[60vw]">
        <ToastContainer/>
        <h3
          className="font-bold text-[33px] text-t-hover-1 mb-[20px] tracking-[0.7px]">
          Sign Up
        </h3>

        <Form.Field className="" name="name">
          <Form.Label className="font-medium text-[15px] leading-[35px] text-t-hover-1">
            * Name
          </Form.Label>
          <Form.Control asChild>
            <input
              className={(errors.name && "border-t-error hover:border-t-error ")}
              placeholder="Mark Serunov"
              {...register("name")}/>
          </Form.Control>
          <span className="text-[13px] text-t-error tracking-[0.5px]">
            {errors.name?.message}
          </span>
        </Form.Field>

        <Form.Field className="" name="email">
          <Form.Label className="font-medium text-[15px] leading-[35px] text-t-hover-1">
            * Email
          </Form.Label>
          <Form.Control asChild>
            <input
              className={(errors.email && "border-t-error hover:border-t-error ")}
              type="email"
              placeholder="serunov@email.com"
              {...register("email")}/>
          </Form.Control>
          <span className="text-[13px] text-t-error tracking-[0.5px]">
            {errors.email?.message}
          </span>
        </Form.Field>

        <Form.Field className="" name="email">
          <Form.Label
            className="font-medium text-[15px] leading-[35px] text-t-hover-1">
            * Password
          </Form.Label>
          <Form.Control asChild>
            <input
              className={(errors.password && "border-t-error hover:border-t-error ")}
              type="password"
              placeholder="*********"
              {...register("password")}/>
          </Form.Control>
          <span className="text-[13px] text-t-error tracking-[0.5px]">
            {errors.password?.message}
          </span>
        </Form.Field>

        <Form.Field className="" name="email">
          <Form.Label
            className="font-medium text-[15px] leading-[35px] text-t-hover-1">
            * Confirm password
          </Form.Label>
          <Form.Control asChild>
            <input
              className={(errors.passwordConfirm && "border-t-error hover:border-t-error ")}
              type="password"
              placeholder="*********"
              {...register('passwordConfirm')}
            />
          </Form.Control>
          <span className="text-[13px] text-t-error tracking-[0.5px]">
            {errors.passwordConfirm
              ?
              'password not equals'
              :
              ''
            }
          </span>
        </Form.Field>

        <Form.Submit asChild>
          <button
            className={"disabled:bg-grad-6  leading-none disabled:text-t-hover-1 flex items-center justify-center font-medium bg-t-hover-2  w-[150px] text-t-main-2 h-[35px] rounded-[4px] px-[10px] mt-[10px] hover:bg-t-hover-3 transition-all duration-200"}
            disabled={loading}>
            {loading
              ?
              'Loading..'
              :
              'Create account'
            }
          </button>
        </Form.Submit>
      </Form.Root>
    </>
  );
}