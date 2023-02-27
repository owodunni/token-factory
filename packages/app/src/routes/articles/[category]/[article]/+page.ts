import type { PageLoadEvent } from './$types';

export async function load(load: PageLoadEvent) {
  const { fileName, category, metadata } = load.data;
  const article = await import(`../../../../lib/categories/${category}/${fileName}.md`);
  const content = article.default;

  let data = null;

  if (category === 'ethereum' && fileName === 'eip-1559') {
    const res = await load.fetch(
      'https://jardoole.xyz/api/collections/txs/records?sort=-firstBlock&filter=(block < 16682051)&perPage=40'
    );
    data = await res.json();
  }

  return {
    content,
    title: metadata.title,
    ...(data && { data })
  };
}
