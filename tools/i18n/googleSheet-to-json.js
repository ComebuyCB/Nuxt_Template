import fs from 'fs-extra';
import { google } from 'googleapis';

// 定義選項
const credentialsPath = './tools/i18n/your-google-credentials.json'; // Google API 憑證檔案路徑 (https://console.cloud.google.com/ 1.建專案、2.建立憑證[服務帳戶] 3.服務帳戶[新增金鑰])
const spreadsheetKey = 'your-google-excel-sheet-key'; // Google Sheet 的 Spreadsheet ID
const outputDirPath = './app/locales/'; // 輸出的 JSON 目錄路徑
const useSheetAsNamespace = true; // 若為 true，將分頁名稱作為命名空間；若為 false，直接合併所有鍵值

async function convertGoogleSheetToJson() {
  try {
    // 授權與認證
    const auth = await authorize()
    const sheets = google.sheets({ version: 'v4', auth })

    // 取得試算表數據
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetKey
    })

    const SheetNames = sheetInfo.data.sheets.map(sheet => sheet.properties.title)
    
    // 確認文件夾存在，否則新建
    await fs.ensureDir(outputDirPath)

    // 初始化語言資料物件
    const languages = {}

    // 迭代所有工作表
    for (const sheetName of SheetNames) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetKey,
        range: sheetName,
      })

      const jsonData = response.data.values
      const headers = jsonData[0]

      // 根據標題創建語言物件
      headers.slice(1).forEach(lang => {
        if (!languages[lang]) {
          languages[lang] = useSheetAsNamespace ? {} : {}
        }
        if (useSheetAsNamespace && !languages[lang][sheetName]) {
          languages[lang][sheetName] = {}
        }
      })

      // 解析 Google Sheets 行數據
      jsonData.slice(1).forEach(row => {
        const key = row[0]
        headers.slice(1).forEach((lang, i) => {
          const value = row[i + 1]

          if (value !== undefined && value !== "") {
            if (useSheetAsNamespace) {
              languages[lang][sheetName][key] = value
            } else {
              languages[lang][key] = value
            }
          }
        })
      })
    }

    // 輸出語言 JSON 文件
    for (const lang in languages) {
      const filePath = `${outputDirPath}/${lang}.json`

      // 檢查文件是否存在，如果存在則刪除
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath)
      }

      // 寫入新的 JSON 文件
      await fs.writeJson(filePath, languages[lang], { spaces: 2 })
    }

    console.log('轉換完成')
  } catch (error) {
    console.error('轉換過程中發生錯誤:', error)
  }
}

// 授權與認證
async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
  return await auth.getClient()
}

convertGoogleSheetToJson()