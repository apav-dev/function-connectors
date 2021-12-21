import { fetchMovieList, fetchMovieDetailsById, fetchMovieImagesById } from "./api.ts";
import { MovieDetailsResponse, MovieEntity, MovieImagesResponse } from "./types.ts";

const fetchMovies = async (stateString: string): Promise<string> => {
  let state;
  
  const inputJson = JSON.parse(stateString);
  state = inputJson.pageToken;

  // state will be undefined the first time the function is called
  if(!state){
    state = {
      nextPage: 1,
      movieList: [],
      movieIndex: 0,
    }
  } else {
    state = JSON.parse(state.pageToken);
  }

  if (state.movieIndex === 0){
    const movieListResponse = await fetchMovieList(state.nextPage);

    if(movieListResponse.movie_results){
      state.movieList = movieListResponse.movie_results;
      state.nextPage = state.nextPage + 1;
    } else {
      return JSON.stringify({ data: {}})
    }
  }

  // deno-lint-ignore camelcase
  const imdb_id = state.movieList[state.movieIndex].imdb_id;
  const movieDetailsResponse: MovieDetailsResponse = await fetchMovieDetailsById(imdb_id);
  const movieImagesResponse: MovieImagesResponse = await fetchMovieImagesById(imdb_id);
  const data: MovieEntity  = {...movieDetailsResponse, ...movieImagesResponse};

  return JSON.stringify({data, nextPageToken: JSON.stringify(state)})
}

export default fetchMovies;