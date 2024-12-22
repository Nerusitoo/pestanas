document.getElementById('reservaForm').onsubmit = async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    const datos = {
        nombre,
        email,
        fecha,
        hora
    };

    const respuesta = await fetch('/enviar-correo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const mensaje = document.getElementById('mensaje');

    if (respuesta.ok) {
        mensaje.textContent = `Gracias ${nombre}, tu cita ha sido reservada. Revisa tu correo (${email}) para más detalles.`;
    } else {
        mensaje.textContent = 'Hubo un error al enviar la confirmación. Inténtalo de nuevo.';
    }
};
