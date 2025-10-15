import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  return (
    <div style={{ marginTop: "30px"}}>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet...</p>
      ) : (
        favorites.map((favorite) => (
          <div key={favorite.id} >
            <span>
              <a href={favorite.accessInfo.pdf.acsTokenLink}>
                {favorite.volumeInfo?.title}
              </a>
            </span>

            {favorite.volumeInfo.authors.map((author) => (
              <span key={`${author}+${author.length}`}>, {author} </span>
            ))}
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => onRemoveFavorite(favorite.id)}
              style={{marginLeft: '25px', padding: '5px 10px', cursor: 'pointer'}}
            >
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
