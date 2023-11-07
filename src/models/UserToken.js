import path from 'path'
import fsReadFile from '../utils/fsReadFile';

const userTokenPath = path.join(__dirname, "../config/DB/userToken.json");

const UserToken = () => {
  return fsReadFile(userTokenPath)
}

export default UserToken;