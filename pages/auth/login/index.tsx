import { useLoginMutation } from "@/customHooks/query/auth.query.hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Link from "next/link";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// ✅ Define form data interface
interface LoginFormData {
  email: string;
  password: string;
}

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useLoginMutation();
  const [showPassword] = useState(false); // you can remove this if not toggling
  const router = useRouter();

  const onSubmit = async (formData: LoginFormData) => {
    mutate(formData, {
      onSuccess: () => {
        router.push("/cms/list");
      },
      onError: () => {
        toast.error("Login failed. Please check your credentials.");
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
        padding: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            padding: 6,
            backdropFilter: "blur(12px)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Sign In
          </Typography>

          <TextField
            {...register("email", { required: "Email is required" })}
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" } }}
            inputProps={{ style: { fontSize: "1.05rem" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bcd4",
                },
              },
              input: { color: "#fff" },
            }}
          />

          <TextField
            {...register("password", { required: "Password is required" })}
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            autoComplete="new-password"
            InputLabelProps={{ style: { color: "#fff" } }}
            inputProps={{ style: { fontSize: "1.05rem" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": {
                  borderColor: "#00bcd4",
                },
              },
              input: { color: "#fff" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              p: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              background: "#00bcd4",
              "&:hover": { background: "#008ba3" },
            }}
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>

          <Typography align="center" sx={{ marginTop: 3 }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/registration"
              style={{ color: "#00bcd4", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default Login;
