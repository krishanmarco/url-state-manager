/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 17/02/19 - 8.52 * */
import {Base64Encoder} from "./encoders/Base64Encoder";
import UrlState from "./url-state/UrlState";

const urlState = new UrlState();
urlState
  .withEncoder(new Base64Encoder());

export function fromUrl<T>(key: string, defaultValue: T): T {
  return urlState.oneFromUrl(key, defaultValue);
}

export function toUrl<T>(key: string, value: T): T {
  return urlState.oneToUrl(key, value);
}

export const UrlStateHelpers = {
  fromUrl,
  toUrl,
};

export default UrlStateHelpers;
