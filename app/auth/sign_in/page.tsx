'use client';
import * as Form from '@radix-ui/react-form';
import {useForm} from "react-hook-form";
import {loginSchema, LoginType} from "@/validations/authSchema";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {toast, ToastContainer} from "react-toastify";
import {useRouter} from "next/navigation";

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginType>({
    resolver: yupResolver(loginSchema)
  });
  const onSubmit = async (payload: LoginType) => {
    setLoading(true);
    const {data, error} = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message, {theme: 'colored'});
    } else if (data.user) {
      router.refresh();
      router.push('/');
    }
  };

  return (
    <section className="flex justify-center pt-[30px]">
      <Form.Root
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col rounded-[5px] bg-t-main/20 p-[40px] text-[18px] w-[40vw] gap-[15px] sm:w-full md:w-[70vw] lg:w-[60vw]">
        <ToastContainer/>
        <h3
          className="font-bold text-[33px] text-t-hover-1 mb-[20px] tracking-[0.7px]">Sign
          In</h3>


        <Form.Field className="" name="email">
          <Form.Label className="font-medium text-[15px] leading-[35px] text-t-hover-1">
            Your Email
          </Form.Label>
          <Form.Control asChild>
            <input
              className="inline-flex w-full appearance-none items-center justify-center leading-none outline-none bg-t-main-2 shadow-t-main h-[35px] rounded-[4px] px-[10px] text-[15px] text-t-hover-1 shadow-[0_0_0_1.5px] placeholder:text-t-main/40 hover:shadow-t-hover-1 focus:shadow-t-hover-2"
              type="email"
              placeholder="serunov@email.com"
              {...register('email')}
            />
          </Form.Control>
          <span className="text-[13px] text-t-error tracking-[0.5px]">
            {errors.email?.message}
          </span>
        </Form.Field>


        <Form.Field className="" name="email">
          <Form.Label
            className="font-medium text-[15px] leading-[35px] text-t-hover-1">
            Password
          </Form.Label>
          <Form.Control asChild>
            <input
              className="inline-flex w-full appearance-none items-center justify-center leading-none outline-none bg-t-main-2 shadow-t-main h-[35px] rounded-[4px] px-[10px] text-[15px] text-t-hover-1 shadow-[0_0_0_1.5px] placeholder:text-t-main/40 hover:shadow-t-hover-1 focus:shadow-t-hover-2"
              type="password"
              placeholder="******"
              {...register('password')}
            />
          </Form.Control>
          <span className="text-[13px] text-t-error tracking-[0.5px]">
            {errors.password?.message}
          </span>
        </Form.Field>

        <Form.Submit asChild>
          <button
            className={"disabled:bg-grad-6 disabled:text-t-hover-1 flex items-center justify-center font-medium bg-grad-1 leading-none  w-[150px] text-t-main-2 h-[35px] rounded-[4px] px-[10px] mt-[10px] hover:bg-grad-2"}
            disabled={loading}
          >
            {loading ? 'Please await . . .' : 'Sign in'}
          </button>
        </Form.Submit>
      </Form.Root>
    </section>
  );
}