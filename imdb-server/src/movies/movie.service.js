const db = require("../_helpers/db");

const getMovies = async ({ name, sortBy, genre, descOrder, skip = 0 }) => {
  try {
    const pipeline = [];
    genre = genre ? genre.split(",") : [];

    if (!!name) {
      const regex = new RegExp(name.toLowerCase(), "i");
      pipeline.push({
        $match: { $or: [{ name: regex }, { director: regex }] },
      });
    }
    if (genre.length > 0) {
      pipeline.push({
        $project: {
          id: "$_id",
          "99popularity": "$99popularity",
          director: "$director",
          imdb_score: "$imdb_score",
          name: "$name",
          genre: "$genre",
          genreTmp: "$genre",
        },
      });
      pipeline.push({ $unwind: "$genreTmp" });
      pipeline.push({ $match: { genreTmp: { $in: genre } } });
      pipeline.push({
        $group: {
          _id: "$id",
          "99popularity": { $first: "$99popularity" },
          director: { $first: "$director" },
          imdb_score: { $first: "$imdb_score" },
          name: { $first: "$name" },
          genre: { $first: "$genre" },
        },
      });
    }
    let sortQuery = {};
    sortQuery[sortBy] = !!Number(descOrder) ? -1 : 1;
    pipeline.push({ $sort: sortQuery });

    pipeline.push({ $skip: Number(skip) });
    pipeline.push({ $limit: 10 });

    return await db.Movie.aggregate(pipeline);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteMovie = (id) => {
  return db.Movie.findByIdAndDelete(id);
};

const addMovie = async (data) => {
  if (await db.Movie.findOne({ name: data.name })) {
    // Movie already exists
    return false;
  }

  // create movie object
  const movie = new db.Movie(data);

  // save Movie
  return await movie.save();
};

const updateMovie = async (data) => {
  console.log(data);
  if (await db.Movie.findOne({ name: data.name })) {
    return db.Movie.updateOne({ _id: data._id }, data);
  }
  return;
};

module.exports = {
  getMovies,
  deleteMovie,
  addMovie,
  updateMovie,
};
