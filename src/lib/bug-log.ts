import { getCollection } from "astro:content";

/** Published posts, newest first. Drafts show only in `npm run dev`. */
export async function publishedPosts() {
  const posts = await getCollection("bug-log", (p) => import.meta.env.DEV || !p.data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
