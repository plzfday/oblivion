import { Box, Button, Modal, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function StatisticsModal() {
  interface CategoryData {
    [category: string]: number;
  }
  const [statistics, setStatistics] = useState<CategoryData | null>(null);
  const [open, setOpen] = useState(false);

  async function fetchStatistics() {
    const response = await fetch('http://127.0.0.1:8000/api/notes/stat');
    const data: CategoryData = await response.json();
    setStatistics(data);
  }

  useEffect(()=> {
    fetchStatistics();
  }, [])

  useEffect(() => {
    console.log(statistics);
  }, [statistics]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Open Statistics
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Category Frequency
          </Typography>
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
            ]}
            width={500}
            height={300}
          />
        </Box>
      </Modal>
    </Box>
  );
}
