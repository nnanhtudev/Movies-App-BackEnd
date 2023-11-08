import movieServices from '../services/movieServices'
import { capitalizeFirstLetter } from '../utils/converInput'

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

const postMovieVideo = async (req, res) => {
  try {
    if (!req.query.film_id) {
      return res.status(400).json({
        EM: "Not found film_id params", //error message,
        EC: -2, //error code
        DT: '', //data
      })
    }
    let dataMovieVideo = await movieServices.handleMovieVideo(req.query.film_id)
    if (dataMovieVideo.DT === undefined) {
      return res.status(404).json({
        EM: "Not found video", //error message,
        EC: -3, //error code
        DT: '', //data  
      })
    }
    return res.status(200).json({
      EM: dataMovieVideo.EM, //error message,
      EC: dataMovieVideo.EC, //error code
      DT: dataMovieVideo.DT, //data
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

const postMovieSearch = async (req, res) => {
  try {
    let dataMovieSearch = await movieServices.handleMovieSearch(req.query.pages, req.query.keyword)
    return res.status(200).json({
      EM: 'Ok', //error message,
      EC: 0, //error code
      DT: dataMovieSearch.DT, //data
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
module.exports = { getMovieTrending, getMovieTopRate, getMovieDiscover, postMovieVideo, postMovieSearch }