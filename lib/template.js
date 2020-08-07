module.exports = {
  HTML: function (body) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Diary - Lee Sumin</title>

  <!-- Bootstrap core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet"/>

  <!-- Custom fonts for this template -->
  <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet">
  <link href="vendor/fontawesome-free/css/all.min.css" type="text/css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/resume.css" type="text/css" rel="stylesheet">

</head>

<body id="page-top">
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
    <a class="navbar-brand js-scroll-trigger" href="#page-top">
      <span class="d-block d-lg-none">Lee Sumin</span>
      <span class="d-none d-lg-block">
        <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="img/profile.jpg" alt="">
      </span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="/">소개</a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="/create">글쓰기</a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="/diary">다이어리</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container-fluid p-0">

    <section class="resume-section p-3 p-lg-5 d-flex align-items-center">
      <div class="w-100">
        ${body}
      </div>
    </section>
  
  </div>

  <!-- Bootstrap core JavaScript -->
  <script src="vendor/jquery/jquery.min.js" type="text/javascript"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js" type="text/javascript"></script>

  <!-- Plugin JavaScript -->
  <script src="vendor/jquery-easing/jquery.easing.min.js" type="text/javascript"></script>

  <!-- Custom scripts for this template -->
  <script src="js/resume.min.js" type="text/javascript"></script>

</body>

</html>
    `;
  }, list: function (diarys) {
    var i = 0;
    var list = `<h2 class="mb-5">Diary</h2>`;
    while (i < diarys.length) {
      var date = new Date(diarys[i].created);
      var year = date.getFullYear() + '년';
      var month = (date.getMonth() + 1) + '월';
      var day = date.getDate() + '일';
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      if (sec <= 9) sec = '0' + sec;
      date = `${year} ${month} ${day} ${hour}:${min}:${sec}`;
      list = list + `
                    <div id="${diarys[i].id}">
                      <div class="resume-item d-flex flex-md-row justify-content-between mb-5">
                        <div class="resume-content p-2"><h3 class="mb-0">${diarys[i].title}</h3></div>
                        <div class="resume-date text-md-right p-2"><span class="text-primary">${date}</span></div>
                      </div>
                      <div class="resume-content">
                        <p style="margin-top:-20px; margin-left: 10px; margin-bottom:50px;">${diarys[i].content}</p>
                      </div>
                      <div class="resume-date" style="margin-bottom:20px;">
                        <div class="row">
                        <form action="/diary/update/${diarys[i].id}" method="get">
                        <div class="resume-date" style="margin-bottom:20px;">
                          <button class="resume-btn" type="submit">수정</button>
                          </div>
                        </form>
                        <form action="/diary/deleteProcess" method="post">
                          <div class="resume-date" style="margin-bottom:20px;">
                          <input type="hidden" name="id" value="${diarys[i].id}"/>
                          <button class="resume-btn" type="submit">삭제</button>
                          </div>
                        </form>
                        </div>
                      </div>
                     </div>
                     `;
      i = i + 1;}
    return list;
  }, update: function (diary) {
    var i = 0;
    var updated = `<h2 class="mb-5">Update Diary</h2>`;
    var date = new Date(diary[i].created);
    var year = date.getFullYear() + '년';
    var month = (date.getMonth() + 1) + '월';
    var day = date.getDate() + '일';
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    if (sec <= 9) sec = '0' + sec;
    date = `${year} ${month} ${day} ${hour}:${min}:${sec}`;
    updated = updated + `
                  <form action="/diary/updateProcess" method="post">
                  <div id="${diary[i].id}">
                    <input type="hidden" name="id" value="${diary[i].id}"/>
                    <div class="resume-item d-flex flex-md-row justify-content-between mb-5">
                      <div class="resume-content p-2"><textarea class="form-control" rows="1" name="title" placeholder="${diary[i].title}" cols="70">${diary[i].title}</textarea></div>
                      <div class="resume-date text-md-right p-2"><span class="text-primary">${date}</span></div>
                    </div>
                    <div class="resume-content">
                      <textarea class="form-control" name="content" rows="10" cols="70" style="margin-top:-20px; margin-left: 10px; margin-bottom:30px;" placeholder="${diary[i].content}">${diary[i].content}</textarea>
                    </div>
                    <div class="row">
                    <div class="resume-date" style="margin-bottom:20px;">
                      <button class="resume-btn" type="submit">저장하기</button>
                      </div>
                    </form>
                    <form action="/diary/deleteProcess" method="post">
                      <div class="resume-date" style="margin-bottom:20px;">
                      <input type="hidden" name="id" value="${diary[i].id}"/>
                      <button class="resume-btn" type="submit">삭제</button>
                      </div>
                    </form>
                    </div>
                    </div>
                    </div>
                    `;
    return updated;
  }, post: function () {
    var updated = `<h2 class="mb-5">Write Diary</h2>`;
    updated = updated + `
                  <form action="/createProcess" method="post">
                    <div class="resume-item d-flex flex-md-row justify-content-between mb-5">
                      <div class="resume-content p-2"><textarea class="form-control" rows="1" name="title" placeholder="제목을 입력하세요" cols="70"></textarea></div>
                    </div>
                    <div class="resume-content">
                      <textarea class="form-control" name="content" rows="10" cols="70" style="margin-top:-20px; margin-left: 10px; margin-bottom:30px;" placeholder="내용을 입력하세요"></textarea>
                    </div>
                    <div class="resume-date" style="margin-bottom:20px;">
                      <button class="resume-btn" type="submit">작성완료</button>
                      </div>
                    </form>
                    </div>
                    `;
    return updated;
  }
}
