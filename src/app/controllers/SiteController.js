const { DateTime } = require('mssql');
const { sqlConnect, sql } = require('../config/db')

class SiteController {
    //[GET] /
    index(req, res) {
        res.render('home');
    }

    //[GET] /result-lenhdat
    resultLenhDat(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select * from LENHDAT')
        })
            .then(result => {
                const arrRecord = result.recordsets[0];
                for (var i = 0; i < arrRecord.length; i++) {
                    let d = new Date(arrRecord[i].NGAYDAT);
                    arrRecord[i].NGAYDAT = d.toUTCString();
                }
                //res.json(result.recordsets[0])
                res.render('result_lenhdat', { lenh: arrRecord });
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /result-lenhkhop
    resultLenhKhop(req, res) {
        sqlConnect.then(pool => {
            return pool.request()
                .query('select * from LENHKHOP')
        })
            .then(result => {
                const arrRecord = result.recordsets[0];
                for (var i = 0; i < arrRecord.length; i++) {
                    let d = new Date(arrRecord[i].NGAYKHOP);
                    arrRecord[i].NGAYKHOP = d.toUTCString();
                }
                //res.json(result.recordsets[0])
                res.render('result_lenhkhop', { lenh: arrRecord });
            }).catch(err => {
                console.log(err)
            })
    }

    //[GET] /:slug
    show(req, res) {
        res.send('404 not found');
    }

    //[POST] /execsp
    execsp(req, res) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        const mess = {
            err: 'Đặt lệnh thành công! '+ dateTime,
            color: 'green'
        }

        sqlConnect.then(pool => {
            return pool.request()
                .input('macp', sql.NVarChar(7), req.body.macp.toUpperCase().trim())
                .input('Ngay', sql.NVarChar, dateTime)
                .input('LoaiGD', sql.Char, req.body.loaigd)
                .input('soluongMB', sql.Int, req.body.soluong)
                .input('giadatMB', sql.Float, req.body.giadat)
                .query('exec SP_KHOPLENH_LO @macp, @Ngay, @LoaiGD, @soluongMB, @giadatMB')
        })
            .then(result => {
                res.render('home', { mess });
            }).catch(err => {
                mess.err = 'Lỗi đặt lệnh! ' + err;
                mess.color = 'red';
                res.render('home', { mess });
                console.log(err)
            })
    };
}

module.exports = new SiteController();
