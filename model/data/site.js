/*
 * HIRO. 公式サイト — 掲載データ
 * ---------------------------------------------------------
 * 写真・実績・プロフィールはこのファイルを書き換えるだけで更新できます。
 * HTMLやJSを触る必要はありません。
 *
 * ルール（制作時の約束）
 *  - クライアント名・サロン名・アーティスト名は書かない
 *  - 経験していない案件、未確定の商談は載せない
 *  - 年齢は載せない
 *  - 写真は掲載許可を取ったものだけ images/ に入れる
 */
window.SITE_DATA = {
  // true にすると、写真のない枠を「仮枠」として表示します（制作中の確認用）。
  showPlaceholders: false,

  model: {
    name: "HIRO.",
    nameKana: "ヒロ",
    instagram: "https://www.instagram.com/hiro._model/",
    instagramHandle: "@hiro._model",
    threads: "https://www.threads.com/@hiro._model",
    heroImage: "images/portrait-arms-crossed.jpg", // 縦長 4:5 推奨、長辺2000px程度
    heroPosition: "50% 30%", // 写真のどこを中心に切り抜くか（横 縦）
    heroAlt: "グレーの壁の前で腕を組む HIRO. のポートレート",
  },

  // MODEL PROFILE
  // confirmed: false の項目はサイトに表示されません。数値を確認したら true に。
  profile: [
    { label: "Name", value: "HIRO.", confirmed: true },
    { label: "Height", value: "182 cm", confirmed: true },
    { label: "Base", value: "Tokyo, Japan", confirmed: true },
    { label: "Style", value: "Clean / Korean-inspired / Athletic / Mature", confirmed: true },
    { label: "Categories", value: "Fashion / Beauty / Commercial / Lifestyle / Video", confirmed: true },
    { label: "Chest", value: "100 cm", confirmed: true },
    { label: "Waist", value: "90 cm", confirmed: true },
    { label: "Hip", value: "110 cm", confirmed: true },
    { label: "Shoes", value: "27.0 cm", confirmed: true },
  ],

  // PORTFOLIO
  // category は下の portfolioCategories の id を指定。
  // src を空にした項目は「仮枠」扱い（showPlaceholders が true のときだけ表示）。
  // position は切り抜きの中心（"横% 縦%"）。顔が切れるときに調整。
  portfolioCategories: [
    { id: "fashion", label: "Fashion / Suit" },
    { id: "beauty", label: "Hair / Beauty" },
    { id: "hotel", label: "Hotel / Night" },
    { id: "commercial", label: "Commercial / Advertising" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "fitness", label: "Fitness / Sports" },
    { id: "digitals", label: "Digitals" },
  ],
  // 並び順＝「All」での表示順。写真のないジャンルのタブは自動で隠れます。
  portfolio: [
    { category: "beauty", src: "images/portrait-arms-crossed.jpg", alt: "グレーの壁の前で腕を組む黒Tシャツのポートレート", caption: "Portrait", position: "50% 30%" },
    { category: "fashion", src: "images/trench-yokocho.jpg", alt: "新宿の横丁でトレンチコートを着た全身カット", caption: "Trench Coat — Street", position: "50% 55%" },
    { category: "fashion", src: "images/studio-suit.jpg", alt: "白背景のスタジオでネイビースーツを着たカット", caption: "Suit — Studio", position: "42% 30%" },
    { category: "beauty", src: "images/portrait-smile.jpg", alt: "ニットのノースリーブで笑う、ヘアの流れがわかるカット", caption: "Hair / Smile", position: "50% 30%" },
    { category: "fashion", src: "images/trench-wall.jpg", alt: "ダークな壁の前でトレンチコートの襟元に手をかけるカット", caption: "Trench Coat — Editorial", position: "50% 40%" },
    { category: "lifestyle", src: "images/neon-portrait.jpg", alt: "ピンクの光を背景にしたポートレート", caption: "Neon / Night", position: "50% 35%" },
    { category: "lifestyle", src: "images/city-sky.jpg", alt: "夕方の空を背景に遠くを見る黒Tシャツのカット", caption: "City / Evening", position: "50% 35%" },
    { category: "hotel", src: "images/hotel-smile.jpg", alt: "ホテルのラウンジで笑顔を見せるヘンリーネックのカット", caption: "Hotel Lounge", position: "45% 30%" },
    { category: "fashion", src: "images/studio-down-jacket.jpg", alt: "白背景のスタジオで黒のダウンジャケットを着たカット", caption: "Outerwear — Studio", position: "50% 30%" },
    { category: "lifestyle", src: "images/night-sleeveless.jpg", alt: "夜の屋外で白のノースリーブを着て首元に手を添えるカット", caption: "Night / Sleeveless", position: "50% 30%" },
    { category: "fashion", src: "images/street-fullbody.jpg", alt: "黒Tシャツにベージュのパンツで歩く全身カット", caption: "Casual — Full length", position: "50% 45%" },
    { category: "beauty", src: "images/hair-closeup.jpg", alt: "伏し目がちにヘアの質感が見えるクローズアップ", caption: "Hair — Close-up", position: "40% 35%" },
    { category: "fashion", src: "images/trench-park.jpg", alt: "緑の中で手すりに手をかけるトレンチコートのカット", caption: "Trench Coat — Park", position: "50% 35%" },
    { category: "beauty", src: "images/studio-seated.jpg", alt: "白背景で椅子に座り顎に手を添えるカット", caption: "Studio — Seated", position: "45% 30%" },
    { category: "lifestyle", src: "images/night-smile.jpg", alt: "夜景のボケを背景に笑うポートレート", caption: "Night / Smile", position: "50% 30%" },
    { category: "hotel", src: "images/hotel-corridor.jpg", alt: "ホテルの廊下を歩く全身カット", caption: "Hotel Corridor — Full length", position: "50% 40%" },
    { category: "fashion", src: "images/suit-side.jpg", alt: "ダークスーツの横向き全身カット", caption: "Suit — Side", position: "50% 40%" },
    { category: "fitness", src: "images/studio-flex.jpg", alt: "白背景で腕を曲げて力こぶを見せるカット", caption: "Athletic — Studio", position: "50% 30%" },
    { category: "fashion", src: "images/trench-lean.jpg", alt: "横丁の看板の下でコートの襟を立てるカット", caption: "Trench Coat — Alley", position: "50% 45%" },
    { category: "lifestyle", src: "images/food-expression.jpg", alt: "土鍋ごはんを頬張る表情のカット", caption: "Food / Expression", position: "50% 40%" },
    { category: "hotel", src: "images/hotel-glass.jpg", alt: "暖色の光の中でグラスを口元に運ぶカット", caption: "Hotel Bar", position: "40% 35%" },
    { category: "lifestyle", src: "images/lifestyle-cafe.jpg", alt: "海の見えるカフェの窓辺で外を眺める", caption: "Cafe / Natural light", position: "60% 40%" },
    { category: "fashion", src: "images/street-bag.jpg", alt: "トートバッグを肩にかけた街なかのカット", caption: "Casual — Street", position: "45% 40%" },
    { category: "lifestyle", src: "images/lifestyle-lake.jpg", alt: "湖畔の道標に手をかけるセットアップスタイル", caption: "Lakeside / Set-up", position: "70% 60%" },
    { category: "fashion", src: "images/night-street.jpg", alt: "夜の歩道橋で手すりに寄りかかる全身カット", caption: "Casual — Night", position: "50% 40%" },
    { category: "hotel", src: "images/hotel-stairs.jpg", alt: "ホテルの階段の手すりに寄りかかって笑うカット", caption: "Hotel Stairs", position: "45% 35%" },
    { category: "lifestyle", src: "images/night-stairs-jacket.jpg", alt: "夜の階段に座るジャケットスタイル", caption: "Night / Stairs", position: "60% 50%" },
    { category: "lifestyle", src: "images/night-sleeveless-2.jpg", alt: "夜の屋外で白のノースリーブを着て遠くを見るカット", caption: "Night / Look away", position: "50% 30%" },
    { category: "lifestyle", src: "images/lifestyle-fountain.jpg", alt: "噴水の縁に腰掛けて笑顔を見せる", caption: "Travel / Smile", position: "50% 35%" },
    { category: "digitals", src: "images/digital-front.jpg", alt: "白Tシャツ・無地背景の正面バストアップ", caption: "Digitals — Front", position: "50% 30%" },
    { category: "digitals", src: "images/digital-profile.jpg", alt: "白Tシャツ・無地背景の横顔", caption: "Digitals — Profile", position: "50% 30%" },
    { category: "digitals", src: "images/digital-back.jpg", alt: "白Tシャツ・無地背景の後ろ姿（ヘアの後ろ側）", caption: "Digitals — Back", position: "50% 30%" },
    { category: "digitals", src: "images/digital-full-front.jpg", alt: "白Tシャツ・デニムの正面全身", caption: "Digitals — Full front" },
    { category: "digitals", src: "images/digital-full-side.jpg", alt: "白Tシャツ・デニムの横向き全身", caption: "Digitals — Full side" },
    { category: "digitals", src: "images/studio-fullbody.jpg", alt: "白背景のスタジオで白Tシャツとデニムの全身", caption: "Studio — Full length", position: "50% 45%" },
  ],

  // SELECTED WORKS（クライアント名は書かない）
  // image は掲載許可のある実際の撮影写真のみ。無い場合は空のままでOK（文字だけのカードになります）。
  works: [
    {
      genre: "Commercial / Video",
      title: "家電ブランド SNS広告・ショートドラマ出演",
      detail: "ホームオーディオ製品のSNS広告動画。同じクライアントから複数回の起用。",
      body: "スーツ、私服、日常のシーンなど複数の衣装とシチュエーションで撮影。セリフのある演技や料理シーンも担当しました。",
      tags: ["SNS広告", "継続起用", "演技・セリフ"],
      image: "",
    },
    {
      genre: "Hair",
      title: "メンズヘアサロン 撮影モデル",
      detail: "サロンのスタイル撮影にモデルとして参加。",
      body: "カットとスタイリングの仕上がりを見せるヘア撮影。清潔感のある大人のメンズヘアを表現しました。",
      tags: ["ヘア撮影", "サロン作品"],
      image: "",
    },
    {
      genre: "Hair",
      title: "メンズヘア・パーマ 撮影モデル",
      detail: "パーマスタイルを中心としたヘア撮影。",
      body: "韓国系のパーマスタイルと相性のよい雰囲気を活かし、美容師の作品づくりに協力しました。",
      tags: ["パーマ", "韓国系ヘア"],
      image: "",
    },
    {
      genre: "Music Video",
      title: "ミュージックビデオ エキストラ出演",
      detail: "アーティストのMVにエキストラとして出演。",
      body: "監督、カメラマン、キャスト、エキストラが関わる映像現場で、演出の指示に沿って撮影に参加しました。",
      tags: ["MV", "エキストラ", "映像現場"],
      image: "",
    },
    {
      genre: "Beauty / Video",
      title: "ヘッドスパ PR動画出演",
      detail: "ヘッドスパサロンのサービス紹介動画に出演。",
      body: "施術を受ける様子を撮影。自然な表情とリアクションで、サービスの心地よさを伝えました。",
      tags: ["PR動画", "サービス体験"],
      image: "",
    },
    {
      genre: "Beauty",
      title: "メンズ美容サロン 撮影モデル",
      detail: "メンズ眉毛サロンなど美容関連の撮影モデル。",
      body: "身だしなみと清潔感が伝わるビジュアルで、メンズ美容サービスのPRに協力しました。",
      tags: ["メンズ美容", "眉毛サロン"],
      image: "",
    },
  ],

  // COMPOSITE（Google ドライブ：リンクを知っている全員が閲覧可 を確認済み）
  // composite.pdf を差し替えると、サイトのボタンとダウンロードがそのまま新しい版になります。
  composite: {
    file: "composite.pdf",
    cover: "images/composite-cover.jpg",
    downloadName: "HIRO_composite.pdf",
    updated: "2026.10",
    driveFileId: "1s03sIemUtw8nRpF2t6ALB3kPFyRgXw0w", // 予備（file が無いときに使用）Drive「コンポジット｜HIRO.（2026年10月版）.pdf」
  },

  // MY JOURNEY（時系列）
  journey: [
    { title: "30代半ばでモデルに挑戦", body: "会社員として働きながら、モデル活動をスタート。" },
    { title: "無償のヘアカットモデルから", body: "最初の一歩は、サロンのヘアカットモデル。撮影の基本を現場で学びました。" },
    { title: "メンズ美容・サロン撮影へ", body: "ヘア、パーマ、眉毛、ヘッドスパと、美容ジャンルの撮影経験を重ねています。" },
    { title: "SNS広告・MVなど映像へ", body: "SNS広告では同じクライアントから続けて起用いただき、MVの現場も経験しました。" },
    { title: "継続して選ばれるモデルへ", body: "一つひとつの現場で信頼を積み重ね、次の依頼につながる仕事を目指しています。" },
  ],

  // BOOKING / CONTACT
  contact: {
    // フォーム送信先（FormSubmit）。受信: g.hiro.e9@gmail.com
    // 初回送信時に届く確認メールの「Activate Form」を押すと受信が始まります。
    // 有効化後に届くランダム文字列のアドレスに差し替えると、メールアドレスをページに出さずに済みます。
    formEndpoint: "https://formsubmit.co/ajax/g.hiro.e9@gmail.com",
    genres: ["ヘア・美容", "メンズ美容（眉毛・スパ等）", "ファッション・アパレル", "Web・SNS広告", "映像・MV", "ライフスタイル・旅行", "その他"],
  },
};
