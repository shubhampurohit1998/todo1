import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Spinner from "@material-ui/core/CircularProgress/CircularProgress";
import { useHistory } from "react-router-dom";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "email", headerName: "EMAIL", width: 200 },
  { field: "first_name", headerName: "First name", width: 130 },
  { field: "last_name", headerName: "Last name", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue("first_name") || ""} ${
        params.getValue("last_name") || ""
      }`,
  },
];


export default function DataTable(props) {
  const history = useHistory();

  useEffect(() => {
    props.getUsersList();
  }, []);

  const {
    user: { loading, error, users },
  } = props;

  const goToUser = (id) => {
    console.log(id);
    history.push(`/users/${id}`);
  };

  return (
    <div style={{ height: 650, width: "100%" }}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Something went wrong</div>
      ) : users.length > 0 ? (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          checkboxSelection
          autoPageSize={true}
          onRowClick={(param) => goToUser(`${param.getValue("id")}`)}
        />
      ) : (
        <div>There is no uesrs</div>
      )}
    </div>
  );
}
