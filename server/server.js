var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ffmpeg = require('ffmpeg');
var fs = require('fs');


var port = 8000;

app.use(express.static(path.join(__dirname, "public")));

try {
  var process = new ffmpeg(__dirname + '/assets/sample.mp4'); // use your own video file here
  process.then(function (video) {
    // Callback mode
    video.fnExtractFrameToJPG(__dirname + '/assets/frames/', {
      frame_rate: 1,
      number: null, //capture total frame
      file_name: 'my_frame_%t_%s'
    }, function (error, files) {
      if (!error)
        console.log('Frames: ' + files);
    });
  }, function (err) {
    console.log('Error: ' + err);
  });
} catch (e) {
  console.log(e);
}

io.on('connection', (socket) => {
  console.log('new connection made');


fs.readFile(__dirname + '/assets/frames/my_frame_1521406229879_1920x1080_1.jpg', function(err, image){
socket.emit('image', { image: true, buffer: image });
});

//sending one file works; but sending all the files in the directory don't
/*
fs.readdir(__dirname + '/assets/frames/', function (err, filenames) {
  if (err) {
    onError(err);
    return;
  }
  filenames.forEach(function (filename) {
    fs.readFile(__dirname + '/assets/frames/' + filename, 'utf-8', function (err, content) {
      if (err) {
        console.log(err);
        return;
      }
      socket.emit('image', {image: true, buffer: content.toString('base64')});
    });
  });
});
*/

})

server.listen(port, () => {
  console.log("Listening on port " + port);
})
;
