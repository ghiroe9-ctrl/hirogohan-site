"""Instagram フィード投稿スクリプト（GitHub Actions から実行）

instagram/posts/*.json のうち status が "approved" で posted_at が無いものを、
Instagram API（Instagram Login 方式）で投稿する。
画像は GitHub Pages 上の公開URLを使う（https://ghiroe9-ctrl.github.io/hirogohan-site/instagram/img/...）。

必要な環境変数（GitHub Secrets）:
  IG_ACCESS_TOKEN : Instagram API の長期アクセストークン
  IG_USER_ID      : Instagram のユーザーID（数字）
"""
import glob
import json
import os
import sys
import time
import urllib.parse
import urllib.request

API = "https://graph.instagram.com/v21.0"
SITE = "https://ghiroe9-ctrl.github.io/hirogohan-site/"
TOKEN = os.environ.get("IG_ACCESS_TOKEN", "")
USER = os.environ.get("IG_USER_ID", "")


def call(path, params=None, method="GET"):
    params = dict(params or {})
    params["access_token"] = TOKEN
    data = urllib.parse.urlencode(params).encode()
    url = f"{API}/{path}"
    if method == "GET":
        url += "?" + data.decode()
        req = urllib.request.Request(url)
    else:
        req = urllib.request.Request(url, data=data, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        raise SystemExit(f"API error {e.code} on {path}: {body}")


def wait_public(url, tries=30):
    """GitHub Pages に画像が公開されるまで待つ（最大 tries×10秒）"""
    for _ in range(tries):
        try:
            with urllib.request.urlopen(url, timeout=20) as r:
                if r.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(10)
    return False


def wait_container(cid):
    for _ in range(30):
        st = call(cid, {"fields": "status_code,status"})
        if st.get("status_code") == "FINISHED":
            return
        if st.get("status_code") == "ERROR":
            raise SystemExit(f"container error: {st}")
        time.sleep(5)
    raise SystemExit("container not ready")


def publish(post):
    images = [SITE + p.lstrip("/") for p in post["images"]]
    for u in images:
        if not wait_public(u):
            raise SystemExit(f"image not public yet: {u}")
    caption = post["caption"]
    if len(images) == 1:
        c = call(f"{USER}/media", {"image_url": images[0], "caption": caption}, "POST")
        wait_container(c["id"])
        creation_id = c["id"]
    else:
        children = []
        for u in images:
            c = call(f"{USER}/media", {"image_url": u, "is_carousel_item": "true"}, "POST")
            wait_container(c["id"])
            children.append(c["id"])
        c = call(f"{USER}/media", {"media_type": "CAROUSEL", "children": ",".join(children), "caption": caption}, "POST")
        wait_container(c["id"])
        creation_id = c["id"]
    pub = call(f"{USER}/media_publish", {"creation_id": creation_id}, "POST")
    media_id = pub["id"]
    info = call(media_id, {"fields": "permalink"})
    return media_id, info.get("permalink", "")


def main():
    if not TOKEN or not USER:
        print("IG_ACCESS_TOKEN / IG_USER_ID が未設定のため、投稿をスキップしました")
        return 0
    done = 0
    for path in sorted(glob.glob("instagram/posts/*.json")):
        with open(path, encoding="utf-8") as f:
            post = json.load(f)
        if post.get("status") != "approved" or post.get("posted_at"):
            continue
        print("posting", path)
        media_id, permalink = publish(post)
        post["status"] = "posted"
        post["posted_at"] = time.strftime("%Y-%m-%dT%H:%M:%S%z")
        post["media_id"] = media_id
        post["permalink"] = permalink
        with open(path, "w", encoding="utf-8") as f:
            json.dump(post, f, ensure_ascii=False, indent=2)
            f.write("\n")
        print("posted:", permalink)
        done += 1
    print(f"{done} post(s) published")


if __name__ == "__main__":
    sys.exit(main())
