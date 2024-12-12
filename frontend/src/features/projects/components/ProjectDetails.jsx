import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    addMemberByProjectIdAsync,
    deleteMemberByProjectIdAsync,
    getProjectDetailsByIdAsync,
    selectSelectedProject,
} from "../ProjectSlice";
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
    createTicketAsync,
    getTicketByProjectIdAsync,
    selectTickets,
} from "../../tickets/TicketSlice";
import {
    createCommentAsync,
    deleteCommentsByIdAsync,
    getCommentsByTicketIdAsync,
    selectComments,
} from "../../comments/CommentSlice";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useForm } from "react-hook-form";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import TicketCard from "../../tickets/components/TicketCard";
import { selectMembers } from "../../members/MemberSlice";
import { use } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export const ProjectDetails = () => {
    const [ticketId, setTicketId] = useState("");
    const comments = useSelector(selectComments);

    const [commentText, setCommentText] = useState("");
    useEffect(() => {
        dispatch(getCommentsByTicketIdAsync(ticketId));
    }, [ticketId]);

    const handleCreateComment = (e) => {
        e.preventDefault();
        setCommentText("");
        const data = { message: commentText, member: user._id, ticket: id };
        console.log(data);
        dispatch(createCommentAsync(data));
    };

    const [value, setValue] = React.useState("1");
    const [secondTab, setSecondTab] = React.useState("0");

    const [newSelectedMembers, setNewSelectedMember] = useState("");
    const [deleteMember, setDeleteMember] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSecondTabChange = (event, newValue) => {
        setSecondTab(newValue);
    };

    const user = useSelector(selectLoggedInUser);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const { id } = useParams();
    const dispatch = useDispatch();

    const members = useSelector(selectMembers);

    const selectedProject = useSelector(selectSelectedProject);
    let getTickets = useSelector(selectTickets);
    const [tickets, setTickets] = useState([]);
    const defaultTickets = useSelector(selectTickets);

    const [priority, setPriority] = useState("None");
    const [status, setStatus] = useState("None");

    useEffect(() => {
        setTickets(getTickets);
    }, [getTickets]);

    const [searchTitle, setSearchTitle] = useState("");
    useEffect(() => {
        let newArray = [...defaultTickets];
        if (searchTitle != "") {
            newArray = tickets?.filter((ticket) => {
                if (ticket.title.toLowerCase().includes(searchTitle.toLowerCase())) {
                    return ticket;
                }
            });
        }
        if (priority !== "None") {
            newArray = newArray.filter((ticket) => ticket.priority === priority);
        }
        if (status !== "None") {
            newArray = newArray.filter((ticket) => ticket.status === status);
        }
        setTickets(newArray);
        // else setTickets(defaultTickets);
    }, [searchTitle, status, priority]);

    useEffect(() => {
        dispatch(getProjectDetailsByIdAsync(id));
        dispatch(getTicketByProjectIdAsync(id));
    }, [dispatch]);

    const handleDeleteMember = () => {
        dispatch(
            deleteMemberByProjectIdAsync({ projectId: selectedProject._id, memberId: deleteMember })
        );
        setDeleteMember("");
    };

    const handleAddMember = () => {
        dispatch(
            addMemberByProjectIdAsync({
                projectId: selectedProject._id,
                memberId: newSelectedMembers,
            })
        );
        setNewSelectedMember("");
    };

    const navigate = useNavigate();

    return (
        <>
            {selectedProject && (
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ width: "100vw" }}
                    flexDirection={"row"}
                >
                    <Stack mt={3} width={"90rem"} spacing={2}>
                        <TabContext value={value}>
                            {/* tab list */}
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Project Overview" value="1" />
                                    <Tab label="Ticket Management" value="2" />
                                    <Tab label="Create ticket" value="3" />
                                </TabList>
                            </Box>

                            {/* tab panel */}

                            {/* project overview */}
                            <TabPanel sx={{ width: "100%" }} value="1">
                                <Stack
                                    justifyContent={"space-around"}
                                    columnGap={3}
                                    mt={3}
                                    alignItems={"flex-start"}
                                    flexDirection={"row"}
                                >
                                    {/* Project Overview */}
                                    <Stack flex={4} spacing={5} width={"60rem"}>
                                        <Stack spacing={2} p={2} component={Paper} elevation={2}>
                                            <Typography variant="h4">
                                                {selectedProject.name}
                                            </Typography>
                                            <Typography lineHeight={"1.8rem"} variant="body2">
                                                {selectedProject.description}
                                            </Typography>
                                            <Button
                                                onClick={() => setValue("2")}
                                                variant="contained"
                                            >
                                                Manage Tickets
                                            </Button>
                                        </Stack>
                                    </Stack>

                                    {/* MEMBERS LIST */}
                                    <Stack flex={2} spacing={2}>
                                        <Typography variant="h4" fontWeight={300}>
                                            Members
                                        </Typography>

                                        {selectedProject.members.length === 0 ? (
                                            <Typography variant="bpdy2" fontWeight={400}>
                                                Please add at least one member to assign tickets
                                            </Typography>
                                        ) : (
                                            <Grid
                                                justifyContent={"left"}
                                                alignContent={"center"}
                                                rowGap={4}
                                                width={"100%"}
                                                container
                                            >
                                                {selectedProject.members.map((member) => (
                                                    <Stack
                                                        width={"20rem"}
                                                        item
                                                        component={Paper}
                                                        p={2}
                                                        elevation={2}
                                                    >
                                                        <Typography>{member.name}</Typography>
                                                        <Typography>{member.email}</Typography>
                                                    </Stack>
                                                ))}
                                            </Grid>
                                        )}
                                    </Stack>

                                    <Stack flex={3}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4" fontWeight={100}>
                                                Manage Members
                                            </Typography>
                                            <Box sx={{ width: "100%", typography: "body1" }}>
                                                <TabContext value={secondTab}>
                                                    <Box
                                                        sx={{
                                                            borderBottom: 1,
                                                            borderColor: "divider",
                                                        }}
                                                    >
                                                        <TabList
                                                            onChange={handleSecondTabChange}
                                                            aria-label="lab API tabs example"
                                                        >
                                                            <Tab label="Add Member" value="0" />
                                                            <Tab label="Update" value="1" />
                                                        </TabList>
                                                    </Box>
                                                    <TabPanel value="0">
                                                        {/* add member */}
                                                        <Stack spacing={2}>
                                                            <Typography
                                                                variant="h6"
                                                                fontWeight={300}
                                                            >
                                                                Add Member
                                                            </Typography>
                                                            <Select
                                                                fullWidth
                                                                value={newSelectedMembers}
                                                                onChange={(e) =>
                                                                    setNewSelectedMember(
                                                                        e.target.value
                                                                    )
                                                                }
                                                            >
                                                                {members.map(
                                                                    (member) =>
                                                                        // Check if member._id is present inside selectProjectmembers
                                                                        // If it's present, don't render the MenuItem
                                                                        !selectedProject.members.some(
                                                                            (selectedMember) =>
                                                                                selectedMember._id ===
                                                                                member._id
                                                                        ) && (
                                                                            <MenuItem
                                                                                key={member._id}
                                                                                value={member._id}
                                                                            >
                                                                                {member.name}
                                                                            </MenuItem>
                                                                        )
                                                                )}
                                                            </Select>
                                                            {newSelectedMembers !== "" && (
                                                                <Stack width={"5rem"}>
                                                                    <Button
                                                                        onClick={handleAddMember}
                                                                        variant="contained"
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </Stack>
                                                            )}
                                                            {/* delete member */}
                                                            <Typography
                                                                variant="h6"
                                                                fontWeight={300}
                                                            >
                                                                Delete Member
                                                            </Typography>
                                                            <Select
                                                                fullWidth
                                                                value={deleteMember}
                                                                onChange={(e) =>
                                                                    setDeleteMember(e.target.value)
                                                                }
                                                            >
                                                                {selectedProject.members.map(
                                                                    (member) => (
                                                                        <MenuItem
                                                                            value={member._id}
                                                                        >
                                                                            {member.name}
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </Select>
                                                            {deleteMember !== "" && (
                                                                <Stack width={"5rem"}>
                                                                    <Button
                                                                        onClick={handleDeleteMember}
                                                                        color="error"
                                                                        variant="contained"
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Stack>
                                                            )}
                                                        </Stack>
                                                    </TabPanel>
                                                    <TabPanel value="1">
                                                        <Stack>
                                                            {selectedProject.members.length ===
                                                            0 ? (
                                                                <Typography
                                                                    variant="bpdy2"
                                                                    fontWeight={400}
                                                                >
                                                                    No Members
                                                                </Typography>
                                                            ) : (
                                                                <Grid
                                                                    justifyContent={"left"}
                                                                    alignContent={"center"}
                                                                    rowGap={4}
                                                                    width={"100%"}
                                                                    container
                                                                >
                                                                    {selectedProject.members.map(
                                                                        (member) => (
                                                                            <Stack
                                                                                width={"20rem"}
                                                                                item
                                                                                component={Paper}
                                                                                p={2}
                                                                                elevation={2}
                                                                            >
                                                                                <Typography>
                                                                                    {member.name}
                                                                                </Typography>
                                                                                <Typography>
                                                                                    {member.email}
                                                                                </Typography>
                                                                            </Stack>
                                                                        )
                                                                    )}
                                                                </Grid>
                                                            )}
                                                        </Stack>
                                                    </TabPanel>
                                                </TabContext>
                                            </Box>
                                            {/* ADD member */}

                                            {/* DELETE member */}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </TabPanel>

                            {/* ticket management */}

                            <TabPanel value="2">
                                <Stack>
                                    {defaultTickets?.length === 0 ? (
                                        <Stack
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            spacing={1}
                                        >
                                            <Typography variant="body1">
                                                No tickets have been assigned to this project
                                                currently
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                onClick={() => setValue("3")}
                                            >
                                                Create Ticket
                                            </Button>
                                        </Stack>
                                    ) : (
                                        <>
                                            <Stack
                                                flexDirection={"row"}
                                                width={"90vw"}
                                                gap={"10px"}
                                            >
                                                <Stack sx={{ gap: "5px" }}>
                                                    <TextField
                                                        variant="outlined"
                                                        sx={{ width: "40rem" }}
                                                        placeholder="e.g. Fix something"
                                                        onChange={(e) =>
                                                            setSearchTitle(e.target.value)
                                                        }
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <SearchIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Typography variant="h6">
                                                            Priority
                                                        </Typography>
                                                        <Select
                                                            value={priority}
                                                            onChange={(e) =>
                                                                setPriority(e.target.value)
                                                            }
                                                        >
                                                            <MenuItem value="None">None</MenuItem>
                                                            <MenuItem value="Low">Low</MenuItem>
                                                            <MenuItem value="Medium">
                                                                Medium
                                                            </MenuItem>
                                                            <MenuItem value="High">High</MenuItem>
                                                        </Select>

                                                        <Typography variant="h6">Status</Typography>
                                                        <Select
                                                            value={status}
                                                            onChange={(e) =>
                                                                setStatus(e.target.value)
                                                            }
                                                        >
                                                            <MenuItem value="None">None</MenuItem>
                                                            <MenuItem value="Open">Open</MenuItem>
                                                            <MenuItem value="In Progress">
                                                                In Progress
                                                            </MenuItem>
                                                            <MenuItem value="Resolved">
                                                                Resolved
                                                            </MenuItem>
                                                            <MenuItem value="Closed">
                                                                Closed
                                                            </MenuItem>
                                                        </Select>
                                                    </Box>
                                                    {tickets.map((ticket) => (
                                                        <TicketCard
                                                            setTicketId={setTicketId}
                                                            id={ticket._id}
                                                            assignnedToMemberId={
                                                                ticket.assignedTo._id
                                                            }
                                                            members={selectedProject.members}
                                                            title={ticket.title}
                                                            key={ticket._id}
                                                            assignnedToEmail={
                                                                ticket.assignedTo.email
                                                            }
                                                            assignnedToName={ticket.assignedTo.name}
                                                            description={ticket.description}
                                                            status={ticket.status}
                                                            priority={ticket.priority}
                                                        />
                                                    ))}
                                                </Stack>
                                                {ticketId != "" ? (
                                                    <>
                                                        <Stack
                                                            flex={2}
                                                            component={Paper}
                                                            elevation={6}
                                                            p={2}
                                                            sx={{
                                                                maxHeight: "50vh", // Set maximum height for the comments section
                                                                overflowY: "auto", // Enable scrolling on overflow
                                                            }}
                                                        >
                                                            <Typography variant="h5">
                                                                Comments
                                                            </Typography>
                                                            <Stack
                                                                mt={2}
                                                                height={"40rem"}
                                                                sx={{ overflowY: "scroll" }}
                                                            >
                                                                {comments?.map((comment, index) => (
                                                                    <Stack
                                                                        p={2}
                                                                        spacing={2}
                                                                        position={"relative"}
                                                                        component={Paper}
                                                                        mt={2}
                                                                        elevation={1}
                                                                        key={index}
                                                                    >
                                                                        <Box
                                                                            position={"absolute"}
                                                                            right={0}
                                                                        >
                                                                            <IconButton
                                                                                onClick={() =>
                                                                                    dispatch(
                                                                                        deleteCommentsByIdAsync(
                                                                                            comment._id
                                                                                        )
                                                                                    )
                                                                                }
                                                                            >
                                                                                <DeleteOutlineIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                        <Typography>
                                                                            {comment.message}
                                                                        </Typography>
                                                                        <Typography
                                                                            color={"text.secondary"}
                                                                        >
                                                                            {new Date(
                                                                                comment.createdAt
                                                                            ).toLocaleString()}
                                                                        </Typography>
                                                                    </Stack>
                                                                ))}
                                                            </Stack>
                                                            <Stack
                                                                flexDirection={"row"}
                                                                noValidate
                                                                component={"form"}
                                                                onSubmit={(e) =>
                                                                    handleCreateComment(e)
                                                                }
                                                            >
                                                                <TextField
                                                                    value={commentText}
                                                                    onChange={(e) =>
                                                                        setCommentText(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    fullWidth
                                                                    placeholder="Add comment"
                                                                />
                                                                <Button type="submit">
                                                                    <SendIcon />
                                                                </Button>
                                                            </Stack>
                                                        </Stack>
                                                    </>
                                                ) : null}
                                            </Stack>
                                        </>
                                    )}
                                </Stack>
                            </TabPanel>

                            {/* member mangement */}
                            <TabPanel value="3" sx={{ width: "100%" }}>
                                <Stack spacing={5}>
                                    <Typography variant="h4" fontWeight={300}>
                                        Creating ticket for project - {selectedProject.name}📒
                                    </Typography>

                                    <Stack
                                        width={"40rem"}
                                        spacing={2}
                                        component={"form"}
                                        type="post"
                                        noValidate
                                        onSubmit={handleSubmit((data) => {
                                            const finalData = {
                                                ...data,
                                                project: id,
                                                createdBy: user._id,
                                            };
                                            dispatch(createTicketAsync(finalData));
                                            reset();
                                            setValue("2");
                                        })}
                                    >
                                        <TextField
                                            placeholder="Title"
                                            {...register("title", {
                                                required: "Title is required",
                                            })}
                                        />
                                        <Typography sx={{ color: "red" }}>
                                            {errors.title?.message}
                                        </Typography>

                                        <TextField
                                            multiline
                                            rows={4}
                                            placeholder="Description"
                                            {...register("description", {
                                                required: "Description is required",
                                            })}
                                        />
                                        <Typography sx={{ color: "red" }}>
                                            {errors.description?.message}
                                        </Typography>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Priority
                                            </InputLabel>
                                            <Select
                                                {...register("priority", {
                                                    required: "priority level is required",
                                                })}
                                                defaultValue={"Medium"}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={"Priority"}
                                            >
                                                <MenuItem value={"Low"}>Low</MenuItem>
                                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                                <MenuItem value={"High"}>High</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Assigned To
                                            </InputLabel>
                                            <Select
                                                {...register("assignedTo", {
                                                    required: "Assignee is required",
                                                })}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label={"Assigned To"}
                                            >
                                                {selectedProject.members.map((member) => (
                                                    <MenuItem key={member._id} value={member._id}>
                                                        {member.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <Typography sx={{ color: "red" }}>
                                                {errors.assignedTo?.message}
                                            </Typography>
                                        </FormControl>

                                        <Button variant="contained" type="submit">
                                            Create
                                        </Button>
                                    </Stack>
                                </Stack>
                            </TabPanel>
                        </TabContext>
                    </Stack>
                </Stack>
            )}
        </>
    );
};
