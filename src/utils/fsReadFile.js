const fsReadFile = (DATA_PATH)=>{
  const fs = require("fs");
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

export default fsReadFile;