var express = require('express');
var router = express.Router();
var usuarioModels = require('./../../models/usuarioModels');

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) =>  {
    try {
        console.log(req.body);
        var usuarios = req.body.usuario;
        var password = req.body.password;
    

        var data = await usuarioModels.getUserAndPassword(usuario, password);

        if (data != undefined) {
            res.redirect('/admin/aboutme');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            });
        } //cierre else
    } catch (error) {
        console.log(error)
    }
});



module.exports = router;