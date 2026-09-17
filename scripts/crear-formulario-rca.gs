/**
 * Crea el Google Form de RCA con todos los campos, validaciones y opciones
 * ya configurados. Ejecutar una sola vez desde script.google.com.
 *
 * Uso:
 *   1. Ir a https://script.google.com -> Nuevo proyecto.
 *   2. Borrar el contenido por defecto y pegar este archivo entero.
 *   3. Guardar (Ctrl+S / Cmd+S).
 *   4. En la barra superior, seleccionar la función "crearFormularioRCA"
 *      y pulsar "Ejecutar".
 *   5. La primera vez pedirá autorizar el script sobre tu propia cuenta de
 *      Google (es tu cuenta, tu script: "Avanzado" -> "Ir a ... (no seguro)"
 *      es el aviso estándar de Google para scripts propios sin publicar).
 *   6. Ver -> Registro de ejecución (o Ejecuciones) para obtener los dos
 *      enlaces: el de edición (para ti) y el de publicación (para embeber
 *      en la web).
 */
function crearFormularioRCA() {
  var form = FormApp.create('RCA — Cuéntanos qué necesitas comprar');
  form.setDescription('Formulario para empresas que han recibido una subvención y quieren recibir gratis 2-3 presupuestos reales de proveedores (RCA · AGZ Labs).');
  form.setCollectEmail(true);
  form.setConfirmationMessage('Gracias. En menos de 48h te enviamos los primeros presupuestos.');

  form.addTextItem()
    .setTitle('Nombre de la empresa')
    .setRequired(true);

  var cifValidation = FormApp.createTextValidation()
    .setHelpText('Introduce un CIF válido (ej. B12345678).')
    .requireTextMatchesPattern('^[A-Za-z0-9][0-9]{7}[A-Za-z0-9]$')
    .build();
  form.addTextItem()
    .setTitle('CIF')
    .setRequired(true)
    .setValidation(cifValidation);

  form.addTextItem()
    .setTitle('Persona de contacto (nombre y apellidos)')
    .setRequired(true);

  var emailValidation = FormApp.createTextValidation()
    .setHelpText('Introduce un email válido.')
    .requireTextIsEmail()
    .build();
  form.addTextItem()
    .setTitle('Email de contacto')
    .setRequired(true)
    .setValidation(emailValidation);

  var phoneValidation = FormApp.createTextValidation()
    .setHelpText('Introduce solo números.')
    .requireNumber()
    .build();
  form.addTextItem()
    .setTitle('Teléfono de contacto')
    .setRequired(true)
    .setValidation(phoneValidation);

  form.addParagraphTextItem()
    .setTitle('¿Qué necesitáis comprar?')
    .setHelpText('Cuanto más concreto, mejor podremos buscar proveedores.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Categoría')
    .setChoiceValues(['Maquinaria', 'Vehículo', 'Digitalización', 'Eficiencia energética', 'Otro'])
    .setRequired(true);

  var amountValidation = FormApp.createTextValidation()
    .setHelpText('Introduce solo números.')
    .requireNumber()
    .build();
  form.addTextItem()
    .setTitle('Importe aproximado de la subvención (opcional)')
    .setRequired(false)
    .setValidation(amountValidation);

  form.addMultipleChoiceItem()
    .setTitle('Plazo en el que lo necesitáis')
    .setChoiceValues(['Menos de 1 mes', '1-3 meses', 'Más de 3 meses'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Política de datos')
    .setChoiceValues(['Acepto que mis datos se usen para contactar con proveedores que yo apruebe'])
    .setRequired(true);

  Logger.log('Formulario creado.');
  Logger.log('Enlace de edición (para ti): ' + form.getEditUrl());
  Logger.log('Enlace publicado (para compartir/embeber): ' + form.getPublishedUrl());
}
