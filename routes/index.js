var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Axel' });
});

router.post('/' , async (req, res, next)=>   {
  
  console.log(req.body) //estoy capturando datos//
   
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;



  var obj=  {
    to: 'axel10bbch@gmail.com',
    subject: 'Proyecto Final UTN',
    html: nombre + "" + apellido + "se contacto a travez y quiere mas info a este correo: " + email + ". <br> Ademas, hizo el siguiente comentario: " + mensaje + ". <br> Su tel es " + telefono
  }

  var transporter = nodemailer.createTransport( {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      process: process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('index',  {
    message: '  mensaje enviado correctamente'
  });

});




module.exports = router;
