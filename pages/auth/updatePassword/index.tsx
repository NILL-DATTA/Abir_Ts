import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { useUpdatePasswordMutation } from "@/customHooks/query/auth.query.hooks";
import { updateProps, upDateResponse } from "@/typeScript/auth.interface";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ✅ Error type for API errors
interface APIError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// ✅ Only the form input field
type PasswordForm = {
  password: string;
};

// ✅ Schema for form validation
const schema: yup.ObjectSchema<PasswordForm> = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const UpdatePassword: React.FC = () => {
  const cookie = new Cookies();
  const userId = cookie.get("user_id");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useUpdatePasswordMutation();

  const onSubmit: SubmitHandler<PasswordForm> = (formData) => {
    if (!userId) {
      toast.error("UserId not found in cookies.");
      return;
    }

    const baseResponse: upDateResponse = {
      user_id: userId,
      password: formData.password,
      message: "",
      status: 1,
    };

    const requestData: updateProps = {
      ...baseResponse,
      data: baseResponse,
    };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("Password updated successfully!");
      },
      onError: (error: APIError) => {
        const message =
          error?.response?.data?.message || "Failed to update password.";
        toast.error(message);
        console.error("Error:", error);
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
            maxWidth: 400,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            padding: 4,
            backdropFilter: "blur(10px)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Update Password
          </Typography>

          <TextField
            {...register("password")}
            label="Enter Password"
            fullWidth
            margin="normal"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: "#fff" }, shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
              },
              input: { color: "#fff" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              p: 1.5,
              fontWeight: "bold",
              background: "#00bcd4",
              "&:hover": { background: "#008ba3" },
            }}
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default UpdatePassword;
