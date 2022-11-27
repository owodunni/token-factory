import type { PageLoadEvent } from './$types';

export async function load(load: PageLoadEvent) {
	const post = await import(`../[post]/${load.params.post}.md`);
	const content = post.default;

	return {
		content
	};
}
