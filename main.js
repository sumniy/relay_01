var http = require('http');
var template = require('./lib/template.js');
var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'boostcamp',
  database: 'diary'
});
db.connect();

var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded( {extended : false}));
app.use('/', express.static(__dirname + '/public'));
app.use('/diary', express.static(__dirname + '/public'));
app.use('/diary/update', express.static(__dirname + '/public'));

app.get('/', function (request, response) {
  var body = `
  <h1 class="mb-0">Lee
          <span class="text-primary">Sumin</span>
        </h1>
        <div class="subheading mb-5">Sungbuk-gu, Seoul 010-5132-9469
          <a href="mailto:name@email.com">sumniy94@gmail.com</a>
        </div>
        <p class="lead mb-5">부스트 캠프 릴레이 1팀</p>
        <div class="social-icons">
          <a href="https://www.linkedin.com/in/%EC%88%98%EB%AF%BC-%EC%9D%B4-64912b198/">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/sumniy">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.instagram.com/sumniy94/?hl=ko">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
  `;
  var html = template.HTML(body);
  response.send(html);
})

app.get('/create', function (request, response) {
  var body = template.post();
  var html = template.HTML(body);
  response.send(html);
})

app.post('/createProcess', function (request, response) {
  db.query(`INSERT INTO diarys (title, content) VALUES(?, ?)`,
  [request.body.title, request.body.content],
  function(err) {
    response.redirect('/diary');
  })
})

app.get('/diary', function (request, response) {
  console.log('recieved request to look up diary at ' + Date().toString());
  db.query(`SELECT * FROM diarys ORDER BY updated DESC`, function (err, diarys) {
    var list = template.list(diarys);
    var html = template.HTML(list);
    response.send(html);
  })
})

app.get('/diary/update/:postId', function (request, response) {
  var filterdId = request.params.postId;
  db.query(`SELECT * FROM diarys WHERE id=?`, [filterdId], function (err, diary) {
    var body = template.update(diary);
    var html = template.HTML(body);
    response.send(html);
  })
})

app.post('/diary/updateProcess', function (request, response) {
  console.log('update process start where id = ' + request.body.id);
  db.query(`UPDATE diarys SET title = ?, content = ? WHERE id = ?`, 
  [request.body.title, request.body.content, request.body.id],
  function(err) {
    console.log('update complete where id = ' + request.body.id);
    response.redirect('/diary');
  });
});

app.post('/diary/deleteProcess', function(request, response) {
  console.log('delete process start where id = ' + request.body.id);
  db.query(`DELETE FROM diarys WHERE id = ?`, [request.body.id], function(err) {
    console.log('delete complete where id = ' + request.body.id);
    response.redirect('/diary');
  });
})

var server = http.createServer(app);
server.listen(3000);