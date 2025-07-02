import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
import { useRouter } from "next/router";

const OtpVerification: React.FC = () => {
    const cookies = new Cookies();
    const otpEmail = cookies.get("email");
    const router = useRouter();

    const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const { mutate, isPending } = useOtpMutation();

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const onSubmit = () => {
        if (!otpEmail) {
            toast.error("Email not found in cookies.");
            return;
        }

        const fullOtp = otp.join("");
        if (fullOtp.length < 4) {
            toast.error("Please enter the full 4-digit OTP.");
            return;
        }

        mutate(
            { email: otpEmail, otp: fullOtp },
            {
                onSuccess: () => {
                    router.push("/auth/login");
                },
                onError: () => {
                    // const message = error?.response?.data?.message || "Failed to verify OTP.";
                    toast.error("Failed to verify OTP");
                },
            }
        );
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 3,
                        padding: 4,
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
                        color: "#fff",
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        fontWeight="bold"
                        sx={{ mb: 1.5 }}
                    >
                        Verify OTP
                    </Typography>

                    {otpEmail && (
                        <Typography
                            variant="body2"
                            align="center"
                            sx={{ mb: 3 }}
                        >
                            Sent to: <strong>{otpEmail}</strong>
                        </Typography>
                    )}

                    <Box display="flex" justifyContent="space-between" gap={1.5} mb={4}>
                        {otp.map((digit, index) => (
                            <TextField
                                key={index}
                                value={digit}
                                inputRef={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e: any) => handleKeyDown(index, e)}
                                inputProps={{
                                    maxLength: 1,
                                    style: {
                                        textAlign: "center",
                                        fontSize: "22px",
                                        padding: "14px",
                                        color: "#fff",
                                    },
                                }}
                                sx={{
                                    width: 58,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "rgba(255,255,255,0.08)",
                                        borderRadius: 2,
                                        "& fieldset": { borderColor: "#fff" },
                                        "&:hover fieldset": { borderColor: "#00bcd4" },
                                        "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
                                    },
                                }}
                            />
                        ))}
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isPending}
                        sx={{
                            p: 1.5,
                            fontWeight: "bold",
                            fontSize: "16px",
                            background: "#00bcd4",
                            "&:hover": { background: "#008ba3" },
                        }}
                    >
                        {isPending ? (
                            <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                            "Verify OTP"
                        )}
                    </Button>
                </Box>
            </motion.div>
        </Grid>
    );
};

export default OtpVerification;
