import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import * as jsonData from "../data.json";
import { Button, Input } from "@mui/material";
import { BeautifyData, UserData } from "./tsfile";
import { UserOperations } from "./crud";

function TableComponent() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loadData, setLoadData] = useState<boolean>(false);
  const [previousUserState, setUserPreviousState] = useState<UserData>({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    created: "",
    modified: "",
    formatedDate: "",
    edit: false,
  });

  useEffect(() => {
    if (loadData) {
      setUserData(UserOperations.createUsersArray(jsonData.data));
    }
  }, [loadData]);

  function handleLoadClick() {
    setLoadData(true);
    setUserData(UserOperations.createUsersArray(jsonData.data));
  }

  function handleDelete(user: UserData) {
    const x = new UserOperations(user);
    const y = x.deleteUser(userData);
    setUserData([...y]);
  }

  function newEdit(user: UserData, edit: boolean) {
    const x = new UserOperations(user, edit);
    const y = x.replaceWithNewObject(userData);
    setUserData([...y]);
  }

  function handleCancel(user: UserData) {
    // user: this is edited user
    let x: UserOperations;

    // check for previous state
    // unedited
    if (previousUserState["mname"] != "") {
      x = new UserOperations(previousUserState, false);
    }
    // something was edited, replace with previous state
    else {
      x = new UserOperations(user, false);
    }
    const y = x.replaceWithNewObject(userData);
    setUserData([...y]);

  }

  function renderActionsButtons(user: UserData): JSX.Element {
    if (!user.edit) {
      return (
        <>
          <Button
            onClick={() => {
              newEdit(user, true);
            }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(user);
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
              newEdit(user, false);
            }}
            variant="outlined"
            color="success"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              handleCancel(user);
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

  function editableCell(value: string, name: string, user: UserData) {
    return (
      <Input
        value={value}
        name={name}
        onChange={(e) => {
          if (previousUserState["mname"] == "") {
            setUserPreviousState(user);
          }
          const val = e.target.value;
          const updatedUsers = userData.map((mappedUser: UserData) => {
            if (mappedUser.mname == user.mname) {
              return { ...user, [name]: val };
            }
            return mappedUser;
          });
          setUserData(updatedUsers);
        }}
      />
    );
  }

  function renderRow(user: UserData) {
    return (
      <TableRow key={user.mname}>
        <TableCell component="th" scope="row">
          {user.edit ? editableCell(user.fname, "fname", user) : user.fname}
        </TableCell>
        <TableCell>
          {user.edit ? editableCell(user.lname, "lname", user) : user.lname}
        </TableCell>
        <TableCell>
          {user.edit ? editableCell(user.email, "email", user) : user.email}
        </TableCell>
        <TableCell>
          {user.edit ? editableCell(user.phone, "phone", user) : user.phone}
        </TableCell>
        <TableCell>{user.formatedDate}</TableCell>
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
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Created</TableCell>
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
