// API にテキストボックスの内容を送信して、結果を表示する
function sendAPI() {
  console.log("sendAPI() called");
  // テキストボックスの内容を取得
  let text = document.getElementById("input").value;
  //空文字列なら処理を打ち切る
  if (text == "") {
    return;
  }
  analyzeGoo(text);
}

function analyzeGoo(text) {
  // API にテキストボックスの内容を送信
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/api");
  xhr.setRequestHeader("Content-Type", "application/json");
  let request = JSON.stringify({
    app_id: "ce8ced86115c72e8118336134e7fd0879f3a6569e6797c55d22d75c845b66e00",
    sentence: text,
    //pos_filter: "名詞|動詞|形容詞|副詞|助詞|助動詞",
  });
  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      //JSONに変換
      var json = JSON.parse(this.responseText);

      processReturn(json);
      //document.getElementById("output").innerHTML = this.responseText;
    }
  };
  xhr.open("POST", "https://labs.goo.ne.jp/api/morph");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(request);
}

function processReturn(json) {
  const symbols = [
    "括弧",
    "句点",
    "読点",
    "空白",
    "Symbol",
    "YearMonth",
    "MonthDay",
    "HourMinute",
    "MinuteSecond",
    "PreHour",
    "PostHour",
  ];
  const ignores = ["英語接尾辞", "動詞接尾辞", "形容詞接尾辞", "接続接尾辞"];
  const conversion = {
    動詞語幹: "動詞",
    形容詞語幹: "形容詞",
    独立詞: "感動詞",
    連用詞: "副詞",
    判定詞: "助動詞",
    格助詞: "助詞",
    終助詞: "助詞",
    引用助詞: "助詞",
    連用助詞: "助詞",
  };
  // 全要素を連結する
  let wl = json.word_list[0];
  for (let i = 1; i < json.word_list.length; i++) {
    wl = wl.concat(json.word_list[i]);
    console.log(i, wl);
  }
  console.log(json);
  let result = "";
  for (let i = 0; i < wl.length; i++) {
    let word = wl[i];
    let surface, wordType, pronounce;
    [surface, wordType, pronounce] = word;
    console.log(surface);
    if (ignores.includes(wordType)) {
      continue;
    }
    if (symbols.includes(wordType)) {
      result += surface;
    } else {
      if (wordType in conversion) {
        console.log(conversion[wordType]);
        addword = conversion[wordType];
      } else {
        addword = wordType;
      }
      addtext = "[" + addword + "]";
      result += addtext;
    }
  }
  document.getElementById("output").innerHTML = result;
}
//ツイートボタンの実装
function tweet() {
  let text = document.getElementById("output").innerHTML;
  if (text == "") {
    return;
  }
  text += "%0a%0a%23品詞暴言メーカー%20%0ahttps://fusma.github.io/hinshitweet/";

  let url = "https://twitter.com/intent/tweet?text=" + text;
  //新規ウィンドウでツイートボタンを開く
  window.open(url, "_blank");
}

//クリップボードにコピー
function copy2clipboard() {
  let text = document.getElementById("output").innerHTML;
  if (text == "") {
    return;
  }
  let textarea = document.getElementById("output");
  textarea.select();
  document.execCommand("copy");
}
