import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProjects } from "../ProjectSlice";
import { Button, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { use } from "react";

export const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    let fetchPrj = useSelector(selectProjects);
    useEffect(() => {
        setProjects(fetchPrj);
    }, []);
    // let projects = useSelector(selectProjects);
    const defaultProjects = useSelector(selectProjects);
    const user = useSelector(selectLoggedInUser);

    const [searchPrj, setSearchPrj] = useState("");
    useEffect(() => {
        if (searchPrj != "") {
            const filteredProjects = defaultProjects.filter((project) => {
                return project.name.toLowerCase().includes(searchPrj.toLowerCase());
            });
            setProjects(filteredProjects);
        } else setProjects(defaultProjects);
    }, [searchPrj]);

    const navigate = useNavigate();

    return (
        <>
            {projects && user && (
                <Stack justifyContent={"center"} alignItems={"center"}>
                    <Stack mt={5} width={"90rem"}>
                        <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Stack>
                                <Typography variant="h4">hi {user.name}👋</Typography>

                                <Typography variant="h6" fontWeight={300} color={"text.primary"}>
                                    {projects?.length === 0
                                        ? "Looks like you dont have any projects"
                                        : "Have a look on your projects"}
                                </Typography>
                            </Stack>
                            <Stack>
                                <TextField
                                    variant="outlined"
                                    sx={{ width: "30rem" }}
                                    placeholder="Search Projects"
                                    onChange={(e) => setSearchPrj(e.target.value)}
                                />
                            </Stack>
                        </Stack>

                        {projects?.length === 0 ? (
                            // no project message
                            <Stack spacing={2} mt={25} width={"36rem"} alignSelf={"center"}>
                                <Typography variant="h5" fontWeight={100}>
                                    You have no projects currently, make one to start with Ticketo
                                </Typography>
                                <Button variant="contained" component={Link} to={"/add-project"}>
                                    Create Project
                                </Button>
                            </Stack>
                        ) : (
                            // project grid
                            <Grid
                                container
                                columnGap={1}
                                p={2}
                                mt={1}
                                justifyContent={"center"}
                                alignContent={"center"}
                            >
                                {projects.map((project) => (
                                    <Stack
                                        item
                                        mt={2}
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => navigate(`/project-details/${project?._id}`)}
                                        key={project?._id}
                                        component={Paper}
                                        elevation={5}
                                        position={"relative"}
                                        p={2}
                                        width={"40rem"}
                                        spacing={2}
                                    >
                                        <Stack spacing={1}>
                                            <Typography variant="h5" fontWeight={400}>
                                                {project?.name}
                                            </Typography>
                                            <Typography>{project?.description}</Typography>
                                        </Stack>
                                        <Stack
                                            flexDirection={"row"}
                                            justifyContent={"space-between"}
                                        >
                                            <Typography>
                                                Members - {project?.members?.length}
                                            </Typography>
                                            <Typography>
                                                Created -{" "}
                                                {new Date(project?.createdAt).toLocaleString()}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Grid>
                        )}
                    </Stack>
                </Stack>
            )}
        </>
    );
};
