# Google Workspace Extension for Gemini CLI（WSL対応フォーク）

[English README](./README.md)

> このリポジトリは [gemini-cli-extensions/workspace](https://github.com/gemini-cli-extensions/workspace) の**非公式フォーク**です。  
> 主に WSL 環境での OAuth 認証時の使い勝手を改善するための変更を含みます。

Google Workspace Extension for Gemini CLI は、Google Workspace アプリの機能をコマンドラインから利用できるようにします。  
ターミナルを離れずに、ドキュメント、スプレッドシート、プレゼンテーション、メール、チャット、カレンダーイベントを扱えます。

## このフォークの目的

このフォークは、WSL 環境で発生しやすい OAuth 認証時のブラウザ起動問題を改善するために作成しました。

## 主な変更点

- WSL 環境向けブラウザ起動フォールバック  
  - `wslview` を優先  
  - 失敗時に `cmd.exe` へフォールバック
- 手動認証モード対応  
  - `WORKSPACE_OAUTH_MANUAL=1` で認証URLを表示し、手動認証可能
- WSL 環境での認証フロー安定化に関する軽微な改善

## 前提条件

この拡張を利用する前に、Google アカウントにログイン済みである必要があります。

## インストール

`gemini extensions install https://github.com/nayasuda/gemini-workspace-wsl`

## チーム利用時の推奨

安定性と再現性のため、`main` ブランチ追従ではなく、**固定リリースタグ**の利用を推奨します。

例:
- `v0.0.5-wsl1`

## 使い方

インストール後、Google Workspace アプリと連携した操作を実行できます。例:

- 新しい Google ドキュメントを作成  
  > 「タイトル 'My New Doc' で Google ドキュメントを作成し、`# My New Document\n\nThis is a new document created from the command line.` を本文に入れて」

- 今日の予定を確認  
  > 「今日のカレンダー予定を教えて」

- Google Drive でファイル検索  
  > 「Google Drive で 'my-file.txt' を探して」

## WSL（Windows Subsystem for Linux）での利用

このフォークには WSL 環境向けの対応が含まれています。認証時は以下の順で Windows 側ブラウザ起動を試みます。

1. `wslview`
2. `cmd.exe` フォールバック

### 必要パッケージ

```bash
sudo apt install wslu
```

### 手動認証モード

ブラウザ起動に失敗する場合、または手動でURLを開きたい場合は次を設定してください。

```bash
export WORKSPACE_OAUTH_MANUAL=1
```

この設定時は、ブラウザを自動起動せず、認証URLをCLIに表示します。

## コマンド例

### スケジュール取得
コマンド: `/calendar:get-schedule [date]`  
今日または指定日の予定を表示します。

### Drive検索
コマンド: `/drive:search <query>`  
指定クエリで Google Drive 内を検索します。

## デプロイ

この拡張のインフラを独自運用したい場合は、[GCP Recreation Guide](./docs/GCP-RECREATION.md) を参照してください。

## リソース

- [Documentation](./docs/index.md): 利用可能ツールの詳細
- [GitHub Issues](https://github.com/nayasuda/gemini-workspace-wsl/issues): バグ報告・機能要望

## 重要なセキュリティ注意: 間接的プロンプトインジェクション

言語モデルに未検証データを与えると、間接的プロンプトインジェクションのリスクがあります。  
MCP サーバーと接続したエージェントツールは広範なAPIアクセスを持つため、意図しない操作につながる可能性があります。

この MCP サーバーは、あなたのGoogleアカウントおよび共有データに対して読み取り・変更・削除権限を持ちます。

- 信頼できないツールと併用しない
- 未検証の入力（メール本文・ドキュメント本文など）をそのままモデル文脈に渡さない
- 実行された操作は必ず確認し、意図通りか検証する

## コントリビュート

コントリビューション歓迎です。詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

## 法的情報

- License: [Apache License 2.0](./LICENSE)
- Terms of Service: https://policies.google.com/terms
- Privacy Policy: https://policies.google.com/privacy
- Security Policy: [SECURITY.md](./SECURITY.md)

## Upstream

元リポジトリ: [gemini-cli-extensions/workspace](https://github.com/gemini-cli-extensions/workspace)
