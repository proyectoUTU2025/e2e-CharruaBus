import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE_PATH = path.resolve(__dirname, './Datos.JSON');

interface AccountPasswords {
    [key: string]: string;
}

export function getAccountPassword(accountName: string): string {
    try {
        const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        const passwords: AccountPasswords = JSON.parse(data);
        return passwords[accountName];
    } catch (error) {
        console.error(`Error al leer la contraseña para ${accountName}:`, error);
        throw new Error(`No se pudo leer la contraseña para ${accountName}`);
    }
}

export function setAccountPassword(accountName: string, newPassword: string): void {
    try {
        const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        const passwords: AccountPasswords = JSON.parse(data);
        passwords[accountName] = newPassword;
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(passwords, null, 2));
        console.log(`Contraseña actualizada para ${accountName}`);
    } catch (error) {
        console.error(`Error al actualizar la contraseña para ${accountName}:`, error);
        throw new Error(`No se pudo actualizar la contraseña para ${accountName}`);
    }
}