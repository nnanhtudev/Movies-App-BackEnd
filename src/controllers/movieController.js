import movieServices from '../services/movieServices'

const getMovieTrending = async (req, res) =>{
  try {
    let data = await movieServices.handleMovie(req.query.page)
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: data.DT, //data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }
}

const getMovieTopRate = async (req, res) =>{
  try {
    let data = await movieServices.handleMovieTopRate(req.query.page)
    return res.status(200).json({
      EM: data.EM, //error message,
      EC: data.EC, //error code
      DT: data.DT, //data
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      EM: 'error from server', //error message,
      EC: -1, //error code
      DT: '', //data
    })
  }
}

module.exports = { getMovieTrending, getMovieTopRate }