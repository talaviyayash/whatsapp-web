"use client";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { Button, Container, Typography, Card, Box } from "@mui/material";
import useApiHook from "@/hooks/useApiHook";
import { useRouter } from "next/navigation";

const OTPVerify: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const { api } = useApiHook();
  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    const optEmail = localStorage.getItem("opt-email");
    if (!optEmail) {
      router.push("/signin");
    }
  }, []);

  const handleSubmit = async () => {
    const optEmail = localStorage.getItem("opt-email");
    const response = await api({
      endPoint: "auth/verify-otp",
      method: "POST",
      data: { email: optEmail, otp },
      showToastMessage: true,
      needLoader: true,
      loaderName: "signin",
    });
    if (response?.success) {
      router.push("/chat");
    }
  };

  const handleResend = async () => {
    setOtp("");
    setTimeLeft(30);
    setCanResend(false);
    const optEmail = localStorage.getItem("opt-email");
    await api({
      endPoint: "auth/resend-otp",
      method: "POST",
      data: { email: optEmail },
      showToastMessage: true,
      needLoader: true,
      loaderName: "signin",
    });

    // Call API to resend OTP
  };

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
          Verify OTP 🔐
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          mb={3}
        >
          Enter the 6-digit OTP sent to your email
        </Typography>
        <Box display="flex" justifyContent="center" mb={3}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span style={{ width: 8 }}></span>}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            )}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: 2,
            boxShadow: 2,
            "&:hover": {
              boxShadow: 4,
            },
          }}
          onClick={handleSubmit}
          disabled={otp.length < 6}
        >
          Verify OTP
        </Button>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Resend OTP in {timeLeft}s
          </Typography>
          {canResend && (
            <Typography
              component="span"
              color="primary"
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleResend}
            >
              Resend OTP
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default OTPVerify;
