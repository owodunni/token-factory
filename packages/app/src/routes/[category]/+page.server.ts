import type { Category } from '$lib/api';
import type { PageLoadEvent } from './$types';
import { api } from '$lib/api';

export async function load(load: PageLoadEvent): Promise<Category | undefined> {
	const { category } = load.params;
	return api.getCategory(category);
}
