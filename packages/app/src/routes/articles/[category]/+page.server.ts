import type { CardData } from '$lib/api';
import type { PageLoadEvent } from './$types';
import { api } from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load(load: PageLoadEvent): Promise<CardData> {
	const { category } = load.params;
	const data = api.getCategory(category);
	if (!data) throw error(404, `Category '${category}' not found`);
	return data;
}
