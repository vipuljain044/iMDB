import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import movieContext from "../../common/context/movieContext";
import authContext from "../../common/context/authContext";
import Spinner from "../../common/spinner/spinner.component";
import { Table, Pagination, Button } from "react-bootstrap";

import AddMovieModal from "./addMovie.modal";
import EditMovieModal from "./editMovie.modal";
import DeleteMovieModal from "./deleteMovie.modal";

import Edit from "../../static/assets/edit.png";
import Delete from "../../static/assets/delete.png";

import movieImage1 from "../../static/assets/movie0.jpg";
import movieImage2 from "../../static/assets/movie1.jpg";
import movieImage3 from "../../static/assets/movie2.jpg";
const movieImages = [movieImage1, movieImage2, movieImage3];

const genres = [
  "Adventure",
  "Family",
  "Fantasy",
  "Musical",
  "Action",
  "Sci-Fi",
  "Drama",
  "War",
  "Horror",
  "Mystery",
  "Thriller",
  "Romance",
  "Animation",
  "Crime",
  "History",
  "Western",
  "Film-Noir",
  "Comedy",
  "Documentary",
  "Music",
  "Short",
  "Sport",
  "Talk-Show",
  "Biography",
  "Game-Show",
  "News",
  "Adult",
  "Reality-TV",
];
function Home() {
  const { user } = useContext(authContext);
  const {
    movies,
    searchQuery,
    setSearchQuery,
    saveMovie,
    loading,
    updateMovie,
    deleteMovie,
  } = useContext(movieContext);

  const [update, setUpdate] = useState();
  const [remove, setRemove] = useState();
  const [add, setAdd] = useState(false);

  const handleChange = (checked, val) => {
    const newgenreList = [...searchQuery.genre];
    if (checked) {
      newgenreList.push(val);
    } else {
      newgenreList.filter((i) => i !== val);
    }
    setSearchQuery({ ...searchQuery, genre: newgenreList });
  };
  const handleSortByChange = (e) =>
    setSearchQuery({ ...searchQuery, sortBy: e.target.value });
  const handleOrderChange = (e) =>
    setSearchQuery({ ...searchQuery, descOrder: e.target.value });
  const handleSkip = (val) => setSearchQuery({ ...searchQuery, skip: val });

  const updateMovieHandler = (data) => {
    setUpdate(null);
    data.genre = (data.genre || []).map((g) => g.value);
    updateMovie(data);
  };

  const deleteMovieHandler = (id) => {
    setRemove(null);
    deleteMovie({ id });
  };
  const AddMovieHandler = (data) => {
    setAdd(null);
    data.genre = (data.genre || []).map((g) => g.value);
    saveMovie(data);
  };
  return (
    <div className='home'>
      {add && (
        <AddMovieModal
          genres={genres}
          close={() => setAdd(false)}
          save={AddMovieHandler}
        />
      )}
      {update && (
        <EditMovieModal
          movie={update}
          genres={genres}
          close={() => setUpdate(null)}
          save={updateMovieHandler}
        />
      )}
      {remove && (
        <DeleteMovieModal
          movie={remove}
          close={setRemove}
          remove={deleteMovieHandler}
        />
      )}
      <div className='featured-today-container'>
        <Container>
          <Row>
            <Col xs={7} md={7} sm={7}>
              <h4 className='title'>IMDb Top 10 Movies</h4>
            </Col>
            <Col>
              {user && user.role === "Admin" && (
                <Button
                  variant='outline-light'
                  size='sm'
                  onClick={() => setAdd(true)}
                >
                  Add New Movie
                </Button>
              )}
            </Col>
          </Row>

          <Row>
            <Col xs={9} md={9} sm={9}>
              {loading && <Spinner />}
              {!loading && (
                <Table variant='dark'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Director</th>
                      <th>iMDB Rating</th>
                      {user && user.role === "Admin" && <th></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((m, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            src={movieImages[i % 3]}
                            style={{
                              width: "25px",
                              height: "15px",
                              marginRight: "10px",
                            }}
                            alt=''
                          />
                          {m.name}
                        </td>
                        <td>{m.director}</td>
                        <td>{m.imdb_score}</td>
                        {user && user.role === "Admin" && (
                          <td>
                            <img
                              src={Edit}
                              alt=''
                              style={{ width: "15px" }}
                              onClick={() => setUpdate(m)}
                            />
                            <img
                              src={Delete}
                              alt=''
                              style={{ width: "15px", marginLeft: "10px" }}
                              onClick={() => setRemove(m)}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>

            <Col>
              <Row>
                Sort By: &nbsp;
                <select
                  value={searchQuery.sortBy}
                  onChange={handleSortByChange}
                >
                  <option value={"imdb_score"}>iMDB Rating</option>
                  <option value={"99popularity"}>Popularity</option>
                  <option value={"name"}>Movie Title</option>
                  <option value={"director"}>Director Name</option>
                </select>
                <select
                  value={searchQuery.descOrder}
                  onChange={handleOrderChange}
                >
                  <option value={0}>Asc</option>
                  <option value={1}>Desc</option>
                </select>
              </Row>
              <br />
              <Row>
                Top Rated Movies by Genre
                <ToggleButtonGroup
                  type='checkbox'
                  value={searchQuery.genre}
                  onChange={handleChange}
                  style={{ display: "block" }}
                >
                  {genres.map((g, i) => (
                    <>
                      <ToggleButton
                        className='mb-2'
                        id='toggle-check'
                        type='checkbox'
                        variant='outline-primary'
                        checked={searchQuery.genre.indexOf(g) >= 0}
                        value={g}
                        onChange={(e) =>
                          handleChange(e.currentTarget.checked, g)
                        }
                        key={i}
                      >
                        {g}
                      </ToggleButton>
                    </>
                  ))}
                </ToggleButtonGroup>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6} sm={6}></Col>
            <Col xs={2} md={2} sm={2}>
              <Pagination>
                <Pagination.First onClick={() => handleSkip(0)} />
                <Pagination.Prev
                  onClick={() =>
                    searchQuery.skip > 0 && handleSkip(searchQuery.skip - 10)
                  }
                />
                <Pagination.Item onClick={() => handleSkip(0)}>
                  {1}
                </Pagination.Item>
                <Pagination.Item onClick={() => handleSkip(10)}>
                  {2}
                </Pagination.Item>
                <Pagination.Item onClick={() => handleSkip(20)}>
                  {3}
                </Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Next
                  onClick={() => handleSkip(searchQuery.skip + 10)}
                />
                <Pagination.Last />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
