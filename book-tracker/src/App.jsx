import { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import FavoritesList from "./components/FavoritesList";
import IconButton from '@mui/material/IconButton';
import { Refresh } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

function App() {
  const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";
  const [fetchUrl, setFetchUrl] = useState(API_URL);
  const [searchTerm, setSearchTerm] = useState("");

  const bookReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_INIT": {
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      }
      case "FETCH_SUCCESS": {
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      }
      case "FETCH_ERROR": {
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      }
      case "SET_BOOK": {
        return {
          ...state,
          data: action.payload,
        };
      }
      default:
        return state;
    }
  };
  const initialBook = { isLoading: false, isError: false, data: [] };

  const [book, dispatchBook] = useReducer(bookReducer, initialBook);
  const [favorites, setFavorites] = useState([]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const onSearchButton = () => {
    setFetchUrl(`${API_URL}${searchTerm}`);
  };

  const handleDelete = (id) => {
    const newBooks = book.data.filter((item) => item.id !== id);
    dispatchBook({
      type: "SET_BOOK",
      payload: newBooks,
    });
  };

  const handleAddFavorite = (bookItem) => {
    if (favorites.find((fav) => fav.id === bookItem.id)) return;
    setFavorites([...favorites, bookItem]);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const handleFetchBooks = useCallback(async () => {
    if (!searchTerm) return;
    console.log(fetchUrl);

    dispatchBook({
      type: "FETCH_INIT",
    });

    try {
      const response = await fetch(fetchUrl);
      const result = await response.json();

      dispatchBook({
        type: "FETCH_SUCCESS",
        payload: result.items,
      });
    } catch (error) {
      console.log(error);
      dispatchBook({
        type: "FETCH_ERROR",
      });
    }
  }, [fetchUrl]);

  useEffect(() => {
    handleFetchBooks();
  }, [handleFetchBooks]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (storedFavorites.length > 0) setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (book.data.length === 0) return;
    console.log(book.data);
  }, [book.data]);

  return (
    <div>
      {book.isError ? (
        <p>Something went wrong...</p>
      ) : (
        <div>
          {book.isLoading ? (
            <div>
            <CircularProgress />
            <p>Loading...</p>
            </div>
          ) : (
            <BookList
              list={book.data}
              onDelete={handleDelete}
              onAddFavorite={handleAddFavorite}
            />
          )}
          <SearchBar
            search={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchButton={onSearchButton}
          />
          <FavoritesList
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
          />
        </div>
      )}
    </div>
  );
}

export default App;
