import IconButton from "@mui/material/IconButton";
import AndroidIcon from '@mui/icons-material/Android';
import * as React from 'react';

interface BadgeProps {
    children: React.ReactNode;
}
export default function Badge({children}: BadgeProps) {
    return (
        <IconButton>
            {children}
        </IconButton>
    )
}