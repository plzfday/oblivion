import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {type} from "node:os";

export enum LoginButtonTypes {
  login = "Sign In",
  register = "Sign Up",
  logout = "Sign Out"
}

interface loginSystemButtonProps {
  loginButtonType: LoginButtonTypes;
}

export default function LoginSystemButton({loginButtonType}: loginSystemButtonProps) {
  function handleButtonClick() {
    if (loginButtonType === LoginButtonTypes.login) {
      return "/login";
    } else if (loginButtonType === LoginButtonTypes.register) {
      return "/register";
    } else {
      return "/";
    }
  }
  return (
      <Button sx={{color: 'white'}} component='a' href={handleButtonClick()}>
        <Typography variant='subtitle1'>
          {loginButtonType}
        </Typography>
      </Button>
  )
}