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
  form.setDescription('RCA activa su red de proveedores para conseguirte las mejores propuestas para lo que tu empresa necesita comprar. Sin coste ni compromiso. Más info: agzlabs.com/legal.html#privacidad');
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

  form.addMultipleChoiceItem()
    .setTitle('Categoría')
    .setChoiceValues(['Maquinaria', 'Vehículo', 'Digitalización', 'Eficiencia energética', 'Otro'])
    .setRequired(true);

  // Campos específicos para "Maquinaria" (categoría de los 5 casos de prueba
  // actuales — convocatoria de maquinaria industrial nueva). Si en el futuro
  // llegan leads de otras categorías, estos campos no aplicarán bien y
  // tocará revisarlos (ramificar por categoría con PageBreakItem, o adaptar
  // el set de campos a la categoría real que llegue).
  form.addParagraphTextItem()
    .setTitle('¿Qué tipo de máquina o equipo necesitáis?')
    .setHelpText('Sé lo más concreto posible: qué hace y en qué fase de vuestro proceso se usa. Ej: "volteadora de compost", "sierra CNC para corte de tablero", "torno de precisión"...')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Capacidad o dimensiones necesarias')
    .setHelpText('Ej: toneladas/hora, capacidad en litros, dimensiones de la pieza a mecanizar...')
    .setRequired(false);

  var unitsValidation = FormApp.createTextValidation()
    .setHelpText('Introduce solo números.')
    .requireNumber()
    .build();
  form.addTextItem()
    .setTitle('Cantidad de unidades')
    .setValidation(unitsValidation)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('¿Incluye instalación, puesta en marcha o formación, o solo el suministro del equipo?')
    .setChoiceValues(['Solo el equipo', 'Equipo + instalación/puesta en marcha', 'Equipo + instalación + formación', 'No lo sé todavía'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Ubicación de entrega/instalación (provincia)')
    .setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('Recuerda')
    .setHelpText('Si es para justificar una subvención de este tipo, la maquinaria debe ser nueva (no de segunda mano) para que el gasto sea subvencionable.');

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
    .setChoiceValues(['He leído y acepto la Política de Privacidad (agzlabs.com/legal.html#privacidad). Mis datos no se compartirán con ningún proveedor sin mi aprobación previa.'])
    .setRequired(true);

  Logger.log('Formulario creado.');
  Logger.log('Enlace de edición (para ti): ' + form.getEditUrl());
  Logger.log('Enlace publicado (para compartir/embeber): ' + form.getPublishedUrl());
}
