var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: '1601n'
});

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

// 跨域请求
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', '3.2.1');

    next();
});

// 拉取用户列表
app.post('/userList', (req, res) => {
    connection.query('select id,username,password,StudentId,phone,address from user', (err, rows, fields) => {
        if (err) throw err;
        res.json({
            code: 0,
            data: rows
        });
    })
})

// 删除角色接口
app.get('/removeRoler', (req, res) => {
    let uid = req.query.uid,
        rid = req.query.rid;
    connection.query(`update user_roler set status=0  where uid=? and rid=?`, [uid, rid], function(err, rows, fields) {
        if (err) throw err;
        if (rows.affectedRows) {
            res.json({
                code: 0,
                msg: '删除角色成功'
            })
        } else {
            res.json({
                code: 1,
                msg: '删除角色失败'
            })
        }
    });
})

// 拉取角色列表
app.get('/rolerList', (req, res) => {
    let id = req.query.id,
        allRoler = [];
    connection.query('select id,rolername from roler', (err, rows, fields) => {
        if (err) throw err;
        allRoler = rows;
        if (id) {
            connection.query(`select rid,rolername from user_roler, roler where user_roler.rid = roler.id and user_roler.status=1 and user_roler.uid=${id}`, (err, rows, fields) => {
                if (err) throw err;
                res.json({
                    code: 0,
                    allRoler,
                    myRoler: rows
                });
            })
            connection.query('delete from user_roler where status=0')
        } else {
            res.json({
                code: 0,
                allRoler,
                myRoler: []
            })
        }
    })
})

app.get('/addRoler', (req, res) => {
    let uid = req.query.uid,
        rid = req.query.rid;
    // 先查询用户是否有该角色，如果有则不添加
    connection.query(`select rid from user_roler where uid=? and rid=? and status =1`, [uid, rid], function(err, rows, fields) {
        if (err) throw err;
        if (rows.length) {
            res.json({
                code: 1,
                msg: '已有该角色'
            })
        } else {
            connection.query(`insert into user_roler (uid, rid) values(?, ?)`, [uid, rid], function(err, rows, fields) {
                if (err) throw err;
                if (rows.insertId) {
                    res.json({
                        code: 0,
                        msg: '添加角色成功'
                    })
                } else {
                    res.json({
                        code: 1,
                        msg: '添加角色失败'
                    })
                }
            });
        }
    });
})

// 生成成绩单数据
app.get('/reportList', (req, res) => {
    // connection.query(`select id from user`, function(err, rows, fields) {
    //     if (err) throw err;
    //     // 拿到所有用户的id rows
    //     // 生成11天的成绩单
    //     // res.json(rows);
    //     let score = [],
    //         dayStr = ``;
    //     for (let i = 20; i <= 31; i++) {
    //         let dayScore = [];
    //         // 给每个用户生成一个成绩
    //         for (let y = 0; y < rows.length; y++) {
    //             dayScore.push({
    //                 id: rows[y].id,
    //                 score: Math.floor((Math.random() * 20)) + 80
    //             })
    //             dayStr += `(${rows[y].id}, ${Math.floor((Math.random()*20))+80}, "2018-07-${i}"),`
    //         }
    //         score.push({
    //             date: `2018-07-${i}`,
    //             list: dayScore
    //         })
    //     }
    // connection.query(`insert into report (uid, score, date) values ${dayStr.slice(0, dayStr.length-1)}`)
    connection.query('select * from report', function(err, rows, fields) {
            res.json(rows);
        })
        // });



})

app.listen(3000);

console.log('启动服务...');