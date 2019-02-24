/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 17/02/19 - 8.52 * */
import _ from 'lodash';
import {Base64Encoder} from "..";
import {IEncoder} from "../encoders/IEncoder";
import {URIEncoder} from "../encoders/URIEncoder";
import {tryOrDefault} from "../lib/HelperFunctions";
import {UrlState} from "./UrlState";
import UrlStateSerializer from "./UrlStateSerializer";

export type TUrlParamArr = [string, any];

const uriEncoder = new URIEncoder();
const base64Encoder = new Base64Encoder();

export class UrlStateHelper {

  public encoder?: IEncoder;
  public serializer: UrlStateSerializer;
  public useMetadata: boolean;

  constructor() {
    this.serializer = new UrlStateSerializer();
    this.encoder = uriEncoder;
    this.useMetadata = false;
    this.withMetadata = this.withMetadata.bind(this);
    this.withEncoder = this.withEncoder.bind(this);
    this.fromUrl = this.fromUrl.bind(this);
    this.toUrl = this.toUrl.bind(this);
    this.objToLocation = this.objToLocation.bind(this);
    this.parseLocation = this.parseLocation.bind(this);
    this._parseLocation = this._parseLocation.bind(this);
  }

  private static parseQuery(query: string): { key: string; ___: string } {
    return query
      .split('&')
      .map((paramVal: any) => paramVal.split('='))
      .filter(([k]: TUrlParamArr) => !_.isEmpty(k))
      .reduce((acc: any, [k, v]: TUrlParamArr) => _.set(acc, k, v), {});
  }

  private static serializeMeta(meta: object): string {
    return base64Encoder.encode(JSON.stringify(meta));
  }

  private static deserializeMeta(meta: string): object {
    return JSON.parse(base64Encoder.decode(meta));
  }

  public withEncoder(encoder?: IEncoder): UrlStateHelper {
    this.encoder = encoder || uriEncoder;
    return this;
  }

  public withMetadata(useMetadata: boolean): UrlStateHelper {
    this.useMetadata = useMetadata;
    return this;
  }

  /**
   * Sets data into the url search field
   */
  public fromUrl(obj: object): object {
    const urlData = this.parseLocation();
    return _.mapValues(obj, (defVal: any, key: string) => urlData[key] != undefined
      ? urlData[key]
      : defVal);
  }

  /**
   * Gets state data from the url search field
   */
  public toUrl(obj: object): object {
    const urlData = this.parseLocation();

    // Overwrite the values in the current url
    Object.keys(obj)
      .forEach(k => urlData[k] = obj[k]);

    // Write to the url
    return this.objToLocation(urlData);
  }

  private objToLocation(data: { [key: string]: any }): object {
    const serialized = this.serializer.serialize(data);

    // Add the metadata to the params obj
    const {meta, value} = serialized;
    const locationData = {___: UrlStateHelper.serializeMeta(meta), ...value};
    const decodedLocationData = Object.keys(locationData)
      .map((key: string) => `${key}=${locationData[key]}`)
      .join('&');

    const encodedLocationData = this.encoder != undefined
      ? this.encoder.encode(decodedLocationData)
      : decodedLocationData;

    window.history.pushState(encodedLocationData, '', `?${encodedLocationData}`);
    return data;
  }

  private parseLocation() {
    return tryOrDefault(this._parseLocation, {});
  }

  private _parseLocation() {
    const encodedLocation = _.get(window, 'location.search', '?').substr(1);
    const location = this.encoder != undefined
      ? this.encoder.decode(encodedLocation)
      : encodedLocation;

    const {___, ...value} = UrlState.parseQuery(location);
    const meta = ___ != undefined ? UrlStateHelper.deserializeMeta(___) : {};
    return this.serializer.deserialize({meta, value});
  }
}

export default UrlStateHelper;
