import movieServices from '../services/movieServices'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter'
const getMovieTrending = async (req, res) => {
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

const getMovieTopRate = async (req, res) => {
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

const getMovieDiscover = async (req, res) => {
  try {
    if (!req.query.genre) {
      return res.status(400).json({
        EM: "Not found genre prams", //error message,
        EC: -2, //error code
        DT: '', //data
      })
    }
    if (req.query.genre === '') {
      return res.status(400).json({
        EM: 'Not found that genre id', //error message,
        EC: -2, //error code
        DT: '', //data
      })
    }
    let covertInput = capitalizeFirstLetter(req.query.genre)
    let data = await movieServices.handleMovieDiscover(req.query.page, covertInput)
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

module.exports = { getMovieTrending, getMovieTopRate, getMovieDiscover }