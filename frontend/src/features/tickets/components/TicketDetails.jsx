import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    createCommentAsync,
    deleteCommentsByIdAsync,
    getCommentsByTicketIdAsync,
    selectComments,
} from "../../comments/CommentSlice";
import { getTicketByIdAsync, selectTicket } from "../TicketSlice";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeIcon from "@mui/icons-material/Mode";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TabPanel from "@mui/lab/TabPanel";
import TicketCard from "./TicketCard";

export const TicketDetails = () => {
    const { id } = useParams();
    const comments = useSelector(selectComments);
    const dispatch = useDispatch();

    // const ticket = useSelector(selectTicket); // Correctly access the ticket property
    // useEffect(() => {
    //     dispatch(getTicketByIdAsync(id));
    // }, []);

    const user = useSelector(selectLoggedInUser);
    const [commentText, setCommentText] = useState("");
    useEffect(() => {
        dispatch(getCommentsByTicketIdAsync(id));
    }, []);

    const handleCreateComment = (e) => {
        e.preventDefault();
        setCommentText("");
        const data = { message: commentText, member: user._id, ticket: id };
        console.log(data);
        dispatch(createCommentAsync(data));
    };

    return (
        <Stack flexDirection={"row"} width={"100vw"}>
            <Stack flex={4}></Stack>

            {/* <TabPanel value="2">
                <Stack>
                    <TicketCard
                        id={ticket._id}
                        assignnedToMemberId={ticket.assignedTo._id}
                        members={[]}
                        title={ticket.title}
                        key={ticket._id}
                        assignnedToEmail={ticket.assignedTo.email}
                        assignnedToName={ticket.assignedTo.name}
                        description={ticket.description}
                        status={ticket.status}
                        priority={ticket.priority}
                    />
                </Stack>
            </TabPanel> */}

            <Stack flex={2} component={Paper} elevation={6} p={2}>
                <Typography variant="h5">Comments</Typography>
                <Stack mt={2} height={"40rem"} sx={{ overflowY: "scroll" }}>
                    {comments.map((comment, index) => (
                        <Stack
                            p={2}
                            spacing={2}
                            position={"relative"}
                            component={Paper}
                            mt={2}
                            elevation={1}
                        >
                            <Box position={"absolute"} right={0}>
                                <IconButton
                                    onClick={() => dispatch(deleteCommentsByIdAsync(comment._id))}
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Box>
                            <Typography>{comment.message}</Typography>
                            <Typography color={"text.secondary"}>
                                {new Date(comment.createdAt).toLocaleString()}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
                <Stack
                    flexDirection={"row"}
                    noValidate
                    component={"form"}
                    onSubmit={(e) => handleCreateComment(e)}
                >
                    <TextField
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        fullWidth
                        placeholder="Add comment"
                    />
                    <Button type="submit">
                        <SendIcon />
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};
