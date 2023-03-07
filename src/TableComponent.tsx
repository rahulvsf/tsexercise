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
      setUserData(attachEditProp(jsonData.data));
    }
  }, [loadData]);

  function attachEditProp(arr: UserData[]): UserData[] {
    arr.forEach((u: UserData) => {
      u.edit = false;
      const x = new UserOperations(u);
      x.logUser();
    });
    return arr;
  }

  function handleLoadClick() {
    setLoadData(true);
    setUserData(attachEditProp(jsonData.data));
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

  function handleCancel(mname: string) {
    let updatedUsers = userData.map((user: UserData) => {
      if (mname == user.mname) {
        if (previousUserState["mname"] != "")
          return { ...previousUserState, edit: false };
      }
      return user;
    });
    setUserData(updatedUsers);
  }

  function renderActionsButtons(user: UserData): JSX.Element {
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
              handleEdit(user.mname, false);
            }}
            variant="outlined"
            color="success"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              handleCancel(user.mname);
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
