import React from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Link,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Forgot Password</DialogTitle>
    <DialogContent>
      <DialogContentText>
        To reset your password, please enter your email address here.
      </DialogContentText>
      <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={() => alert('Reset password logic here!')}>Send</Button>
    </DialogActions>
  </Dialog>
);

const SignInCard = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
      // Add login logic here
    }
  };

  return (
    <Card variant="outlined" sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
      <Typography component="h1" variant="h4">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', flexDirection:"column"}}>
            <FormLabel htmlFor="password">Password</FormLabel>
           
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <Box sx = {{display:'flex',justifyContent:'space-between'}}>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Link component="button" onClick={handleClickOpen} variant="body2">
              Forgot your password?
            </Link>
            </Box>
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained" onClick={()=>navigate("/dashboard")}>
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" variant="body2">
            Sign up
          </Link>
        </Typography>
      </Box>
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Google')} startIcon={<GoogleIcon />}>
          Sign in with Google
        </Button>
        <Button fullWidth variant="outlined" onClick={() => alert('Sign in with Facebook')} startIcon={<FacebookIcon />}>
          Sign in with Facebook
        </Button>
      </Box>
    </Card>
  );
};

export default function Login() {
  const theme = createTheme();
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ height: '100vh' }}>
        <Grid item xs={12} md={6} sx={{ backgroundColor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Welcome Back!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SignInCard />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
