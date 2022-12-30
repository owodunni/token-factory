<script lang="ts">
	import ArticleList from './ArticleList.svelte';
	import { api } from '../api';
	import Divider from './Divider.svelte';
</script>

<Divider />
<article class="prose my-4">
	<h2>Categories</h2>
</article>
<ArticleList articles={api.getCategories()} showExcerpt={false} layout={'grid'} />
<Divider />
<article class="prose my-4">
	<h2>Articles</h2>
</article>
<ArticleList articles={api.getArticlesByCategory()} />
<Divider />
