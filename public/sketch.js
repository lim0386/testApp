var textfield;
var output;
var output2;
var finalText;
var socket;
var textFinal;
let speechRec;

var rCho, rJung, rJong;
var sentence = []; //문장
var sepWord=[];
var t;

function setup() {
  rCho = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  rJung = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  rJong = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];



  data = "";
  createCanvas(750, 1335);
  textfield = select("#haninput");
  textfield.input(newTyping);
  output = select('#output');
  output2 = select('#output2');

  speechRec = new p5.SpeechRec('ko-KR', gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);
  function gotSpeech() {
    // console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      // output.html(said);
      // console.log(said);
      // sendText(said);
      output2.html(said);
      speak(said);
    }
    // speak();
  }


  socket = io.connect('http://localhost:3000');
//   socket = io.connect('http://165.194.69.166:3000');//Office Mac
  // socket = io.connect('http://192.168.0.112:3000');//Macbook Air
//   socket = io.connect('http://192.168.0.101:3000');//Home Mac
  // socket = io.connect('http://124.49.164.19:3000');//Office Windows
  socket.on('message', function(data) {

output2.html(data);
    }
  );
}

function newTyping() {
  output.html(textfield.value());
  finalText = textfield.value();
  sendText(finalText);
}

function speak(textString){
  var cho, jung, jong;
  sentence = textString;
  console.log(sentence);
  for (var i = 0; i < sentence.length-1; i++) {
    if (sentence[i] === " ") {
      
    }else {
      var nTmp = sentence[i].charCodeAt(0) - 0xac00;
      
      jong = nTmp % 28; // 종성
      jung = ((nTmp - jong) / 28) % 21; // 중성
      cho = ((nTmp - jong) / 28 - jung) / 21; // 초성
     
      sendText(rCho[cho]);
      sendText(rJung[jung]);
      sendText(rJong[jong]);
    }
  }
}

function sendText(textString){
  var data = textString;
  socket.emit('message', data);
}