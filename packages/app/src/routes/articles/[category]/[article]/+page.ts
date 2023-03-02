import type { PageLoadEvent } from './$types';
import type { ProbabilityDocument, TxListResult } from '@token-factory/seeker';

export async function load(load: PageLoadEvent) {
  const { fileName, category, metadata } = load.data;
  const article = await import(`../../../../lib/categories/${category}/${fileName}.md`);
  const content = article.default;

  if (category === 'ethereum' && fileName === 'eip-1559') {
    const [txs, cdf] = await Promise.all([
      load.fetch(
        //?filter=(firstBlock>'16682030' && block < '16682051' && distance > 3)"
        'https://jardoole.xyz/api/collections/txs/records?filter=%28firstBlock>16682030%26%26distance>3%26%26block<16682051%29'
      ),
      load.fetch<ProbabilityDocument>(
        'https://jardoole.xyz/api/collections/documents/records/g30checuyx7khyh'
      )
    ]);

    console.log(txs, cdf);

    return {
      content,
      title: metadata.title,
      data: {
        txs: (await txs.json()) as TxListResult,
        cdf: (await cdf.json()) as ProbabilityDocument
      }
    };
  }

  return {
    content,
    title: metadata.title
  };
}
