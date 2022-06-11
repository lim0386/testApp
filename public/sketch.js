var output;
var finalText;
var socket;
let speechRec;

function setup() {
  data = "";
  createCanvas(750, 1335);
  output = select('#output');
  socket = io.connect('http://localhost:3000'); //서버컴퓨터의 주소와 포트를 적어주어야 하는데, 학교 서버는 일단 잘 안되네요!
  //socket = io.connect('http://203.252.219.43:3000');

  socket.on('message', function(data) {
    }
  );

  speechRec = new p5.SpeechRec('ko-KR', gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);
  function gotSpeech() {
    console.log(speechRec);
    if (speechRec.resultValue) {
      let said = speechRec.resultString;
      output.html(said);
      console.log(said);
      sendText(said);
    }
  }
}
// function mousePressed() {
//   getAudioContext().resume();
// }

function sendText(textString) {
  var data = textString;
  socket.emit('message', data);
}
