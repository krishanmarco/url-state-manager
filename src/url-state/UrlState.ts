/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 17/02/19 - 8.52 * */
import UrlStateHelper from "./UrlStateHelper";

export class UrlState extends UrlStateHelper {

  constructor() {
    super();
    this.oneFromUrl = this.oneFromUrl.bind(this);
    this.oneToUrl = this.oneToUrl.bind(this);
  }

  public oneFromUrl<T>(paramName: string, defaultValue: T): T {
    return this.fromUrl({[paramName]: defaultValue})[paramName];
  }

  public oneToUrl<T>(paramName: string, value: T): T {
    return this.toUrl({[paramName]: value})[paramName];
  }
}

export default UrlState;
