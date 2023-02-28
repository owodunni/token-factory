import type { PageLoadEvent } from './$types';

export async function load(load: PageLoadEvent) {
  const { fileName, category, metadata } = load.data;
  const article = await import(`../../../../lib/categories/${category}/${fileName}.md`);
  const content = article.default;

  let data = null;

  if (category === 'ethereum' && fileName === 'eip-1559') {
    const res = await load.fetch(
      //?filter=(firstBlock>'16682030' && block < '16682051' && distance > 3)"
      'https://jardoole.xyz/api/collections/txs/records?filter=%28firstBlock>16682030%26%26distance>3%26%26block<16682051%29'
    );
    data = await res.json();
  }

  return {
    content,
    title: metadata.title,
    ...(data && { data })
  };
}
