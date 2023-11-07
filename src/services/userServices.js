import UserToken from "../models/UserToken";

const handleUserToken = async ()=>{
  try {
    let user = await UserToken()
    if (user) {
        return {
          EM: 'Ok!',
          EC: 0,
          DT: ''
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

module.exports = { handleUserToken };