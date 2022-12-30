<script lang="ts">
	import ArticleList from './ArticleList.svelte';
	import { api } from '../api';
	import Divider from './Divider.svelte';
</script>

<Divider />
<ArticleList articles={api.getCategories()} showExcerpt={false} layout={'grid'} />
<Divider />
<ArticleList articles={api.getArticlesByCategory()} />
<Divider />
