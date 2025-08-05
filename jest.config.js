const nextJest = require('next/jest')

const createJestConfig = nextJest({
dir: './', // Next.js のルートディレクトリ
})

const customJestConfig = {
setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
moduleNameMapper: {
    // CSS Module や画像ファイルを読み込む際のモック
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
},
testEnvironment: 'jsdom',
}

module.exports = {
  testEnvironment: "jsdom", // ← React テストでは jsdom を指定
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // jest-dom 用のセットアップ
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // エイリアス設定（必要なら）
    },
};