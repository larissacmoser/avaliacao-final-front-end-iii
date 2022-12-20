import { Container } from "@mui/material";
import React from "react";
import Img from "../../assets/wallpaper.png";
import "../../pages/Login.css";
import Grid from "@mui/material/Grid";

interface DefaultProps {
  page: React.ReactNode;
}
const Default: React.FC<DefaultProps> = ({ page }) => {
  return (
    <div id="bg-movement">
      <Container
        maxWidth="lg"
        fixed
        sx={{
          backgroundImage: `url(${Img})`,

          height: "85vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "60%",
          }}
        >
          <Grid item xs={4}>
            {page}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Default;
