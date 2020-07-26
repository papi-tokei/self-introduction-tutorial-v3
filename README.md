## 概要

自己紹介ページ作成チュートリアル用リポジトリ
バックエンドとフロントエンドの両方のサンプルプログラム

### backendディレクトリ

API GatewayとDynamoDB、Lambdaを作成するCDKファイル群

### 使い方

```
$ cd backend
$ yarn install
```

backend/bin/backend.tsフィアル内のTODO2箇所を修正する

```
# Cloudformationファイルを出力
$ yarn cdk synth

# クラウド環境との差分を確認
$ yarn cdk diff

# 環境をデプロイ
$ yarn cdk deploy
```

環境を削除する場合は、下記コマンドを実施する

```
# 環境を削除
$ yarn cdk destroy
```

### frontendディレクトリ

Vue.js+Vuetifyの構成
