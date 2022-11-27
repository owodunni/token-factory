import { posts } from './[post]';

export async function load() {
	const pages = posts.map((p) => {
		const name = p.replace(/\.[^/.]+$/, '').slice(2);

		return { route: `/blog/${name}`, name: name };
	});
	return {
		posts: pages
	};
}
