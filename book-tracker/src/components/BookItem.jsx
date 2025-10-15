import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";

function BookItem({
  
  pdf,
  country,
  listPrice,
  authors,
  title,
  currency,
  onDelete,
  onAddFavorite
}) {
  return (
    <div>
      <span>
        <a href={pdf} rel="noopener noreferrer" target="_blank">
          {title},{" "}
        </a>
      </span>
      {authors?.map((author) => (
        <span key={`${author}+${author.length}`}>{author}, </span>
      ))}
      <span style={{ color: "red" }}>{country}, </span>
      <span>{listPrice} </span>
      <span>{currency} </span>
      <div style={{marginTop: '10px', marginBottom: '10px'}}>
      <Button variant="contained" startIcon={<FavoriteIcon />} onClick={onAddFavorite} style={{marginRight:'5px'}}>
        Add to favorites
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
}

export default BookItem;
