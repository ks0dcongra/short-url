# 短網址產生器

首頁畫面上有一個表單，使用者可以在表單輸入原始網址，如 https://www.google.com；送出表單之後，畫面會回傳格式化後的短網址，如 ```https://shortUrl5566.herokuapp.com/6y7UP```


## 功能列表

1. 可以在首頁輸入欲縮短之網址
2. 畫面呈現短網址
3. 短網址可進行一鍵複製之動作
4. 瀏覽器貼上複製完後的短網址，如果是本地端的話:```localhost:3000/https://your-project-name.herokuapp.com/OXOXO```

## 先決條件
* Windows系統

### 安裝

1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/ks0dcongra/short-url.git
```

2.進入專案資料夾

```
cd short-url
```
3.下載express
```
npm install express
```

4.下載mongoose套件
```
npm install mongoose
```

5.開啟程式
```
npm run 
```

6.打開瀏覽器網址列輸入 http://localhost:3000/

終端顯示 `Express is running on http://localhost:3000` 即啟動完成，請至[http://localhost:3000](http://localhost:3000)開始使用程式

## 系統截圖
![可輸入網址之首頁](https://github.com/ks0dcongra/short-url/blob/master/public/00.jpg)
![短網址轉換完之顯示頁](https://github.com/ks0dcongra/short-url/blob/master/public/1.jpg)


## 使用工具
- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [MongoDb](https://www.mongodb.com/atlas/database) - 資料庫
- [Mongoose](https://mongoosejs.com/) - 在MongoDB和Express Web應用程序框架之間創建連接
- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎

## Acknowledgments
* AlphaCamp
