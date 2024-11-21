import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-use-x',
  description: 'An unofficial Vue 3 reusable utilities',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Intro', link: '/intro' },
    ],

    sidebar: [
      {
        text: 'Modal',
        items: [
          { text: 'useModal', link: '/use-modal' },
          { text: 'useRefModal', link: '/use-ref-modal' },
        ],
      },
      // {
      //   text: 'Query',
      //   items: [
      //     { text: 'useQueryContext' },
      //   ],
      // },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/shunnNet/vue-use-x' },
    ],
  },
})
