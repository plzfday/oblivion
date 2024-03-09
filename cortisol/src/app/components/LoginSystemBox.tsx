import {Box, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface LoginSystemBoxProps {
  isRegister: boolean;
}

export default function LoginSystemBox({isRegister}: LoginSystemBoxProps) {
  return (
        <Box border={1} borderColor="primary.main" p={2}
             sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
            <Typography variant='h5'>Username</Typography>
            <TextField sx={{width: '140px'}} label="Username" variant="outlined" />
          </Box>
          {isRegister &&
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
                <Typography variant='h5'>Email</Typography>
                <TextField sx={{width: '140px'}} label="Email" variant="outlined" />
              </Box>}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
            <Typography variant='h5'>Password</Typography>
            <TextField sx={{width: '140px'}} type="password" label="Password" variant="outlined" />
          </Box>
          <Button color="primary">
            {isRegister ? "Register" : "Log In"}
          </Button>
        </Box>
  )
}