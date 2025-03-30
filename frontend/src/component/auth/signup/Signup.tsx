"use client";
import useApiHook from "@/hooks/useApiHook";
import MUITextField from "@/shared/MUITextField";
import { Button, Container, Typography, Card, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface SubmitProps {
  email: string;
  name: string;
}

const Signup = () => {
  const { api } = useApiHook();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SubmitProps) => {
    setLoader(true);
    const response = await api({
      endPoint: "auth/signup",
      method: "POST",
      data,
      showToastMessage: true,
    });
    setLoader(false);
    if (response?.success) {
      router.push("/otp-verify");
      localStorage.setItem("opt-email", data?.email);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>({
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
          Create an Account 🎉
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Join us today! Enter your details to sign up.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Name is required",
            }}
            render={({ field }) => (
              <MUITextField
                {...field}
                type="text"
                formLabel="Full Name"
                errorMessage={errors.name?.message as string}
                fullWidth
                margin="normal"
              />
            )}
          />
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
                formLabel="Email Address"
                errorMessage={errors.email?.message as string}
                fullWidth
                margin="normal"
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
            Sign Up
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Typography
              component="span"
              color="primary"
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <Link href="signin">Sign in</Link>
            </Typography>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Signup;
