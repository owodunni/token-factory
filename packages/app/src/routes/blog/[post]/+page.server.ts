import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from './$types';
import { isPost } from './util';

export async function load(load: PageLoadEvent) {
	const { post } = load.params;

	if (!isPost(post)) throw error(404, `Post ${post} not found`);

	return {
		content: post.default
	};
}
