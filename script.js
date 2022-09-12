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

function analyzeCotoha(text) {
  // API にテキストボックスの内容を送信
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/api");
  xhr.setRequestHeader("Content-Type", "application/json");
  let request = JSON.stringify({
    app_id: "ce8ced86115c72e8118336134e7fd0879f3a6569e6797c55d22d75c845b66e00",
    sentence: text,
    type: "default",
  });
  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      //JSONに変換
      var json = JSON.parse(this.responseText);

      processReturn(json);
    }
  };
  xhr.open("POST", "https://api.ce-cotoha.com/api/dev/nlp/v1/parse");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  xhr.send(request);
}
function processReturn(json) {
  // ここで結果を表示する
  let wl = json.word_list[0];
  let result = "";
  console.log(wl);
  for (let i = 0; i < wl.length; i++) {
    let word = wl[i];
    let surface, wordType, pronounce;
    [surface, wordType, pronounce] = word;
    result += "[" + wordType + "]";
  }
  document.getElementById("output").innerHTML = result;
}
