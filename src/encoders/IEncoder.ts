/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 18/02/19 - 19.15 * */

export interface IEncoder {
  encode(url: string): string;
  decode(encodedUrl: string): string;
}
