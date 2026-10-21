# Instagram 自動投稿の仕組み

- `instagram/posts/*.json` … 投稿の原稿（`status: "approved"` のものが投稿される）
- `instagram/img/...` … 投稿する画像（JPEG）。GitHub Pages の公開URLとして Instagram API に渡す
- `.github/workflows/instagram-post.yml` … main に原稿が入ると自動で `instagram/post.py` を実行して投稿する
- 投稿後は同じ JSON に `posted_at` と `permalink` が書き込まれる（二重投稿しない）

## 流れ
1. Claude が画像と原稿を作り、ブランチを push して Pull Request を開く
2. ひろさんが内容を見て、GitHub の「Merge pull request」を押す（＝承認）
3. 数分以内に GitHub Actions が投稿し、結果を JSON に記録する

## 必要な設定（GitHub の Settings → Secrets and variables → Actions）
- `IG_ACCESS_TOKEN` … Instagram API の長期アクセストークン（60日ごとに更新）
- `IG_USER_ID` … Instagram のユーザーID
