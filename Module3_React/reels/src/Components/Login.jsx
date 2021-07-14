import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { TextField, Grid, Button, Paper, Card, CardContent,CardActions, Container, CardMedia, Typography, makeStyles } from '@material-ui/core';
import logo from "../logo.png";
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const {login} = useContext(AuthContext);

    async function handleLogin(e){
        //email, password
        try{
            await login(email, password);
            props.history.push("/");
        }
        catch(err){
            setMessage(err.message);
            setEmail("");
            setPassword("");
        }
    }

    let useStyles = makeStyles({
        centerDivs: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            width: "100vw",
          },
          carousal: { height: "10rem", backgroundColor: "lightgray" },
          fullWidth: {
            width: "100%",
          },
          centerElements: {
            display: "flex",
            flexDirection: "column",
          },
          mb: {
            marginBottom: "1rem",
          },
          padding: {
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          },
          alignCenter: {
            justifyContent: "center",
          },
    });

    let classes = useStyles();

    return ( <>
        <Container>
            <Grid container justify="center" spacing={2}>
                {/* carousel */}
                <Grid item sm={5}>
                    <Paper className={classes.carousal}>Carousel</Paper>
                </Grid>
                <Grid item sm={3}>
                    <Card variant="outlined"  className={classes.mb}>
                        <CardMedia
                            image={logo}
                            style={{height:"5rem", backgroundSize: "contain"}}
                        ></CardMedia>
                        <CardContent  className={classes.centerElements}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                className={classes.mb}
                                size="small"
                                onChange={(e)=>setEmail(e.target.value)}
                            ></TextField>
                            <TextField
                                 label="Password"
                                 type="password"
                                 variant="outlined"
                                 value={password}
                                 size="small"
                                 onChange={(e)=>setPassword(e.target.value)}
                            ></TextField>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                className={classes.fullWidth}
                            >
                                Login
                            </Button>
                        </CardActions>
                    </Card>
                    <Card variant="outlined" className={classes.padding}>
                        <Typography style={{textAlign: "center"}}> 
                                Don't have an account ?
                                <Button variant="text" color="primary">
                                    <Link style={{color:"blue", textDecoration: "none"}} to="/signup">
                                        SignUp
                                    </Link>
                                </Button>
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>

        {/* <h1>Login Page</h1>
        
        <div>
            Email
            <input 
            type="text"
            value={email}
            onChange={(e)=>{setEmail(e.target.value);}}
             />
        </div>

        <div>
            Password
            <input 
            type="text"
            value={password}
            onChange={(e)=>{setPassword(e.target.value);}} 
            />
        </div>

        <button onClick={handleLogin}>Login</button>

        <h2 style={{color:"red"}}>{message}</h2> */}

        </>
     );
}
 
export default Login;