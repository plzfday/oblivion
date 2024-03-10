import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import axios from "axios";
import Cookie from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default function StatButton() {
  const getStat = async () => {
    return axiosClient
      .get("notes/stat", {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((res) => {
        return res.data;
      });
  };
const data = getStat();

  return <Button onClick={}>Statistics</Button>;
}
