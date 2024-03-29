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
import { useState } from 'react';
import { User, useUserState } from '../context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

const defaultTheme = createTheme();

interface loginSystemProps {
  isRegister: boolean;
}

export default function LoginSystem({ isRegister }: loginSystemProps) {
  const router = useRouter();
  const context = useUserState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: User = { username, password, email };

    if (isRegister) {
      axios
        .post('http://localhost:8000/api/signup', userData, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookie.get('csrftoken') || '',
          },
        })
        .then((res) => {
          router.push('/login');
        });
    } else {
      axios
        .post('http://localhost:8000/api/login', userData)
        .then((res) => {
          console.log(res);
          context.login(userData);
          router.push('/notes');
        })
        .catch((err) => {
          alert('Invalid credentials');
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
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
          <Typography component='h1' variant='h5'>
            {isRegister ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              {isRegister && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {isRegister ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                {isRegister ? (
                  <Link href='/login' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                ) : (
                  <Link href='/register' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
