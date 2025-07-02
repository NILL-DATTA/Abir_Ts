import { MutationFunction } from "@tanstack/react-query";
import { endPoints } from "../endPoints/endPoints";
import { loginProps, otpProps, registerProps, updateProps } from "@/typeScript/auth.interface";
import axiosInstance from "../axios/axios";


export const loginFn: MutationFunction<loginProps, unknown> = async (payload) => {

    try {
        const { data } = await axiosInstance.post(endPoints.auth.login, payload);
        console.log("login API Response:", data);
        return data;
    } catch (error) {
        console.log("Contact Form Error", error)
    }

};


export const registerFn: MutationFunction<registerProps, unknown> = async (
    payload
) => {

    try {
        const { data } = await axiosInstance.post(endPoints.auth.register, payload);
        console.log("Register API Response:", data);
        return data;
    } catch (error) {
        console.log("Contact Form Error", error)
    }

};

export const otpFn: MutationFunction<otpProps, unknown> = async (payload) => {

    try {
        const { data } = await axiosInstance.post(endPoints.auth.verifyOtp, payload);
        console.log("otp API Response:", data);
        return data;
    } catch (error) {
        console.log("Contact Form Error", error)
    }

};


export const UpdatePasswordFn: MutationFunction<updateProps, unknown> = async (payload) => {

    try {
        const { data } = await axiosInstance.post(endPoints.auth.forgotPassword, payload);
        console.log("UpdatePassword API Response:", data);
        return data;
    } catch (error) {
        console.log("Contact Form Error", error)
    }

};
