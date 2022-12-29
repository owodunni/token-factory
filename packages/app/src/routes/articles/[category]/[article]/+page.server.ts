import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from './$types';
import { api } from '$lib/api';
import type { Article } from '$lib/api';

export async function load(load: PageLoadEvent): Promise<Article> {
  const { category, article } = load.params;

  const postContent = api.getArticle(article, category);

  if (!postContent) throw error(404, `Article '${category}/${article}' not found`);

  return postContent;
}
