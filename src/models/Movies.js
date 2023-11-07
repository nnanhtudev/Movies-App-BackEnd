import path from 'path' // Để xử lý đường dẫn
import fsReadFile from '../utils/fsReadFile';

const movieList = path.join(__dirname, "../config/DB/movieList.json");

const Movies = () => {
  return fsReadFile(movieList)
}

export default Movies;