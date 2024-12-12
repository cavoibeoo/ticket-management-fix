import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    AddProjectPage,
    AdminDashBoard,
    AdminProfilePage,
    LoginPage,
    NotFound,
    ProjectDetailsPage,
    SignupPage,
    TicketDetailsPage,
    TicketListPage,
    UserDashBoard,
} from "./pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthAsync, selectLoggedInUser, selectisAuthChecked } from "./features/auth/AuthSlice";
import { fetchLoggedInUserByIdAsync } from "./features/users/UserSlice";
import { ProtectedAdmin } from "./features/auth/components/ProtectedAdmin";
import { Protected } from "./features/auth/components/Protected";
import { Logout } from "./features/auth/components/Logout";
import { getProjectByIdAsync } from "./features/projects/ProjectSlice";
import { getMembersByAdminIdAsync } from "./features/members/MemberSlice";

function App() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(selectLoggedInUser);
    const isAuthChecked = useSelector(selectisAuthChecked);

    useEffect(() => {
        dispatch(checkAuthAsync());
    }, []);

    useEffect(() => {
        if (loggedInUser?._id) {
            dispatch(fetchLoggedInUserByIdAsync(loggedInUser._id));
            dispatch(getProjectByIdAsync(loggedInUser._id));

            if (loggedInUser.role === "admin") {
                dispatch(getMembersByAdminIdAsync(loggedInUser?._id));
            }
        }
    }, [loggedInUser]);
    return (
        <Router>
            {isAuthChecked && (
                <>
                    {/* {<Navigate to={"/admin"}></Navigate>} */}
                    <Routes>
                        {/* auth routes */}
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route exact path="/signup" element={<SignupPage />} />
                        <Route exact path="/logout" element={<Logout />} />

                        {/* user routes */}
                        <Route
                            exact
                            path="/"
                            element={
                                <Protected>
                                    <UserDashBoard />
                                </Protected>
                            }
                        />
                        <Route
                            exact
                            path="/ticket-details/:id"
                            element={
                                <Protected>
                                    <TicketDetailsPage />
                                </Protected>
                            }
                        />

                        {/* admin routes */}
                        <Route
                            exact
                            path="/admin"
                            element={
                                <ProtectedAdmin>
                                    <AdminDashBoard />
                                </ProtectedAdmin>
                            }
                        />
                        <Route
                            exact
                            path="/add-project"
                            element={
                                <ProtectedAdmin>
                                    <AddProjectPage />
                                </ProtectedAdmin>
                            }
                        />
                        <Route
                            exact
                            path="/project-details/:id"
                            element={
                                <ProtectedAdmin>
                                    <ProjectDetailsPage />
                                </ProtectedAdmin>
                            }
                        />
                        <Route
                            exact
                            path="/admin/profile"
                            element={
                                <ProtectedAdmin>
                                    <AdminProfilePage />
                                </ProtectedAdmin>
                            }
                        />

                        {/* 404 not found route */}
                        <Route exact path="*" element={<NotFound />} />
                    </Routes>
                </>
            )}
        </Router>
    );
}

export default App;
