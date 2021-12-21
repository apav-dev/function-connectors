import { sleep as denoSleep } from "https://deno.land/x/sleep/mod.ts";

export async function sleep() {
  await denoSleep(2);
  return;
}