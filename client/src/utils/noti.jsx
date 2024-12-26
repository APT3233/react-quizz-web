import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from '@mui/material/AlertTitle';
import Stack from "@mui/material/Stack";

const NotiAlert = ({ title, message, type }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
};

export default NotiAlert;
