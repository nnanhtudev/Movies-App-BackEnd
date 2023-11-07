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

module.exports = { handleMovie, handleMovieTopRate }