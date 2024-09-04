// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'app/',
  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW', },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '',
      titleTemplate: `%s%separator%siteName`,
      templateParams: {
          siteName: 'SITE_NAME',
          separator: ' - ',
      },
      meta: [
          { name: 'format-detection', content: 'telephone=no' }, // IOS problem
          { 'http-equiv': 'x-rim-auto-match', content: 'none' }, // IOS problem
          { name: 'description', content: `%s%separator%siteName` },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon.ico' },
      ],
      script: [
        { innerHTML: `console.log('ENV: ${process?.env?.ENV}, ${process?.env?.NODE_ENV}')` },
      ],
    },
  },

  runtimeConfig: {
    public: {
      ENV: process.env.ENV || '',
      API_HOST: process.env.API_HOST || '/openapi',
    }
  },

/*
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'zh-TW',
        file: 'zh-TW.json',
      },
      {
        code: 'en-US',
        file: 'en-US.json',
      },
    ],
    langDir: 'locales/',
    defaultLocale: 'zh-TW',
    // detectBrowserLanguage: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'all',
      fallbackLocale: 'zh-TW',
    },
    compilation: {
      strictMessage: false,
    }
  },
*/

/*
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
*/
})
