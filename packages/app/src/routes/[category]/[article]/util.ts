export const posts: string[] = Object.keys(import.meta.glob('./*.md', { eager: true }));

export function isPost(name: string): boolean {
	return !!posts.find((p) => p.endsWith(`${name}.md`));
}
