import fs from 'fs-extra';
import xlsx from 'xlsx';

// 定義選項
const inputFilePath = './tools/i18n/雲豹育成官網_i18n.xlsx'; // 輸入的 Excel 文件路徑
const outputDirPath = './app/locales/'; // 輸出的 JSON 目錄路徑
const useSheetAsNamespace = false; // 若為 true，將分頁名稱作為命名空間；若為 false，直接合併所有鍵值

async function convertExcelToJson() {
  try {
    // 讀取 Excel 文件
    const workbook = xlsx.readFile(inputFilePath)

    // 確認文件夾存在，否則新建
    await fs.ensureDir(outputDirPath)

    // 初始化語言資料物件
    const languages = {}

    // 迭代所有工作表
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
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

      // 解析 Excel 行數據
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

convertExcelToJson()