import express from "express";
import handleUserToken from '../controllers/userController'
import handleMovie from '../controllers/movieController'
const router = express.Router();

const initAPIRouter = (app) => {
  // router.get("/userToken", userToken);
  router.get('/user', handleUserToken.getUserToken)
  router.get('/movies/trending', handleMovie.getMovieTrending)
  router.get('/movies/top-rate', handleMovie.getMovieTopRate)
  router.get('/movies/discover', handleMovie.getMovieDiscover)
  router.post('/movies/video', handleMovie.postMovieVideo)
  router.post('/movies/search', handleMovie.postMovieSearch)
  return app.use("/api/v1", router);
};

export default initAPIRouter;
