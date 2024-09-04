# 1. package.json

## 1. 本機啟動： npm run dev:local ; 需要本機https: npm run dev:local-https。
## 2. update-i18n-xx 若有多國語才需要。
   以下皆配合多國語才安裝，不需要可移除。
    fs-extra
    googleapis
    xlsx

# 2. https/* 本機啟動 https 的依賴。
# 3. app/composables/fetchProxy.js 
  使用 useFetch & $fetch 的代理API，不同環境打API，總要加前墜 如: useFetch(`${API_HOST}/news`)。
  每次寫相當不便，於是套用此 use_FetchProxy('/news')，這樣就會自動抓取 .env.* 檔裡的 API_HOST 參數了。
  並且永遠以 Nuxt Server 出發去打API，不會發生client端請求而被拒絕的問題。