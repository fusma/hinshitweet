// API にテキストボックスの内容を送信して、結果を表示する
function sendAPI() {
  console.log("sendAPI() called");
  // テキストボックスの内容を取得
  let text = document.getElementById("input").value;

  // API にテキストボックスの内容を送信
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/api");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    // 結果を表示
    document.getElementById("result").innerHTML = xhr.responseText;
  };
  let request = JSON.stringify({
    id: "dj00aiZpPWZ5am1tSWNteUU4TyZzPWNvbnN1bWVyc2VjcmV0Jng9ZDI-",
    jsonrpc: "2.0",
    method: "jlp.maservice.parse",
    params: {
      q: text,
    },
  });
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    }
  };
  xhr.open("POST", "https://jlp.yahooapis.jp/MAService/V1/parse", true);
  xhr.send(request);
}
