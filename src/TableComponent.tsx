import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import * as jsonData from "../data.json";
import { Button } from "@mui/material";

interface UserData {
  fname: string;
  mname: string;
  lname: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  created: string;
  modified: string;
  edit?: boolean;
}

function TableComponent() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loadData, setLoadData] = useState<boolean>(false);

  useEffect(() => {
    if (loadData) {
      setUserData(attachEditProp(jsonData.data));
    }
  }, [loadData]);

  function attachEditProp(arr: UserData[]): UserData[] {
    arr.forEach((u: UserData) => (u.edit = false));
    return arr;
  }

  function handleLoadClick() {
    setLoadData(true);
    if (userData.length != jsonData.data.length) {
      setUserData(attachEditProp(jsonData.data));
    }
  }

  function handleDelete(mname: string) {
    let users = [...userData];
    users = users.filter((u: UserData) => {
      return u.mname != mname;
    });
    setUserData(users);
  }

  function handleEdit(mname: string, edit: boolean) {
    let users = [...userData];
    users.forEach((u: UserData) => {
      if (u.mname == mname) u.edit = edit;
    });
    setUserData(users);
  }

  function renderActionsButtons(user: UserData) {
    if (!user.edit) {
      return (
        <>
          <Button
            onClick={() => {
              handleEdit(user.mname, true);
            }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(user.mname);
            }}
            sx={{ ml: 1 }}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            onClick={() => {
              //   handleEdit(user.mname);
            }}
            variant="outlined"
            color="success"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              handleEdit(user.mname, false);
            }}
            sx={{ ml: 1 }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </>
      );
    }
  }

  function renderRow(user: UserData) {
    return (
      <TableRow key={user.mname}>
        <TableCell component="th" scope="row">
          {user.fname}
        </TableCell>
        <TableCell>{user.mname}</TableCell>
        <TableCell>{user.lname}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{renderActionsButtons(user)}</TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user: UserData) => renderRow(user))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleLoadClick} sx={{ mt: 4 }} variant="contained">
        {loadData ? "Refresh" : "Load"} Data
      </Button>
    </>
  );
}

export default TableComponent;
