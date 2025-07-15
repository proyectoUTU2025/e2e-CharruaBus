export function generarStringAleatorioConRequisitos() {
    const caracteresMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const caracteresMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const caracteresEspeciales = '!@#$%^&*';

    let password = '';
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;
    let tieneEspecial = false;

    // Asegurarse de incluir al menos uno de cada tipo
    password += caracteresMayusculas.charAt(Math.floor(Math.random() * caracteresMayusculas.length));
    tieneMayuscula = true;
    password += caracteresMinusculas.charAt(Math.floor(Math.random() * caracteresMinusculas.length));
    tieneMinuscula = true;
    password += numeros.charAt(Math.floor(Math.random() * numeros.length));
    tieneNumero = true;
    password += caracteresEspeciales.charAt(Math.floor(Math.random() * caracteresEspeciales.length));
    tieneEspecial = true;

    // Rellenar el resto de la contraseña hasta al menos 8 caracteres
    const todosLosCaracteres = caracteresMayusculas + caracteresMinusculas + numeros + caracteresEspeciales;
    while (password.length < 8) {
        password += todosLosCaracteres.charAt(Math.floor(Math.random() * todosLosCaracteres.length));
    }

    // Mezclar la contraseña para que los caracteres requeridos no estén siempre al principio
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}