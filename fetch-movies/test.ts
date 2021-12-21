import fetchMovies from './mod.ts';

Deno.test("fetchMovies", async () => {
  const stateStringObj= { pageToken: '' };

  do {
    const responseString = await fetchMovies(JSON.stringify(stateStringObj));
    const responseObj = JSON.parse(responseString);

    console.log("Movie Details: " + JSON.stringify(responseObj.data));
    console.log("Next Page Token: " + responseObj.nextPageToken);

    stateStringObj.pageToken = responseObj.nextPageToken;

  } while (JSON.parse(stateStringObj.pageToken).nextPage < 3) 
})