import GenreList from "../models/GenreList";
import Movies from "../models/Movies";

const handleMovie = async( rawPages )=>{
  try {
    // Movies List form Models
    const movieList = await Movies()
    // Số phần tử trên mỗi trang
    const itemsPerPage = 20; 
    // Trang hiện tại (nếu không có, mặc định là trang 1
    const page = rawPages || 1
    // Tính toán số lượng phim
    const totalItems = movieList.length;
    // Tính toán số phim bỏ qua (ví dụ: page 1 -> skip 0, page 2 -> skip 20)
    const skip = (page - 1) * itemsPerPage;
    // Lấy danh sách phim trên trang hiện tại
    const results = movieList.slice(skip, skip + itemsPerPage);
    // Tính toán tổng số trang có thể lấy
    const total_pages = Math.ceil(totalItems / itemsPerPage);
    if (movieList) {
      // Trả về kết quả
      return{
        EM: 'Ok!',
        EC: 0,
        DT: {
          results,
          page,
          total_pages,
        }
      };
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong in services',
      EC: -2
    }
  }
}

const handleMovieTopRate = async (rawPages) =>{
  try {
    // Movies List form Models
    const movieList = await Movies()
    const itemsPerPage = 20; // Number of items per page
    const page = rawPages || 1; // Current page (default to 1 if not provided)
    const totalItems = movieList.length; // Total number of movies
    const skip = (page - 1) * itemsPerPage; // Skip movies based on the current page
    const results = movieList
      .sort((a, b) => b.vote_average - a.vote_average) // Sort by vote_average in descending order
      .slice(skip, skip + itemsPerPage); // Get the movies for the current page
    const total_pages = Math.ceil(totalItems / itemsPerPage);
    if (movieList) {
      return {
        EM: 'Ok!',
        EC: 0,
        DT: {
          results,
          page,
          total_pages,
        },
      };
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong in services',
      EC: -2
    }
  }
}

const handleMovieDiscover = async( rawPages,rawGenre)=>{
  try {
    // Movies List form Models
    /**
     * Truyền vào 1 tên, Từ Tên đó chọc vào db genreList
     * Sau đó lấy ra id với tên tương ứng
     * Sau đó từ cái id của genreList findAll where id = genre_ids
     */
    const genre = await GenreList()
    if (rawGenre === ''){
      return {
        EM: "Not found genre parameter",
        EC: -2,
        DT: '',
      }
    }
    const currentGenre = genre.find((genre) => genre.name === rawGenre)
    const movieList = await Movies()
    // Filter movies that have the specified genre_id
    const moviesWithGenre = movieList.filter((movie) =>
      movie.genre_ids.includes(currentGenre.id)
    );
    const itemsPerPage = 20; // Number of items per page
    const page = rawPages || 1; // Current page (default to 1 if not provided)
    const totalItems = moviesWithGenre.length; // Total number of movies
    console.log(totalItems)
    const skip = (page - 1) * itemsPerPage; // Skip movies based on the current page
    const results = moviesWithGenre.slice(skip, skip + itemsPerPage);
    const genre_name = currentGenre.name
    const total_pages = Math.ceil(totalItems / itemsPerPage);
    return{
      EM: 'Ok!',
      EC: 0,
      DT: {
        results,
        page,
        total_pages,
        genre_name,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong in services',
      EC: -2
    }
  }
}
module.exports = { handleMovie, handleMovieTopRate, handleMovieDiscover }