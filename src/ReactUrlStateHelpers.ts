/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 17/02/19 - 8.52 * */
import {Base64Encoder} from "./encoders/Base64Encoder";
import ReactUrlState, {TReactHook} from "./url-state/ReactUrlState";

const base64ReactUrlState = new ReactUrlState();
base64ReactUrlState
  .withEncoder(new Base64Encoder());

export function useStateFromUrl(obj: object): {[key: string]: TReactHook} {
  return base64ReactUrlState.useStateFromUrl(obj);
}

export function useOneStateFromUrl(key: string, defVal: any): TReactHook {
  return base64ReactUrlState.useStateFromUrl({[key]: defVal})[key];
}

export const ReactUrlStateHelpers = {
  useStateFromUrl,
  useOneStateFromUrl,
};

export default ReactUrlStateHelpers;
