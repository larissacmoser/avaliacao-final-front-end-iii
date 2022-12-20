import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../config/theme";
import { Grid, Typography, ListItem } from "@mui/material";
import NoteType from "../types/NoteType";
interface NoteProps {
  note: NoteType;
  actionDelete: (note: NoteType) => void;
  actionEdit: (note: NoteType) => void;
}

const Note: React.FC<NoteProps> = ({ note, actionDelete, actionEdit }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="div">
          {note.description}
        </Typography>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", marginRight: "80px" }}
              component="div"
            >
              {note.detailing}
            </Typography>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Tooltip title="Excluir recado">
                  <IconButton
                    onClick={() => actionDelete(note)}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon
                      sx={{ color: `${theme.palette.secondary.light}` }}
                    />
                  </IconButton>
                </Tooltip>
              }
            ></ListItem>

            <Tooltip title="Editar recado">
              <IconButton onClick={() => actionEdit(note)}>
                <EditIcon sx={{ color: `${theme.palette.secondary.main}` }} />
              </IconButton>
            </Tooltip>
          </Box>
        </ThemeProvider>
        <Divider />
      </Grid>
    </>
  );
};

export default Note;
