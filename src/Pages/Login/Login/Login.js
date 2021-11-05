import {
    Alert,
    Button,
    CircularProgress,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import login from "../../../images/login.png";
import useAuth from "./../../../hooks/useAuth";

const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const { user, loginUser, isLoading, authError, loginWithGoogle } =
        useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = (e) => {
        // const field = e.target.name;
        // const value = e.target.value;
        // const newLoginData = { ...loginData };
        // newLoginData[field] = value;
        // setLoginData(newLoginData);
        const name = e.target.name;
        const value = e.target.value;
        setLoginData((prevState) => ({ ...prevState, [name]: value }));
    };
    const handleLoginSubmit = (e) => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    };
    const handleWithGoogle = () => {
        loginWithGoogle(location, history);
    };
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onBlur={handleOnChange}
                            variant="standard"
                        />
                        <TextField
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handleOnChange}
                            variant="standard"
                        />

                        <Button
                            sx={{ width: "75%", m: 1 }}
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                        <Grid container spacing={5}>
                            <Grid item xs={6} md={6} sx={{ mx: "auto" }}>
                                <GoogleButton
                                    onClick={() => {
                                        handleWithGoogle();
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/register"
                        >
                            <Button variant="text">
                                New User? Please Register
                            </Button>
                        </NavLink>
                        {isLoading && <CircularProgress />}
                        {user?.email && (
                            <Alert severity="success">
                                Login successfully!
                            </Alert>
                        )}
                        {authError && (
                            <Alert severity="error">{authError}</Alert>
                        )}
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "100%" }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
