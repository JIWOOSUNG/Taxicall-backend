var express = require('express');
var router = express.Router();

const db = require('../database/db_connect')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/taxi/test', function(req,res,next) {
  db.query('select * from tb_user', (err,rows,fields) => {
    if(!err) {
      console.log("test / rows =" + JSON.stringify(rows))
      res.json([{code:0, data:rows}])
    }
    else{
      console.log("test / err: " + err)
      res.json([{code:1, data:err}])
    }
  })
})

router.post('/taxi/login', function(req,res,next) {
  console.log("login / req.body" + JSON.stringify(req.body))

  let userId = req.body.userId
  let userPw = req.body.userPw

  let queryStr = `SELECT * FROM tb_user WHERE user_id="${userId}" AND user_pw="${userPw}"`
  console.log("login / queryStr = "+ queryStr)
  db.query(queryStr, (err,rows,fields) => {
    if(!err) {
      console.log("login / rows =" + JSON.stringify(rows))
      let len = Object.keys(rows).length
      console.log("login / len =" + len)
      let code = len==0 ? 1 : 0
      let message = len ==0 ? "아이디 또는 비밀번호가 잘못 입력되었습니다." : "로그인 성공"

      res.json([{code: code, message: message}])
    }
    else {
      console.log("login / err : " + err)
      res.json([{code : 1, message: err}])
    }
  })
})

router.post('/taxi/register', function(req,res) {
  console.log("register / req.body " + JSON.stringify(req.body))

  let userId = req.body.userId
  let userPw = req.body.userPw

  console.log("register / userId = " + userId + " , userPw = " + userPw)
  if (!(userId && userPw)) {
    res.json( [{code : 1, message : "아이디 또는 비밀번호가 없습니다."}])
    return 
  }

  let queryStr = `insert into tb_user values ("${userId}", "${userPw}", "")`
  console.log("register / queryStr = " + queryStr)
  db.query(queryStr, function(err,rows,fields) {
    if(!err) {
      console.log("register / rows = " + JSON.stringify(rows))
      res.json( [{code:0, message : "회원가입이 완료되었습니다."}])
    }
    else {
      console.log("register / err : " + JSON.stringify(err))
      if(err.code=="ER_DUP_ENTRY"){
        res.json([{code:2, message:"이미 등록된 ID 입니다."}])
      }
      else{
        res.json([{code:3, message:"알 수 없는 오류가 발생하였습니다."}])
      }
    }
  })
})

router.post('/taxi/list', function(req,res) {
  console.log('list/req.body' + JSON.stringify(req.body))
  let userId = req.body.userId
  console.log('list /userId = ' + userId)

  let queryStr = `SELECT * FROM tb_call where user_id="${userId}" ORDER BY id DESC`
  console.log("list / queryStr = " + queryStr)
  db.query(queryStr, function(err, rows, fields) {
    if(!err) {
      console.log("list / rows =" + JSON.stringify(rows))
      let code = 0
      res.json([{code: code, message : "택시 호출 목록 호출 성공", data : rows}])
    }
    else {
      console.log('err : ' + err)
      res.json([{code: 1, message : "알 수 없는 오류가 발생하였습니다.", data:err}])
    }
  })
})

router.post('/taxi/call', function(req,res) {
  console.log("taxi/call / req.body " + JSON.stringify(req.body))

  let userId = req.body.userId
  let startAddr = req.body.startAddr
  let startLat = req.body.startLat
  let startLng = req.body.startLng
  let endAddr = req.body.endAddr
  let endLat = req.body.endLat
  let endLng = req.body.endLng

})

module.exports = router;
