import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import linkHeadings from 'rehype-autolink-headings';
import headingSlugs from 'rehype-slug';

const rehypePlugins = [
  headingSlugs,
  [
    linkHeadings,
    {
      behavior: 'prepend',
      content: {
        type: 'element',
        tagName: 'span',
        properties: {
          className: [
            'opacity-20 hover:opacity-60 text-base font-bold inline-block align-middle relative -mt-1'
          ]
        },
        children: [
          {
            type: 'text',
            value: '#'
          }
        ]
      }
    }
  ]
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: ['.md', '.svx'],
      rehypePlugins: rehypePlugins
    }),
    preprocess({ postcss: true })
  ],

  kit: {
    adapter: adapter()
  },

  extensions: ['.svelte', '.md', '.svx']
};

export default config;
