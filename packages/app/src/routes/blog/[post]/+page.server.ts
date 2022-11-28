import { error } from '@sveltejs/kit';
import type { PageLoadEvent } from './$types';
import { api } from '$lib/api';
import type { Post } from '$lib/api';

export async function load(load: PageLoadEvent): Promise<Post> {
	const { post } = load.params;

	const postContent = api.getPost(post);

	if (!postContent) throw error(404, `Post ${post} not found`);

	return postContent;
}
