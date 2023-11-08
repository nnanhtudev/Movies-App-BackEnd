import path from 'path'
import fsReadFile from '../utils/fsReadFile';

const movieVideoPath = path.join(__dirname, "../config/DB/videoList.json");

const MovieVideoToken = () => {
  return fsReadFile(movieVideoPath)
}

export default MovieVideoToken;