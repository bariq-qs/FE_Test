import AuthLayout from "@/app/layouts/Auth";
import { Box, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import { ReactElement, useState } from "react";
import LogoJM from "@/app/assets/images/logo-jm.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin, type TSchemaLogin } from "@/app/utils/schema/login";
import FormLabel from "@/app/components/form/Label";
import Cookies from "js-cookie";
import { useAuthLogin } from "@/app/services";
import { useSnackbar } from "react-simple-snackbar";
import { toastErrorOption } from "@/app/utils/constant/toastOption";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [openErrorToast] = useSnackbar(toastErrorOption);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSchemaLogin>({
    resolver: yupResolver(schemaLogin),
  });

  const { mutate: mutateLogin, isPending: isLoading } = useAuthLogin();

  const onSubmit = handleSubmit((values) => {
    try {
      mutateLogin(
        {
          username: values.username,
          password: values.password,
        },
        {
          onSuccess(res) {
            if (res.code === 200) {
              const token = res.token;
              Cookies.set("auth", token);
              void router.replace("/jm/dashboard");
            }
          },
          onError(error: any) {
            const message = error?.response?.data?.message ?? error.message;
            openErrorToast(message);
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  });

  return (
    <Box
      margin='auto'
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "60%",
        ".logo": {
          width: "300px",
          marginInline: "auto",
          marginBottom: "3rem",
        },
      }}
    >
      <Image src={LogoJM} className='logo' alt='Logo' />
      <form onSubmit={onSubmit}>
        <Stack sx={{}} mb={2}>
          <FormLabel label='Username' />
          <TextField
            {...register("username")}
            helperText={errors.username?.message}
            error={Boolean(errors?.username?.message)}
            fullWidth
            size='small'
            placeholder='Username'
            inputProps={{ maxLength: "50" }}
          ></TextField>
        </Stack>
        <Stack sx={{}} mb={2}>
          <FormLabel label='Password' />
          <TextField
            {...register("password")}
            helperText={errors.password?.message}
            error={Boolean(errors?.password?.message)}
            fullWidth
            size='small'
            placeholder='Password'
            type='password'
            inputProps={{ maxLength: "50" }}
          ></TextField>
        </Stack>
        <Stack direction='row' justifyContent='end'>
          <LoadingButton
            loading={isLoading}
            variant='contained'
            size='small'
            type='submit'
          >
            Login
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
