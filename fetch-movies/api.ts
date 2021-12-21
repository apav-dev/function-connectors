import axiod from "https://deno.land/x/axiod/mod.ts";
import {  MovieDetailsResponse,  MovieImagesResponse,  MovieListResponse } from "./types.ts";

const imdbUrl = 'https://movies-tvshows-data-imdb.p.rapidapi.com/';

export const fetchMovieListForYear = (page: number) => fetchFromIMDB<MovieListResponse>({type: 'get-movies-byyear', page, year: 1999});

export const fetchMovieDetailsById = (imdb: string) => fetchFromIMDB<MovieDetailsResponse>({type: 'get-movie-details', imdb });

export const fetchMovieImagesById = (imdb: string) => fetchFromIMDB<MovieImagesResponse>({ type: 'get-movies-images-by-imdb', imdb });

const fetchFromIMDB = async <T>(params: Record<string, string | number>): Promise<T> => {
  const res = await axiod.get(
    imdbUrl, 
    {
      params, 
      headers: { 
        'x-rapidapi-key': '27f4f4ca62msh90ed282d36cc7b1p151551jsnf92287dd39b1' }
      }
  );

  return res.data;
}