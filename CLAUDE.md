# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

まず [README.md](README.md) を読む。何であり、どう更新するかはそちらが持つ。
ここには、それだけでは伝わらない事情だけを書く。

## 絶対にやってはいけないこと

1. **`sw.js` の activate から接頭辞の絞り込みを外さない。**
   `keys.filter(k => k.startsWith('pgf-calc2-') && ...)` の `startsWith` を消すと、
   Cache Storage は住所単位で共有されるため、**現場で使用中の本番アプリのオフライン保存を消す**。
   これは実際に洗い出された経路で、複製時に潰した唯一の重大な穴。
2. **本番リポジトリ（`arimaxjpn/pgf-calc`、ローカルは `DEVELOP/pgf`）に一切触らない・push しない。**
   本番と分けてある理由がそれ。

## 落とし穴

- **改行コード**：`pgf.html` は CRLF。編集ツールが LF で書き戻すと、1行直しただけで
  全行差分（826行）になる。`sed` で対象行だけ書き換え、コミット前に `git diff --numstat` で確認する
- **入力欄 ID は動的生成**。`generateGrid()` がグリッドを丸ごと作り直すため、
  それより前に `getElementById` しても取れない。フッターの `val_corr` だけは静的
- **`doFlip()` の退避・復元**が最も壊れやすい。入力欄を増やすならこのリストにも追加が要る
- **最終確認は iPhone 実機**。このアプリの修正履歴の大半は iOS Safari 固有の表示崩れ

## 応対ルール

- 「？」で終わる質問（「動いてる？」）は修正実行の依頼ではない。現状確認と提案までで止める
- 「修正して」「直して」「変更して」と明示された時だけコードを変える
- ダイは非プログラマ。操作を頼む時は中学生でも分かる言葉で書き、専門用語には短い説明を添える
