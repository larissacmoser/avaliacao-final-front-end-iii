import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import React from "react";
interface BasicCardProps {
  title: string;
  children?: React.ReactNode;
}
export default function BasicCard(props: BasicCardProps) {
  return (
    <Card sx={{ minWidth: 275, boxShadow: "10px 5px 5px rgba(0,0,0,0.5)" }}>
      <Typography sx={{ fontSize: "40px", padding: "30px" }}>
        {props.title}
      </Typography>
      {props.children}
    </Card>
  );
}
