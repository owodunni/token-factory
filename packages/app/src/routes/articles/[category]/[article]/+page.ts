import type { PageLoadEvent } from './$types';

export async function load(load: PageLoadEvent) {
	const { fileName, category } = load.data;
	const article = await import(`../../../../lib/categories/${category}/${fileName}.md`);
	const content = article.default;

	return {
		content
	};
}
