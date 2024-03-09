import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface loginSystemButtonProps {
  text: string;
}

export default function LoginSystemButton({text}: loginSystemButtonProps) {
  return (
      <Button sx={{color: 'white'}}>
        <Typography variant='subtitle1'>
          {text}
        </Typography>
      </Button>
  )
}