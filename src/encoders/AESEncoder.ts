/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 18/02/19 - 19.15 * */
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import {IEncoder} from "./IEncoder";

export class AESEncoder implements IEncoder {
  public passphrase: string;

  constructor(passphrase: string) {
    this.passphrase = passphrase;
  }

  public decode(encryptedUrl: string): string {
    const bytes = AES.decrypt(encryptedUrl, this.passphrase);
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  public encode(decryptedUrl: string): string {
    return AES.encrypt(decryptedUrl, this.passphrase).toString();
  }
}
