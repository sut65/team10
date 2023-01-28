import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { PromotionInterface } from "../../models/promotion/IPromotion";
import { QuotaCodeInterface } from "../../models/promotion/IQuotaCode";
import { Grid } from "@mui/material";

function PromotionTable_UI() {
  const [promotion, setPromotion] = useState<PromotionInterface[]>([]);
  const [quotacode, setQuotacode] = useState<QuotaCodeInterface[]>([]);

  useEffect(() => {
    getPromotion();
    getQuotacode();
  }, []);
    //ดึงข้อมูลจาก Promotion
  const getPromotion = async () => {
    const apiUrl = "http://localhost:8080/promotion";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setPromotion(res.data);
        }
      });
      
  };

  //ดึงข้อมูลจาก Quotacode
  const getQuotacode = async () => {
    const apiUrl = "http://localhost:8080/quotacodes";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setQuotacode(res.data);
        }
      });
      
  };


  const promotioncolumns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Codetype",
      headerName: "ประเภทของโค๊ด",
      width: 130,
      valueGetter: (params) => params.value.Type,
    },
    {
      field: "Reason",
      headerName: "เลขที่เหตุผล",
      width: 150,
      valueGetter: (params) => params.value.Reason,
    },
    {
      field: "Price",
      headerName: "ราคา",
      width: 100,
    },
    {
      field: "Amount",
      headerName: "จำนวน",
      width: 50,
    },
    {
      field: "Employee",
      headerName: "พนักงาน",
      width: 150,
      valueGetter: (params) => params.value.Name,
    },
    { field: "Time_Stamp", headerName: "เวลาออกบิล", width: 250 },
  ];

  const quotacolumns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Promotion",
      headerName: "เลขที่โปรโมชั่น",
      width: 100,
      valueGetter: (params) => params.value.ID,
    },
    {
      field: "Bill",
      headerName: "เลขที่บิลที่ใช้งาน",
      width: 150,
    },
  ];

  return (
    <div>
      <Grid>
        <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
        <Grid item xs = {12}>
        <Container maxWidth="xl">
          <div style={{ height: 400, width: "100%", marginTop: "30px" }}>
            <DataGrid
              rows={promotion}
              getRowId={(row) => row.ID}
              columns={promotioncolumns}
              pageSize={5}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Container>
        </Grid>
        <Grid item xs = {5}>
        <Container maxWidth="xl">
          <div style={{ height: 400, width: "100%", marginTop: "30px" }}>
            <DataGrid
              rows={quotacode}
              getRowId={(row) => row.ID}
              columns={quotacolumns}
              pageSize={5}
              rowsPerPageOptions={[2]}
            />
          </div>
        </Container>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default PromotionTable_UI;