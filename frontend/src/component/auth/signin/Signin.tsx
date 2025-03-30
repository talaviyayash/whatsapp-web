"use client";
import useApiHook from "@/hooks/useApiHook";
import MUITextField from "@/shared/MUITextField";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface submitProps {
  email: string;
}

const Signin = () => {
  const { api } = useApiHook();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  const onSubmit = async (data: submitProps) => {
    setLoader(true);
    const response = await api({
      endPoint: "auth/signin",
      method: "POST",
      data,
      showToastMessage: true,
    });
    if (response?.success) {
      router.push("/otp-verify");
      localStorage.setItem("opt-email", data?.email);
    }
    setLoader(false);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<submitProps>({
    mode: "onChange",
  });

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Card
        sx={{
          p: 4,
          width: "100%",
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight={600}
          color="text.primary"
          gutterBottom
        >
          Welcome Back 👋
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Enter your email to sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <MUITextField
                {...field}
                type="email"
                formLabel="Email"
                errorMessage={errors.email?.message as string}
                fullWidth
                margin="normal"
                placeholder="Email"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
            loading={loader}
          >
            Sign In
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <Link href="/signup">Sign up</Link>
            </Typography>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Signin;
