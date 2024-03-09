import React from 'react';
import AdvertisementCard from "@/app/components/AdvertisementCard";
import Box from "@mui/material/Box";
import {Grid, Stack} from "@mui/material";

export default function Advertisements () {
    return (
        <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
                <AdvertisementCard title='Ad' content='Some ads' />
            </Grid>
            <Grid item xs={8}>
            <AdvertisementCard title='Ad2' content='Some ads' />
        </Grid>


        </Grid>

    );
}