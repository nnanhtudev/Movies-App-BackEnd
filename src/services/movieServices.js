import GenreList from "../models/GenreList";
import Movies from "../models/Movies";
import MovieVideoToken from "../models/VideoList";
import { capitalizeFirstLetter, normalizeString } from '../utils/converInput'

const handleMovie = async (page, limit) => {
  try {
    // Movies List form Models
    const movieList = await Movies()
    // Số phần tử trên mỗi trang
    const itemsPerPage = limit || 20;
    // Trang hiện tại (nếu không có, mặc định là trang 1
    const pages = page || 1
    // Tính toán số lượng phim
    const totalItems = movieList.length;
    // Tính toán số phim bỏ qua (ví dụ: page 1 -> skip 0, page 2 -> skip 20)
    const offset = (pages - 1) * itemsPerPage;
    // Lấy danh sách phim trên trang hiện tại
    const results = movieList.slice(offset, offset + itemsPerPage);
    // Tính toán tổng số trang có thể lấy
    const total_pages = Math.ceil(totalItems / itemsPerPage);
    if (totalItems > 0) {
      // Trả về kết quả
      return {
        EM: 'Ok!',
        EC: 0,
        DT: {
          page,
          total_pages,
          results,
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

const handleMovieTopRate = async (pages, limit) => {
  try {
    // Movies List form Models
    const movieList = await Movies()
    const itemsPerPage = limit || 20; // Number of items per page
    const page = pages || 1; // Current page (default to 1 if not provided)
    const totalItems = movieList.length; // Total number of movies
    const skip = (page - 1) * itemsPerPage; // Skip movies based on the current page
    const results = movieList
      .sort((a, b) => b.vote_average - a.vote_average) // Sort by vote_average in descending order
      .slice(skip, skip + itemsPerPage); // Get the movies for the current page
    const total_pages = Math.ceil(totalItems / itemsPerPage);
    if (totalItems) {
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

const handleMovieDiscover = async (rawPages, rawGenre) => {
  try {
    // Movies List form Models
    /**
     * Truyền vào 1 tên, Từ Tên đó chọc vào db genreList
     * Sau đó lấy ra id với tên tương ứng
     * Sau đó từ cái id của genreList findAll where id = genre_ids
     */
    const genre = await GenreList();
    let covertInput = capitalizeFirstLetter(rawGenre);
    const currentGenre = genre.find((genre) => genre.name === covertInput);

    if (!currentGenre) {
      return {
        EM: 'Genre not found',
        EC: -1,
      };
    }

    const movieList = await Movies();
    // Filter movies that have the specified genre_id
    const moviesWithGenre = movieList.filter((movie) =>
      movie.genre_ids.includes(currentGenre.id)
    );
    const itemsPerPage = 20; // Number of items per page
    const page = rawPages || 1; // Current page (default to 1 if not provided)
    const totalItems = moviesWithGenre.length; // Total number of movies
    const skip = (page - 1) * itemsPerPage; // Skip movies based on the current page
    const results = moviesWithGenre.slice(skip, skip + itemsPerPage);
    const genre_name = currentGenre.name;
    const total_pages = Math.ceil(totalItems / itemsPerPage);
    return {
      EM: 'Ok!',
      EC: 0,
      DT: {
        results,
        page,
        total_pages,
        genre_name,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong in services',
      EC: -2,
    };
  }
};

const handleMovieVideo = async (film_id) => {
  try {
    const videoList = await MovieVideoToken()
    const video = videoList.filter((video) => video.id == film_id)
    const currentVideo = video[0].videos
    const isCurrentVideo = currentVideo.filter((video) => video.site == 'YouTube' && video.official === true)
    const resultsTrailer = isCurrentVideo.filter(video => video.type === 'Trailer')
    const results = isCurrentVideo.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    if (resultsTrailer.length > 0) {
      return {
        EM: 'Ok!',
        EC: 0,
        DT: resultsTrailer,
      }
    } else {
      return {
        EM: 'Ok!',
        EC: 0,
        DT: results,
      }
    }
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong in services',
      EC: -2
    }
  }
}

const handleMovieSearch = async (pages, keyword) => {
  try {
    if (keyword === '') {
      return {
        EM: 'Please enter a keyword',
        EC: -3,
        DT: []
      }
    }
    //convert keyword
    const normalizedKeywords = normalizeString(keyword);
    //Find keywords in titles or overview
    const FindMovie = async () => {
      // Find keywords in titles
      // Movies List from Models
      const movieList = await Movies();
      const TitleByKeyword = movieList.filter((movie) =>
        movie.title && normalizeString(movie.title).includes(normalizedKeywords)
      );
      // Find keywords in overview
      const OverViewByKeyword = movieList.filter((movie) =>
        movie.title && normalizeString(movie.overview).includes(normalizedKeywords)
      );
      if (TitleByKeyword.length > 0 && OverViewByKeyword.length > 0) {
        const combinedArray = TitleByKeyword.concat(OverViewByKeyword);
        return combinedArray;
      } else if (TitleByKeyword.length > 0) {
        return TitleByKeyword;
      } else if (OverViewByKeyword.length > 0) {
        return OverViewByKeyword;
      }
      return [];
    };

    const ArrFindByKeyword = await FindMovie();
    if (!ArrFindByKeyword || ArrFindByKeyword.length === 0) {
      return {
        EM: 'No results were found',
        EC: 0,
        DT: ''
      };
    }

    const itemsPerPage = 21
      ; // Number of items per page
    const page = pages || 1; // Current page (default to 1 if not provided)
    const totalItems = ArrFindByKeyword.length; // Total number of movies
    const skip = (page - 1) * itemsPerPage; // Skip movies based on the current page

    const results = ArrFindByKeyword
      .sort((a, b) => b.vote_average - a.vote_average) // Sort by vote_average in descending order
      .slice(skip, skip + itemsPerPage); // Get the movies for the current page

    const total_pages = Math.ceil(totalItems / itemsPerPage);

    return {
      EM: 'Ok!',
      EC: 0,
      DT: {
        page,
        results,
        total_pages,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      EM: 'Something went wrong in services',
      EC: -2,
      DT: ''
    };
  }
};


module.exports = { handleMovie, handleMovieTopRate, handleMovieDiscover, handleMovieVideo, handleMovieSearch }