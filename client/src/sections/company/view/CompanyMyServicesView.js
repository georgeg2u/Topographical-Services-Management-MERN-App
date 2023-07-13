import {useContext, useEffect, useMemo, useState} from "react";
import {Box, Typography} from "@mui/material";
import {DataGrid, gridClasses} from "@mui/x-data-grid";
import {grey} from "@mui/material/colors";
import axios from "axios";
import CompanyDataContext from "../../../context/CompanyDataContext";

// import RoomsActions from './RoomsActions';

const CompanyMyServicesView = () => {
  const [pageSize, setPageSize] = useState(10);
  const [services, setServices] = useState([]);
  const {denumire: contextDenumire} = useContext(CompanyDataContext);

  useEffect(() => {
    const url = "http://localhost:8080/api/company/search";
    const fetchData = async () => {
      try {
        const response = await axios.post(url, {
          denumire: contextDenumire,
        });
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [contextDenumire]);

  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "Titlu",
        width: 270,
        renderCell: params => params.row.title,
      },
      {
        field: "content",
        headerName: "Descriere",
        width: 220,
        renderCell: params => {
          const text = params.row.content;
          return (
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {text.length > 30 ? `${text.substring(0, 30)}...` : text}
            </div>
          );
        },
      },
      {
        field: "price",
        headerName: "Preț",
        width: 120,
        renderCell: params => params.row.price + " LEI",
      },
      {
        field: "location",
        headerName: "Locație",
        width: 120,
        renderCell: params => params.row.location,
      },
      {
        field: "duration",
        headerName: "Durata",
        width: 120,
        renderCell: params => params.row.duration + " Zile",
      },
      {
        field: "documents",
        headerName: "Documente",
        width: 350,
        renderCell: params => {
          const text = params.row.documents;
          return (
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {text.length > 30 ? `${text.substring(0, 30)}...` : text}
            </div>
          );
        },
      },
      {
        field: "benefits",
        headerName: "Beneficii",
        width: 350,
        renderCell: params => {
          const text = params.row.benefits;
          return (
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {text.length > 30 ? `${text.substring(0, 30)}...` : text}
            </div>
          );
        },
      },
      // {
      //   field: "actions",
      //   headerName: "Actions",
      //   type: "actions",
      //   width: 140,
      //   // renderCell: (params) => <RoomsActions {...{ params }} />,
      //   renderCell: params => <>asd</>,
      // },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 430,
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{textAlign: "center", mt: 3, mb: 3, color: "primary.main"}}
      >
        Serviciile mele
      </Typography>
      <DataGrid
        columns={columns}
        rows={services}
        getRowId={row => row._id}
        initialState={{
          pagination: {paginationModel: {pageSize: 5}},
        }}
        pageSizeOptions={[5, 10, 25]}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        getRowSpacing={params => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: grey[200],
          },
        }}
      />
    </Box>
  );
};

export default CompanyMyServicesView;
