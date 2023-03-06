import { Button, Typography } from "@mui/material";
import TableComponent from "./TableComponent";

function App() {
  return (
    <>
      <Typography> Typescript Exercise </Typography>
      <TableComponent />

      <Button sx={{ mt: 4 }} variant="contained">
        Load Data
      </Button>
    </>
  );
}

export default App;
