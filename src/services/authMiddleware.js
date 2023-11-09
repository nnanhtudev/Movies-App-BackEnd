import UserToken from '../models/UserToken'

const authMiddleServices = async (token) => {
  try {
    let dataUserToken = await UserToken()
    const user = dataUserToken.find((entry) => entry.token === token);
    if (!user) {
      return (
        {
          EM: 'Unauthorized',
          EC: -1
        }
      );
    }
    return ({
      EC: 0
    })
  } catch (error) {
    console.log(error)
    return {
      EM: 'Something went wrong in services',
      EC: -2
    }
  }
}

module.exports = authMiddleServices