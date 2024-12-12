import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginMemberAsync, loginUserAsync, selectLoggedInUser } from "../AuthSlice";
import { useForm } from "react-hook-form";

export const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const loggedInUser = useSelector(selectLoggedInUser);

    return (
        <>
            {loggedInUser && <Navigate to={"/"} replace={true}></Navigate>}
            <Stack height={"calc(100vh - 4rem)"} justifyContent={"center"} alignItems={"center"}>
                <Stack
                    component={"form"}
                    noValidate
                    onSubmit={handleSubmit((data) => {
                        if (!isAdmin) {
                            dispatch(loginUserAsync(data));
                        } else {
                            dispatch(loginMemberAsync(data));
                        }
                    })}
                    width={"40rem"}
                    spacing={2}
                >
                    <Typography alignSelf={"center"} variant="h4" fontWeight={"100"}>
                        Welcome to Ticketo🎫
                    </Typography>
                    <TextField
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                    />
                    <Typography sx={{ color: "red" }}>{errors.email?.message}</Typography>
                    <TextField
                        placeholder="Password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    <Typography sx={{ color: "red" }}>{errors.password?.message}</Typography>
                    <Typography>
                        Do not have an account? <Link to="/signup">Signup</Link>
                    </Typography>
                    <Button sx={{ mt: 2, height: "3rem" }} variant="contained" type="submit">
                        Login {!isAdmin === true ? "as admin" : "as member"}
                    </Button>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        }
                        label="Login as a member"
                    />
                </Stack>
            </Stack>
        </>
    );
};
