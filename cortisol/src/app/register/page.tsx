'use client';

import {Box} from "@mui/material";
import LoginSystemBox from "@/app/components/LoginSystemBox";

export default function Login() {
  return (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <LoginSystemBox isRegister={true}/>
      </Box>
  );
}