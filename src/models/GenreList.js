import path from 'path'
import fsReadFile from '../utils/fsReadFile';

const genreListPath = path.join(__dirname, "../config/DB/genreList.json");

const GenreList = () => {
  return fsReadFile(genreListPath)
}

export default GenreList;