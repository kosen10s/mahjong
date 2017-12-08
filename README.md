## Required
- npm >= 5.5.0
- Node.js 8.9.x

## Setup
1. Clone this repository
2. Run `npm install`

## Run dev-server
`npm run start`

## Deploy to gh-pages
`sh ./tools/deploy.sh`

## 新しい成績の追加方法
`src/assets/records` ディレクトリに新しい成績データをjsonで追加してください。
ファイル名は任意です。

jsonデータは、以下のフォーマットで記述してください

```
{
  "nth": 1, // 必須。何回目の開催かを記載してください。
  "date": "2017-10-28", // 任意
  "score": {  // score Objectの各keyは参加者のIDになっています。表記ゆれがあると別の参加者として扱われるので注意してください。
    "Homura": 100,
    "Madoka": 50,
    "Sayaka": -50,
    "Kyouko": -100
  }
}
```

