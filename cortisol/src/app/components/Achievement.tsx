import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import Badge from "@/app/components/Badge";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from '@mui/icons-material/Apple';
import ApiIcon from '@mui/icons-material/Api';

export default function Achievement() {
    return (
        <Box border={1} borderColor="primary.main" p={2}>
            <Typography variant='body2'>
                Achievements:
            </Typography>
            <Badge>
                <AndroidIcon/>
            </Badge>
            <Badge>
                <AppleIcon/>
            </Badge>
            <Badge>
                <ApiIcon/>
            </Badge>
        </Box>
    )
}