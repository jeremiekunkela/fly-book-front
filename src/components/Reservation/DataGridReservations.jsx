import styles from "./DataGridReservations.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import CustomNoResultsOverlay from '../CustomNoResultsOverlay';

export default function DataGridReservations(props) {
  const { reservations, columns, loading } = props;

  return (
    <div className={styles.container}>
      <Box sx={{ width: "80%" }}>
        <DataGrid
          getRowId={(row) => reservations.indexOf(row)}
          rows={reservations}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
          loading={loading}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
            slots={{
                noResultsOverlay: CustomNoResultsOverlay,
                noRowsOverlay: CustomNoResultsOverlay,
            }}
          sx={{
            bgcolor: "background.paper",
            borderRadius: "10px",
            border: "none",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f6f9fc",
            },
          }}
        />
      </Box>
    </div>
  );
}
