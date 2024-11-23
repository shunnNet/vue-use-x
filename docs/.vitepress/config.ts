import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-use-x',
  description: 'An unofficial Vue 3 reusable utilities',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Intro', link: '/get-started' },
    ],
    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'Get Started',
        link: '/get-started',
      },
      {
        text: 'Modal',
        link: '/modal',
        items: [
          { text: 'useModal', link: '/modal/use-modal' },
          { text: 'useRefModal', link: '/modal/use-ref-modal' },
        ],
      },
      {
        text: 'Common',
        link: '/common',
        items: [
          {
            text: 'Context',
            items: [
              { text: 'createContext', link: '/common/context/createContext' },
              { text: 'ensureInjection', link: '/common/context/ensureInjection' },
            ]
          },
          {
            text: 'Toggle',
            items: [
              { text: 'withToggleRefAsync', link: '/common/toggle/withToggleRefAsync' },
            ]
          },
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
