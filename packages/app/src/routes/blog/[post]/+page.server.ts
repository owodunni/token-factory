import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from './$types';

const posts: string[] = Object.keys(import.meta.glob('./*.md', { eager: true }));

export async function load({ params }: PageLoadEvent) {
	const { post } = params;

	const exists = !!posts.find((p) => {
		return p.endsWith(`${post}.md`);
	});

	if (!exists) throw error(404, `Post ${post} not found`);

	return {
		post
	};
}
