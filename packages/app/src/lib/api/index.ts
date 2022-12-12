export type CardData = { title: string; excerpt: string; link: string, slug?: string };

export type ArticleMetaData = {
    metadata: { title: string; excerpt: string; index: number };
};
export type Article = {
    fileName: string,
    category: string;
} & ArticleMetaData;
export type Category = { title: string; excerpt: string; };
export type CategoryImport = { category: Category };
const articles = import.meta.globEager('../**/*.md');
const categories = import.meta.globEager('../categories/**/index.ts');

interface Api {
    getCategories(): CardData[];

    getCategory(slug: string): CardData | undefined;

    getArticles(): Article[];

    getArticle(name: string, category: string): Article | undefined;

    getArticlesByCategory(category: string): CardData[];
}

/**
 * An api object that exposes the API methods for fetching posts.
 */
export const api: Api = {
    getCategories(): CardData[] {
        return Object.entries(categories)
            .map(([key, c]) => {
                const category = (c as CategoryImport).category
                const slug = key.split('/')[2]
                return {
                    title: category.title,
                    excerpt: category.excerpt,
                    link: `/articles/${slug}`,
                    slug
                }
            });
    },
    getCategory(slug: string): CardData | undefined {
        return this.getCategories()
            .find((c) => c?.slug?.toLowerCase() === slug.toLowerCase())
    },
    getArticles(): Article[] {
        return Object.entries(articles).map(([path, article]) => {
            const parts = path.split('/');
            const _article = article as ArticleMetaData;
            return {
                metadata: _article.metadata,
                fileName: `${parts[3].split(".")[0]}`,
                category: parts[2]
            };
        });
    },
    getArticle(name: string, category: string): Article | undefined {
        return this.getArticles().find(
            (p: Article) =>
                p.fileName.toLowerCase() === name.toLowerCase() &&
                p.category.toLowerCase() === category.toLowerCase()
        );
    },
    getArticlesByCategory(categorySlug: string): CardData[] {
        return this.getArticles()
            .filter((p: Article) => p.category.toLowerCase() === categorySlug.toLowerCase())
            .sort((a, b) => a.metadata.index - b.metadata.index)
            .map((article: Article) => ({
                title: article.metadata.title,
                excerpt: article.metadata.excerpt,
                link: `/articles/${categorySlug}/${article.fileName}`,
            }));
    }
};
