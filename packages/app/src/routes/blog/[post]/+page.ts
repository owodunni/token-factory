import type { PageLoadEvent } from './$types';

export async function load(load: PageLoadEvent) {
	const { fileName } = load.data;
	const post = await import(`../../../lib/posts/${fileName}.md`);
	const content = post.default;

	return {
		content
	};
}
