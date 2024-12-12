import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useDispatch } from "react-redux";
import { deleteTicketByIdAsync, updateTicketByIdAsync } from "../TicketSlice";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Modal from "@mui/material/Modal";

export default function TicketCard({
    title,
    description,
    assignnedToName,
    assignnedToEmail,
    assignnedToMemberId,
    status,
    priority,
    members,
    id,
    setTicketId,
}) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const [selectedEditValue, setSelectedEditValue] = useState({
        title: title,
        description: description,
        status: status,
        priority: priority,
        assignedTo: assignnedToMemberId,
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSaveChanges = () => {
        console.log(selectedEditValue);

        const update = { ...selectedEditValue, _id: id };
        console.log(update);
        dispatch(updateTicketByIdAsync(update));
        setIsEditing(false);
    };

    const handleTicketEdit = () => {
        setIsEditing(true);
    };

    const handleEditValueChange = (e) => {
        setSelectedEditValue({ ...selectedEditValue, [e.target.name]: e.target.value });
    };

    const handleTicketDelete = () => {
        setOpen(true);
    };

    const priorityOptions = ["Low", "Medium", "High"];
    const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];

    return (
        <Stack
            position={"relative"}
            mt={1}
            width={"40rem"}
            justifyContent={"center"}
            component={Paper}
            p={2}
            elevation={6}
            spacing={1}
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Deleting Ticket
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete this ticket?
                    </Typography>

                    <Stack flexDirection={"row"} mt={2} columnGap={2}>
                        <Button
                            onClick={() => dispatch(deleteTicketByIdAsync(id))}
                            variant="contained"
                        >
                            Yes
                        </Button>
                        <Button onClick={() => setOpen(false)} variant="text" sx={{ color: "red" }}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Modal>

            <Typography variant="h6">Title</Typography>
            {isEditing ? (
                <TextField
                    onChange={handleEditValueChange}
                    name="title"
                    value={selectedEditValue.title}
                />
            ) : (
                <Typography>{title}</Typography>
            )}

            <Typography variant="h6">Description</Typography>

            {isEditing ? (
                <TextField
                    name="description"
                    onChange={handleEditValueChange}
                    value={selectedEditValue.description}
                />
            ) : (
                <Typography>{description}</Typography>
            )}

            <Typography variant="h6">Assigned To</Typography>

            {isEditing ? (
                <Select
                    name="assignedTo"
                    onChange={handleEditValueChange}
                    defaultValue={selectedEditValue.assignedTo}
                >
                    {members.map((member) => (
                        <MenuItem key={member._id} value={member._id}>
                            {member.name}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <>
                    <Typography>{assignnedToName}</Typography>
                    <Typography>{assignnedToEmail}</Typography>
                </>
            )}

            <Typography variant="h6">Status</Typography>

            {isEditing ? (
                <Select
                    name="status"
                    onChange={handleEditValueChange}
                    defaultValue={selectedEditValue.status}
                >
                    {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <Typography>{status}</Typography>
            )}

            <Typography variant="h6">Priority</Typography>

            {isEditing ? (
                <Select
                    name="priority"
                    onChange={handleEditValueChange}
                    defaultValue={selectedEditValue.priority}
                >
                    {priorityOptions.map((priority) => (
                        <MenuItem key={priority} value={priority}>
                            {priority}
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <Typography>{priority}</Typography>
            )}

            <Box sx={{ position: "absolute", right: 0, top: 0 }}>
                <IconButton onClick={handleTicketDelete}>
                    <DeleteOutlinedIcon />
                </IconButton>
                <IconButton
                    onClick={() => {
                        setTicketId(id);
                        console.log(id);
                    }}
                >
                    <ChatBubbleOutlineIcon />
                </IconButton>
                {!isEditing && (
                    <IconButton onClick={handleTicketEdit}>
                        <CreateOutlinedIcon />
                    </IconButton>
                )}
            </Box>
            <Stack></Stack>
            {isEditing === true ? (
                <Stack flexDirection={"row"} alignSelf={"flex-end"} columnGap={2}>
                    <Button variant="contained" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                    <Button color="error" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </Stack>
            ) : null}
        </Stack>
    );
}
