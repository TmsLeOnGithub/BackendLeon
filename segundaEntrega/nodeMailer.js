
import TEST_MAIL from '../server.js'

const mailOptions = {
    from:'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde node.js',
    html: '<h1>Contenido de prueba</h1>'
}