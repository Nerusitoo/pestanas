const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Sirve los archivos HTML y CSS

app.post('/enviar-correo', (req, res) => {
    const { nombre, email, fecha, hora } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abdias.hoces@gmail.com',  // Tu correo
            pass: 'mevh cmby zfzd cixw'         // Tu contraseña o app password
        }
    });

    const mailOptions = {
        from: 'tuCorreo@gmail.com',
        to: email,
        subject: 'Confirmación de cita',
        text: `Hola ${nombre}, tu cita ha sido agendada para el ${fecha} a las ${hora}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            res.send('Correo enviado correctamente');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
