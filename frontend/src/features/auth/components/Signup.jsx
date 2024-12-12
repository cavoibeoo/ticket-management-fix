import { Button, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { selectLoggedInUser, signupUserAsync } from "../AuthSlice";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const [showPassword1, setShowPassword1] = useState(false);

    const togglePasswordVisibility1 = () => {
        setShowPassword1((prev) => !prev);
    };
    const dispatch = useDispatch();

    const loggedInUser = useSelector(selectLoggedInUser);

    return (
        <>
            {loggedInUser && <Navigate to={"/"} replace={true}></Navigate>}
            <Stack
                width={"100vw"}
                height={"calc(100vh - 4rem)"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Stack
                    width={"30rem"}
                    spacing={2}
                    component={"form"}
                    noValidate
                    onSubmit={handleSubmit((data) => {
                        const cred = { ...data };
                        delete cred.confirmPassword;
                        dispatch(signupUserAsync(cred));
                    })}
                >
                    <Typography alignSelf={"center"} variant="h4" fontWeight={"100"}>
                        Welcome to Ticketo🎫
                    </Typography>
                    <TextField
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                    />
                    <Typography sx={{ color: "red" }}>{errors.name?.message}</Typography>
                    <TextField
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    <Typography sx={{ color: "red" }}>{errors.email?.message}</Typography>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^.{6,}$/,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography sx={{ color: "red" }}>{errors.password?.message}</Typography>
                    <TextField
                        type={showPassword1 ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value, formvalues) =>
                                value === formvalues.password || "Passwords do not match",
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility1} edge="end">
                                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography sx={{ color: "red" }}>{errors.confirmPassword?.message}</Typography>

                    <Button sx={{ mt: 2, height: "3rem" }} type="submit" variant="contained">
                        Signup
                    </Button>
                    <Typography alignSelf={"flex-end"}>
                        Already has an account ? <Link to={"/login"}> Login </Link>
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
};
