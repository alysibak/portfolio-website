import type { APIRoute } from "astro";
import { commandOutputs } from "../lib/data";

// The resume as plain text, for `curl alysibak.vercel.app/resume.txt`. Same
// text the shell prints for `cat resume`.
export const GET: APIRoute = () =>
  new Response(`${commandOutputs.resume}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
