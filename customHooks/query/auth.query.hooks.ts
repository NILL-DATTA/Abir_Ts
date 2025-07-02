import {
  loginFn,
  otpFn,
  registerFn,
  UpdatePasswordFn,
} from "@/api/functions/auth.api";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import useUserStore from "@/store/store";

let cookie = new Cookies();

export const useRegisterMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  return useMutation({
    mutationFn: registerFn,
    onSuccess: (res) => {
      console.log("Register Mutation Response:", res);
      if (res) {
        // setToken(res.token);
        cookie.set("email", res.user.email, { path: "/", secure: true });
        console.log("user:", res.user);
        toast.success(res.message);
      } else {
        toast.error("Registration failed! Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("Register Mutation Error:", error);
      toast.error("Registration failed. Please try again.");
    },
  });
};

export const useOtpMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  const { queryClient } = useGlobalHooks();

  return useMutation({
    mutationFn: otpFn,
    onSuccess: (res) => {
      console.log("Otp Mutation Response:", res);
      if (res) {
        toast.success(res.message);
      } else {
        toast.error("Otp Verification failed! Please try again.");
      }
      queryClient.invalidateQueries({ queryKey: ["OTP"] });
    },
    onError: (error: any) => {
      console.error("Otp Mutation Error:", error);
      toast.error("Otp Verification failed. Please try again.");
    },
  });
};

export const useLoginMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const { setTokenAndUser } = useUserStore();

  return useMutation({
    mutationFn: loginFn,

    onSuccess: (res) => {
      console.log("Login Mutation Response:", res);
      if (res && res.token) {
        setTokenAndUser(res.token);
        cookie.set("Token", res.token, { path: "/", secure: true });
        if (res.user?.id) {
          cookie.set("name", res.user.name, { path: "/", secure: true });
          cookie.set("user_id", res.user.id, { path: "/", secure: true });
        }
        toast.success(res.message);
      } else {
        toast.error("Login failed! Please try again.");
      }
      queryClient.invalidateQueries({ queryKey: ["LOGIN"] });
    },

    onError: (error: any) => {
      console.error("Login Mutation Error:", error);
      toast.error("Login failed. Please try again.");
    },
  });
};

export const useUpdatePasswordMutation = (): UseMutationResult<
  any,
  unknown,
  any,
  unknown
> => {
  return useMutation({
    mutationFn: UpdatePasswordFn,
    onSuccess: (res) => {
      console.log("UpdatePassword Mutation Response:", res);
      if (res) {
        toast.success(res.message);
      } else {
        toast.error("Failed! Please try again.");
      }
    },
    onError: (error: any) => {
      console.error("UpdatePassword Mutation Error:", error);
      toast.error("Failed. Please try again.");
    },
  });
};
