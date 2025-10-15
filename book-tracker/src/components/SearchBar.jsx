import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import {TextField} from "@mui/material";

function SearchBar({ search, onSearchInput, onSearchButton }) {
  return (
    <div style={{ marginTop: '40px ', alignItems: 'center', gap: '10px', display: 'flex',
      justifyContent: 'center',
      width: 'max-content',
      margin: '0 auto'
     }}>
      <TextField
          id="filled-search"
          label="Search book"
          type="search"
          variant="filled"
          value={search}
          onChange={onSearchInput}
          onKeyDown={(event) => {
          if (event.key === "Enter") onSearchButton();
        }}
          sx={{
          '& .MuiFilledInput-root': { 
            backgroundColor: '#1E90FF',
            paddingTop: '8px', 
            paddingBottom: '8px', 
            height: '60px',
            '&:hover': {
              backgroundColor: '#1C86EE',
            },
            '&.Mui-focused': {
              backgroundColor: '#1E90FF',
            },
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white', 
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'white', 
          },
        }}
        />
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onSearchButton}
        size="medium"
        sx={{ height: '60px' }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
