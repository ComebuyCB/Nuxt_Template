# 關於此模板的說明:

## app/*
  關於 Nuxt 的頁面相關，將移至此資料夾下運作。
  <br>

  #### app/composables/fetchProxy.js
    使用 useFetch & $fetch 的代理API，不同環境打API，總要加前墜 如: useFetch(`${API_HOST}/news`)。
    每次寫相當不便，於是套用此 use_FetchProxy('/news')，這樣就會自動抓取 .env.* 檔裡的 API_HOST 參數了。
    並且永遠以 Nuxt Server 出發去打API，不會發生client端請求而被拒絕的問題。

  #### app/server/api/proxy/[...path].js
    API代理，任何後端API連結加上 '/api/proxy'，會用 API_HOST 參數代替打後端 API。
    ( 搭配 app/composables/fetchProxy.js 裡的 use_FetchProxy() 或 use_$fetchProxy() 使用。 )
    ( 圖片路徑可配合 app/utils/index.js 裡的 _apiUrl() 使用。 )

## https/*
    本機啟動 https 的依賴。

## tools/i18n/*
    有使用多國語才需要，指令打 npm update-i18n-ex，
    該檔案內的excel轉換至 app/locale/* 生成 .json檔。
    以便 nuxt/i18n 套件使用。

## package.json
  #### 1. 本機啟動
    npm run dev:local
    npm run dev:local-https (本機需要https時)

  #### 2. update-i18n-xx (多國語)
    以下套件配合多國語，不需要可移除。
    fs-extra
    googleapis
    xlsx
