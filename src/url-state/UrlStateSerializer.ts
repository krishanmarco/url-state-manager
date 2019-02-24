/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 20/02/19 - 19.36 * */
import _ from 'lodash';
import {tryOrDefault} from "../lib/HelperFunctions";

export type TSerializedObject = {
  meta: object;
  value: object;
};

const typeString = 0;
const typeNumber = 1;
const typeObject = 2;

type TSerializedValue = {
  typeId: number;
  value: any;
};

export class UrlStateSerializer {

  constructor() {
    this.serialize = this.serialize.bind(this);
    this.deserialize = this.deserialize.bind(this);
    this.serializeOne = this.serializeOne.bind(this);
    this.serializeOneType = this.serializeOneType.bind(this);
    this.deserializeOneType = this.deserializeOneType.bind(this);
  }

  private static mapValueToTypeId(value: any): number {
    if (_.isNumber(value)) {
      return typeNumber;
    }
    if (_.isObject(value)) {
      return typeObject;
    }
    return typeString;
  }

  public serialize(obj: any): TSerializedObject {
    return Object.keys(obj)
      .reduce((acc, key) => {
        const {typeId, value} = this.serializeOne(obj[key]);
        _.set(acc, `meta.${key}`, typeId);
        _.set(acc, `value.${key}`, value);
        return acc;
      }, {meta: {}, value: {}});
  }

  public deserialize(serializedObject: TSerializedObject): object {
    const {meta, value} = serializedObject;
    return _.mapValues(value, (val, key) => this.deserializeOneType(meta[key], val));
  }

  public serializeOne(value: any): TSerializedValue {
    const typeId = UrlStateSerializer.mapValueToTypeId(value);
    return {
      typeId,
      value: this.serializeOneType(typeId, value),
    };
  }

  private serializeOneType(type: number, value: any): any {
    switch (type) {
      case typeObject:
        return JSON.stringify(value);
    }
    return value;
  }

  private deserializeOneType(type: number, value: any): any {
    if (type == typeNumber) {
      const v = parseFloat(value);
      return isNaN(v) ? value : v;
    }
    if (type == typeObject) {
      return tryOrDefault(() => JSON.parse(value), {});
    }
    return value;
  }
}

export default UrlStateSerializer;
