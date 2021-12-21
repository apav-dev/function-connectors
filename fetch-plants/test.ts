import fetchPlants from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";

Deno.test("Test fetchPlants", async () => {
  // let nextPageToken: string | undefined = undefined;
  const nextPageToken = {
    pageToken: undefined
  }

  do {
    const nextPageTokenStr = JSON.stringify(nextPageToken);

    const res: string = await fetchPlants(nextPageTokenStr);
    const resObj = JSON.parse(res);
    nextPageToken = JSON.stringify(resObj.nextPageToken);

    console.log(`Fetched Plant ${resObj.data.id}`);
    resObj.nextPageToken && console.log(`Next Page ${resObj.nextPageToken.nextPage}`);
  } while (nextPageToken);
})