# PGF Calc 2

PGF Calc Pro（本番）の複製版。**勾配率の算出機能を試すための場所**。
本番は現場で毎日使われているため触らない。試すことは全部こちらでやる。

| | URL |
|---|---|
| 本番（現場で使用中・触らない） | https://arimaxjpn.github.io/pgf-calc/pgf.html |
| この版 | https://arimaxjpn.github.io/pgf-calc2/pgf.html |

## いま何ができるか

複製直後のため、**機能は本番と同一**。勾配率の算出は未実装。

狙いは、いま人が手入力している勾配（％）を、レベルの読値2点と距離から算出できるようにすること。

```
勾配% = (読値A − 読値B) ÷ (距離m × 1000) × 100
```

これは本番の目標値計算 `目標値 = 基準読値 − 距離 × 1000 × (勾配 ÷ 100)` の逆関数。
算出した勾配を入れ直すと、測った読値Bが目標値として再現されることが受け入れ条件になる。

## 更新のしかた

```bash
git add . && git commit -m "変更内容" && git push
```

**`pgf.html` か `manifest.json` を変えたら `sw.js` の `CACHE_NAME` を必ず上げる**
（`pgf-calc2-v1` → `v2`）。上げないと iPhone に新しい版が届かない。

## 本番と違うところ（意図した差分のみ）

`pgf.html` の `<title>` と `apple-mobile-web-app-title` / `manifest.json` の `name`・`short_name`・`id` /
`sw.js` の `CACHE_NAME` と activate の絞り込み。それ以外は本番とバイト一致。

## 本番を壊さないための制約

`sw.js` の activate は **自分の接頭辞 `pgf-calc2-` のキャッシュだけ**を消す。

```js
keys.filter(k => k.startsWith('pgf-calc2-') && k !== CACHE_NAME)
```

**この絞り込みを外してはいけない。** Cache Storage はパスではなく**住所（origin）単位**で共有される。
絞らないと、このアプリを起動しただけで本番のオフライン保存（`pgf-calc-v5`）を消し、
**現場で電波が弱いときに本番が開かなくなる。**

アプリの構造・配色・計算式の詳細は本番リポジトリの `CLAUDE.md` と `HANDOVER.md` を見る。
判断の経緯は `~/XPRESSIO/KAIRAN/` の 2026-08-18 の板。
