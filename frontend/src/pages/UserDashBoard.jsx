import React, { useEffect } from "react";
import { Navbar } from "../features/Navigation/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getTicketByMemberIdAsync, selectTickets } from "../features/tickets/TicketSlice";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export const UserDashBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectLoggedInUser);
    const tickets = useSelector(selectTickets);

    useEffect(() => {
        dispatch(getTicketByMemberIdAsync(user._id));
    }, []);

    return (
        <>
            <Navbar />
            {tickets && (
                <Grid
                    component={Paper}
                    elevation={6}
                    p={2}
                    rowGap={1}
                    columnGap={1}
                    container
                    justifyContent={"center"}
                    alignContent={"center"}
                >
                    {tickets.map((ticket) => (
                        <Stack
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`ticket-details/${ticket._id}`)}
                            item
                            key={ticket._id}
                            mt={2}
                            width={"40rem"}
                            component={Paper}
                            elevation={4}
                            p={2}
                            spacing={2}
                        >
                            <Stack>
                                <Typography variant="h6">Title</Typography>
                                <Typography>{ticket.title}</Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6">Description</Typography>
                                <Typography>{ticket.description}</Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6">Priority</Typography>
                                <Typography>{ticket.priority}</Typography>
                            </Stack>
                            <Stack>
                                <Typography variant="h6">Status</Typography>
                                <Typography>{ticket.status}</Typography>
                            </Stack>
                        </Stack>
                    ))}
                </Grid>
            )}
        </>
    );
};
