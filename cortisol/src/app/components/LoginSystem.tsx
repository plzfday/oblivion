import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/app/context/AuthenticationContext";
import {useEffect} from "react";

const defaultTheme = createTheme();

interface loginSystemProps {
  isRegister: boolean
}

interface formData {
  username: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export default function LoginSystem({isRegister}: loginSystemProps) {
  const router = useRouter();

  async function isActionSuccessful(form: formData) {
    const apiUrl = isRegister ? 'http://127.0.0.1:8000/api/signup' : 'http://127.0.0.1:8000/api/login';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      return response.status < 400;}
    catch (error) {
      return false;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get('username'),
      password: data.get('password'),
      email: data.get('email'),
    };

    const actionSuccessful = await isActionSuccessful(formData);
    if (actionSuccessful) {
      router.push("/");
    }
  };
  
  return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isRegister ? "Sign Up" : "Sign In"}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                  />
                </Grid>
                {isRegister &&
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                }
                <Grid item xs={12}>
                  <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                {isRegister ? "Sign Up" : "Sign In"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  {isRegister ?
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
                      </Link> :
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                  }
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );
}