import { useRegisterMutation } from "@/customHooks/query/auth.query.hooks";
import { registerProps } from "@/typeScript/auth.interface";
import { useState } from "react";
import Link from "next/link";
import {
  TextField,
  Button,
  Box,
  Typography,

  Grid,
  CircularProgress,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerProps>();

  const { mutate, isPending } = useRegisterMutation();
  const [showPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (formData: FieldValues) => {
    const { name, email, password } = formData as registerProps;

    const requestData = { name, email, password };

    mutate(requestData, {
      onSuccess: (res) => {
        if (res) {
          router.push("/auth/otp");
        }
      },
      onError: () => {
        toast.error("Registration failed. Please check your credentials.");
      },
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141E30, #243B55)",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            p: 6,
            backdropFilter: "blur(10px)",
            color: "#fff",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Sign Up
          </Typography>

          <TextField
            {...register("name", { required: "Name is required" })}
            label="Full Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
              },
              input: { color: "#fff" },
            }}
          />

          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#00bcd4" },
                  "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
                },
                input: { color: "#fff" },
              }}
            />
          </Box>

          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#fff" },
                  "&:hover fieldset": { borderColor: "#00bcd4" },
                  "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
                },
                input: { color: "#fff" },
              }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              p: 1.5,
              fontWeight: "bold",
              background: "#00bcd4",
              "&:hover": { background: "#008ba3" },
            }}
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Typography align="center" sx={{ marginTop: 3 }}>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              passHref
              style={{ color: "#00bcd4", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default Registration;
