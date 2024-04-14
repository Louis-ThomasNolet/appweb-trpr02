import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "revue code",
  description: "revue tp2",
  base:'/appweb-trpr02/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Louis-Thomas Nolet', link: '/louis-thomas-nolet' },
          { text: 'Alexis Champoux', link: '/alexis-champoux' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
