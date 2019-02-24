/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 18/02/19 - 19.15 * */
import {IEncoder} from "./IEncoder";

export class URIEncoder implements IEncoder {

  public decode(encodedUrl: string): string {
    return decodeURI(encodedUrl);
  }

  public encode(decodedUrl: string): string {
    return encodeURI(decodedUrl);
  }
}
