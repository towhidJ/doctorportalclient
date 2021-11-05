import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "./../../../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <Stack
                sx={{ color: "grey.500", mx: "auto" }}
                spacing={2}
                direction="row"
            >
                <CircularProgress color="secondary" />
            </Stack>
        );
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    ></Redirect>
                )
            }
        ></Route>
    );
};

export default PrivateRoute;
