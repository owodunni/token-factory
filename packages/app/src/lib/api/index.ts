export type PostMetadata = { metadata: { title: string; excerpt: string } };
export type Post = { fileName: string } & PostMetadata;
const posts = import.meta.globEager('../posts/*.md');

interface Api {
	getPosts(): Post[];
	getPost(name: string): Post | undefined;
}

/**
 * An api object that exposes the API methods for fetching posts.
 */
export const api: Api = {
	getPosts(): Post[] {
		return Object.values(posts).map((post: unknown) => {
			const _post = post as PostMetadata;
			return {
				metadata: _post.metadata,
				fileName: `${_post.metadata.title}`
			};
		});
	},
	getPost(name: string): Post | undefined {
		return this.getPosts().find((p: Post) => p.metadata.title.toLowerCase() === name.toLowerCase());
	}
};
