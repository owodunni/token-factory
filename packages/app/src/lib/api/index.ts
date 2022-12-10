export type ArticleMetaData = {
	metadata: { title: string; excerpt: string; slug: string; index: number };
	category: string;
};
export type Article = { fileName: string } & ArticleMetaData;
export type Category = { title: string; excerpt: string; slug: string };
export type CategoryImport = { category: Category };
const articles = import.meta.globEager('../**/*.md');
const categories = import.meta.globEager('../categories/**/index.ts');

interface Api {
	getCategories(): Category[];
	getCategory(slug: string): Category | undefined;

	getArticles(): Article[];

	getArticle(name: string, category: string): Article | undefined;

	getArticlesByCategory(category: string): Article[] | undefined;
}

/**
 * An api object that exposes the API methods for fetching posts.
 */
export const api: Api = {
	getCategories(): Category[] {
		return Object.values(categories).map((c) => (c as CategoryImport).category);
	},
	getCategory(slug: string): Category | undefined {
		return this.getCategories().find((c) => c.slug.toLowerCase() === slug.toLowerCase());
	},
	getArticles(): Article[] {
		return Object.entries(articles).map(([path, article]) => {
			const parts = path.split('/');
			const _article = article as ArticleMetaData;
			return {
				metadata: _article.metadata,
				fileName: `${_article.metadata.slug}`,
				category: parts[2]
			};
		});
	},
	getArticle(name: string, category: string): Article | undefined {
		return this.getArticles().find(
			(p: Article) =>
				p.metadata.slug.toLowerCase() === name.toLowerCase() &&
				p.category.toLowerCase() === category.toLowerCase()
		);
	},
	getArticlesByCategory(categorySlug: string): Article[] | undefined {
		return this.getArticles()
			.filter((p: Article) => p.category.toLowerCase() === categorySlug.toLowerCase())
			.sort((a, b) => a.metadata.index - b.metadata.index);
	}
};
