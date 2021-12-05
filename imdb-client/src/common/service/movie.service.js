import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

const useMovieService = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    sortBy: "imdb_score",
    genre: [],
    descOrder: 0,
    skip: 0,
  });

  const searchMovies = useCallback(async () => {
    setloading(true);
    const response = await fetch(
      `http://localhost:4000/movies?name=${searchQuery.name}&sortBy=${
        searchQuery.sortBy
      }&genre=${searchQuery.genre.join(",")}&descOrder=${
        searchQuery.descOrder
      }&skip=${searchQuery.skip}`
    );
    const result = await response.json();
    if (result.statusCode === 200) setMovies(result.movies);
    setloading(false);
  }, [setMovies, searchQuery]);

  useEffect(() => {
    searchMovies();
  }, [searchQuery, searchMovies]);

  const updateMovie = useCallback(
    async (data) => {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("http://localhost:4000/movies/", options);
      const result = await response.json();
      if (result.statusCode === 200) {
        await searchMovies();
        toast.success('Movie Updated Successfully')
      }

      return result.statusCode === 200;
    },
    [searchMovies]
  );

  const saveMovie = useCallback(
    async (data) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("http://localhost:4000/movies/", options);
      const result = await response.json();
      if (result.statusCode === 200) {
        await searchMovies();
        toast.success('Movie Added Successfully');
      }

      return result.statusCode === 200;
    },
    [searchMovies]
  );

  const deleteMovie = useCallback(
    async (data) => {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch("http://localhost:4000/movies/", options);
      const result = await response.json();
      if (result.statusCode === 200) {
        await searchMovies();
        toast.success('Movie deleted successfully')
      }

      return result.statusCode === 200;
    },
    [searchMovies]
  );

  return {
    movies,
    searchMovies,
    searchQuery,
    setSearchQuery,
    saveMovie,
    loading,
    setloading,
    deleteMovie,
    updateMovie,
  };
};

export default useMovieService;
