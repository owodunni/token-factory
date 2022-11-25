import type { PageLoadEvent } from './$types';

export async function load({ params }: PageLoadEvent) {
	const post = await import(`../[post]/${params.post}.md`);
	console.log(post.default);
	const content = post.default;

	return {
		content
	};
}
