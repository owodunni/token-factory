import type { PageLoadEvent } from './$types';

export async function load(load: PageLoadEvent) {
  const { fileName, category, metadata } = load.data;
  const article = await import(`../../../../lib/categories/${category}/${fileName}.md`);
  const content = article.default;

  return {
    content,
    title: metadata.title
  };
}
