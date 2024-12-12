import { Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateStrongPassword } from "../../../utility";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createMemberAsync, selectMembers } from "../../members/MemberSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { createProjectAsync } from "../ProjectSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const AddProject = () => {
    const [memberCred, setMemberCred] = useState({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const user = useSelector(selectLoggedInUser);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const name = watch("name");
    const choosedMembers = watch("members");

    const members = useSelector(selectMembers);

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleMemberCredChange = (e) => {
        setMemberCred({ ...memberCred, [e.target.name]: e.target.value });
    };
    return (
        <Stack
            width={"100vw"}
            height={"calc(100vh - 5rem)"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            flexDirection={"column"}
        >
            <Stack>
                <Typography variant="h3" fontWeight={300}>
                    Creating Project - {name}
                </Typography>
                {choosedMembers?.length > 0 ? (
                    <Typography variant="h6" fontWeight={300}>
                        Members - {choosedMembers.length}
                    </Typography>
                ) : (
                    ""
                )}
            </Stack>

            <Stack flexDirection={"row"}>
                {/* CREATE PROJECT FORM */}
                <Stack
                    p={2}
                    spacing={2}
                    width={"40rem"}
                    component={"form"}
                    noValidate
                    onSubmit={handleSubmit(async (data) => {
                        const projectData = { ...data, admin: user._id };
                        if (projectData.members) {
                            console.log(data);
                            const result = await dispatch(createProjectAsync(projectData)).unwrap();
                            console.log(result);
                            if (!result.error) {
                                navigate("/admin");
                            }
                        } else {
                            console.log("members not selected");
                        }
                    })}
                >
                    <TextField
                        placeholder="Name"
                        {...register("name", { required: "Project name is required" })}
                    ></TextField>
                    <Typography sx={{ color: "red" }}>{errors.name?.message}</Typography>

                    <TextField
                        multiline
                        rows={10}
                        {...register("description", {
                            required: "Project description is required",
                        })}
                        placeholder="Description"
                    ></TextField>
                    <Typography sx={{ color: "red" }}>{errors.description?.message}</Typography>

                    {members.length !== 0 ? (
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
                            <Select
                                {...register("members", { required: "Members are required" })}
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {members.map((member) => (
                                    <MenuItem
                                        key={member._id}
                                        value={member._id}
                                        style={getStyles(member, personName, theme)}
                                    >
                                        {member.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Typography sx={{ color: "red" }}>{errors.members?.message}</Typography>
                        </FormControl>
                    ) : (
                        <Stack>
                            <Typography
                                variant="h6"
                                sx={{ color: "text.primary" }}
                                fontWeight={400}
                            >
                                There are no members currently
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: "text.primary" }}
                                fontWeight={300}
                            >
                                Please make atleast one member to create this project
                            </Typography>
                        </Stack>
                    )}

                    <Button variant="contained" type="submit">
                        Create Project
                    </Button>
                </Stack>

                {/* CREATE PROJECT MEMBERS */}
                <Stack width={"40rem"} elevation={6} p={2} spacing={4}>
                    <Typography variant="h4" fontWeight={100}>
                        Create Members
                    </Typography>
                    <Stack
                        spacing={2}
                        noValidate
                        component={"form"}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = { ...memberCred, admin: user._id };
                            dispatch(createMemberAsync(data));
                            setMemberCred({
                                name: "",
                                email: "",
                                password: "",
                            });
                        }}
                    >
                        <TextField
                            value={memberCred.name}
                            onChange={handleMemberCredChange}
                            name="name"
                            placeholder="Name"
                        ></TextField>
                        <TextField
                            value={memberCred.email}
                            onChange={handleMemberCredChange}
                            name="email"
                            placeholder="Email"
                        ></TextField>

                        <Stack
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <TextField
                                value={memberCred.password}
                                onChange={handleMemberCredChange}
                                name="password"
                                fullWidth
                                placeholder="Password"
                            ></TextField>
                            <IconButton
                                onClick={() =>
                                    setMemberCred({
                                        ...memberCred,
                                        password: generateStrongPassword(),
                                    })
                                }
                            >
                                <AutoFixHighIcon />
                            </IconButton>
                        </Stack>

                        <Button
                            disabled={!(memberCred.email && memberCred.name && memberCred.password)}
                            type="submit"
                            variant="contained"
                        >
                            Create Member
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
