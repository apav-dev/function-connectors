import axiod from "https://deno.land/x/axiod/mod.ts";
import { Species, SpeciesListResponse } from "./types.ts";

const token = 'MCewWxRjhKPXKFbXTL5i';
const floraUrl = 'https://api.floracodex.com/api/v1/species'

export async function fetchSpeciesPage(page: number): Promise<SpeciesListResponse> {
  const res = await axiod.get(floraUrl, { params: { page, token } });

  return res.data;
}

export async function fetchSpecies(id: string): Promise<Species> {
  const res = await axiod.get(
    `${floraUrl}/${id}`, {
    params: {
      token
    }
  });

  return res.data;
}