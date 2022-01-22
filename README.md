# lab-assignment

B3の学生が行う研究室配属希望調査のサイト開発

## 環境構築(macOS向け)

### 使用したパッケージとそのバージョン

|  パッケージ  |  バージョン  |
| ---- | ---- |
|  `yarn`  |  1.22.10  |
|  `node`  |  v12.22.7 |
|  `firebase`  |  9.6.1  |

> `firebase`に関しては，8系と9系でコードの書き方が大きく異なるので，注意すること

### 事前に入れておいてほしいもの

- Homebrew
  - インストールしていない方は[こちら](https://brew.sh/index_ja)から
- git

### Nodeのインストール

#### 1. Homebrewからnodebrewをインストール

- こちらは必須ではないが，Nodeのパッケージ管理が楽になるのでおすすめ
- 直接NodeをインストールしてもOK
- すでにNodeが入っている場合は削除すること

```bash
# Nodeが入っているかを確認
which node

# brewでインストールしていれば，以下のコマンドで削除
brew uninstall node

# brewのアップデート
brew update

# nodebrewのインストール
brew install nodebrew

# nodebrewのバージョンの確認
nodebrew -v
```

- 環境変数を追加する
  - bashを使っている方は，`zshrc`の部分を`bash_profile`に変更

```bash
# zshrcを開く
- vi ~/.zshrc
```

- 以下の環境変数を`zshrc`もしくは`bash_profile`の末尾に追加

```bash
export PATH=$HOME/.nodebrew/current/bin:$PATH
```

- `zshrc`もしくは`bash_profile`を更新

```bash
# zshrcを更新
source ~/.zshrc
```

- 最後にセットアップして完了
  - **これをやらないと，nodebrewが使えない**

```bash
# セットアップ
nodebrew setup
```

#### 2. nodebrewからNodeをインストール

- 今回の開発ではNode 12系を使用しているので，こちらをインストール
  - 12系であれば，どのバージョンでもOK

```bash
# nodebrewでインストールできるNodeのバージョンを確認
nodebrew ls-remote

# Nodeのインストール
nodebrew install-binary v12.22.17

# インストールしたバージョンの確認
nodebrew ls

# 使いたいバージョンを指定
nodebrew use v12.22.7

# nodeのバージョンを確認
node -v
npm -v
```

### yarnのインスール

- 今回の開発では，`npm`ではなく，`yarn`でパッケージ管理を行った
- npmとyarnの違いは[こちら](https://qiita.com/Hai-dozo/items/90b852ac29b79a7ea02b)から

> Cloud Functionsでは，`npm`を使用しているが，  
> パッケージをインストールしなくていいので，基本的に`npm`は使用しない

```bash
# npm 経由でyarnをインストール
npm install -g yarn

# yarnがインストールできたかを確認
yarn -v
```

### Firebase Toolsのインストール

- Firebaseを使用した開発ではほぼ必須のCLIなので，こちらもインストール
- このパッケージをインストールすると，Firebaseの操作用コマンドが使用できる

```bash
npm install -g firebase-tools
```

### ローカルホストでの立ち上げ

#### 1. リポジトリのクローン

- `git`にて，リポジトリのクローンを行う

```bash
git clone <このリポジトリのSSH URL>
```

#### 2. 開発環境の用意

- `yarn`にて，今回使用するパッケージのインスール

```bash
# ディレクトリの移動
cd lab-assignment

# パッケージのインストール
yarn install
```

- プロジェクトのルートディレクトリに`.env`の作成
  - `.env`は環境変数用のファイル
  - gitにて管理を行いたくない情報を管理している
  - **`.env`は先輩から引き継ぐようにしてください**

```bash
# .envの作成
touch .env
```

```bash
# .envの中身
FIREBASE_API_KEY='xxxx'
FIREBASE_AUTH_DOMAIN='xxxx'
FIREBASE_PROJECT_ID='xxxx'
FIREBASE_STORAGE_BUCKET='xxxx'
FIREBASE_MESSAGE_SENDER_ID='xxxx'
FIREBASE_APP_ID='xxxx'
ADMIN_EMAIL='xxxx'
ADMIN_ROOT_URL='xxxx'
ADMIN_SUB_URL='xxxx'
CRYPT_JS_PASSPHRASE='xxxx'
```

- 開発環境のFirebaseプロジェクトの選択
  - Firebaseのプロジェクトに関しては，後述

```bash
# Firebaseにログイン
firebase login

# プロジェクトの選択
firebase use lab-assignment-dev
```

#### 3. ローカルホストを起動

- 起動できたら，ブラウザにて`localhost:3000`にアクセス

```bash
# このコマンドでローカルホストの起動ができる
yarn dev

# 停止したい場合は以下を押下
control + C
```

- 以下の画面が出てこれば完了！

![image](https://user-images.githubusercontent.com/49640294/150631310-09a23a79-2f52-4403-aa20-65d58efbe601.png)

## Firebaseプロジェクトの管理

### Firebaseとは?

- Googleが提供しているモバイル・Webアプリケーション向けのプラットフォーム
- 全ての機能がGoogleのインフラ技術に支えられており、簡単にアプリケーションの開発を行うことができる

### プロジェクトの管理

- Firebase コンソール：<https://console.firebase.google.com/>
- `nislab.root@gmail.com`のアカウントでGoogleにログインを行えば，操作可能
  - 操作する場合は，ネットワーク班の担当者から共有してもらうこと

|  環境名  |  プロジェクト名  |  URL  |  備考  |
| ---- | ---- | ---- | ---- |
|  本番環境  |  lab-assignment-prod  | ・https://assign.nislab.io <br/> ・https://lab-assignment-prod.web.app  |  B3の学生がデータを入力する際に使用  |
|  開発環境  |  lab-assignment-dev  |  https://lab-assignment-dev.web.app  |  ローカルホストと開発環境用に使用 |

### 今回使用したサービスの説明

#### [Authentication](https://firebase.google.com/docs/auth?hl=ja)

- 認証/認可を行うサービス
- 今回はメールアドレス認証のみを有効にした（プロバイダによる認可は未実装というか必要なし）

#### [FireStore](https://firebase.google.com/docs/firestore?hl=ja)

- Firebaseにおけるデータベース用のサービス
- NoSQLであり，コレクションとドキュメントという概念でDBを管理
- インデックスやセキュリティルール(権限)の設定も可能
  - 詳しくは公式ドキュメントにて

#### [Hosting](https://firebase.google.com/docs/hosting)

- 研究室配属希望調査のデプロイ先
- デプロイは`Github Actions`が担当しているので，気にしなくて良い
- URLの末尾スラッシュの設定をオフにしている
  - 例：<https://assign.nislab.io/user>

#### [Cloud Functions](https://firebase.google.com/docs/functions)

- Firebaseで使用されるサーバレスのバックエンドフレームワーク
- クライアントからHTTPリクエストを呼ぶことで，呼び出すことが可能
- 主にメールの送信と，ユーザの作成・削除にて使用
- **Cloud Functiosのみデプロイの仕方が違うので，注意**

```bash
# デプロイ先のプロジェクトを選択（本番環境であれば，lab-assignment-prod）
firebase use lab-assignment-dev

# Cloud Functionsのみデプロイ
firebase deploy --only functions
```

## gitの操作

### 運用図

![image](https://user-images.githubusercontent.com/49640294/150639343-f035a79f-0ad7-4fef-b40f-cb3cb5b93bc8.png)

### ブランチの種類と運用ルール

#### `main`

- 本番環境用のブランチ
- `develop`からのみマージされるように運用すること
  - **`feature`からマージしないように**

#### `develop`

- 開発環境用のブランチ
- `feature`ブランチからのみマージされるように運用すること

#### `feature/#(チケット番号)`

- 開発者がコードの修正・追加を行うブランチ
- **必ず`develop`ブランチから切るようにすること**
- PRを投げる際に，`develop`に向けるように注意すること
  - デフォルトは`main`のため
- チケット番号はIssueの番号を参照にすること

### 開発時の流れ

#### 1. `main`ブランチにて，pullを行い最新のリポジトリを取得

```bash
# mainにチェックアウト
git checkout main

# mainの最新状態を取得
git pull origin main
```

#### 2. `develop`ブランチにて，pullを行い最新のリポジトリを取得

```bash
# developにチェックアウト
git checkout develop

# developの最新状態を取得
git pull origin develop
```

#### 3. `develop`ブランチから`feature`ブランチを切り，作業を開始

```bash
# developにチェックアウト
git checkout -b feature/#(チケット番号)

# 作業を開始
```

#### 4. 作業が終了したら，作業内容をリモートリポジトリにpush

```bash
# 作業が終了した場合
git add .
git commit -m "#(チケット番号) 修正内容のコメントを記述"
git push origin feature/#(チケット番号)
```

#### 5. PRを投げる

- Githubの「Pull Request」にて，自身が開発を行なった`feature`ブランチから`develop`ブランチに向けて，PRを投げる
- その後，すぐに「Merge Pull Request」を押さないようにする
  - Github Actionsが走るまで，ライムラグがあるため
- Github Actionsが終われば，レビューとテストを実施
- 問題がなければ，「Merge Pull Request」を押下し，`develop`にマージ
- その後，Github Actionsが走り，開発環境にデプロイを行う

#### 6. 本番反映

- Githubの「Pull Request」にて，`develop`ブランチから`main`ブランチに向けて，PRを投げる
- 問題がなければ，「Merge Pull Request」を押下し，`main`にマージ
- その後，Github Actionsが走り，本番環境にデプロイを行う

## Github Actions

## 研究室配属希望調査の開発

### ファイル構造

### URL構造

> This is a temporary URL and the domain will be changed upon release.

- **Develop env**
  - <https://lab-assignment-dev.web.app/>
  - Deployed when the pull request for **develop** branch is closed
  
- **Production env**
  - <https://assign.nislab.io/>
  - <https://lab-assignment-prod.web.app/>
  - Deployed when the pull request for **main** branch is closed

### Routing

|  Resource  |  HTTP Method  |  Notes  |
| ---- | ---- | ---- |
|  /  |  GET  |  Top and Login Page  |
|  /form  |  GET  |  Contact Page  |
|  /user  |  GET  |  Confirm Score Page  |
|  /user/edit  |  GET  |  Score Edit Page  |

### FireStoreのコレクション設計

作成したテーブルは以下の2つ

<details>
  <summary>users</summary>

  ```json
  "users": {
    "docmentID": {
      "id": "1316200127",
      "name": "中井",
      "mail": "ctwf0127@mail4.doshisha.ac.jp",
      "password": "pass",
      "status": "test",
      "isActive": true,
      "isPointAssigned": false,
      "group": 1,
      "rank": 39,
      "isGraduate": true,
      "point": {
        "ksato": "3",
        "tkoita": "1",
        ...
      },
      "year": "2022",
    },
    "docmentID": {
      "id": "1316200149",
      "name": "田中",
      "mail": "ctwf0149@mail4.doshisha.ac.jp",
      "password": "pass",
      "status": "prod",
      "isActive": true,
      "isPointAssigned": false,
      "group": 1,
      "rank": 1,
      "isGraduate": true,
      "point": {
        "ksato": "3",
        "tkoita": "1",
        ...
      },
      "year": "2022",
    },
    ...
  }
  ```

</details>
<details>
  <summary>teachers</summary>

  ```json
  "teachers": {
    "docmentID": {
      "id": "ksato",
      "name": "佐藤 健哉",
      "lab": "ネットワーク情報システム研究室",
    },
    "docmentID": {
      "id": "tkoita",
      "name": "小板 隆浩",
      "lab": "ネットワーク情報システム研究室",
    },
    ...
  }
  ```

</details>

<br />

> documentIDはFirebaseにデータを追加した際，自動的に付与されるID  
> teachersの`id`に関しては，運用ルール(Notion参照)に従って保存すること