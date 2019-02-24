/** Created by Krishan Marco Madan <krishanmarcomadan@gmail.com> 17/02/19 - 8.52 * */
import _ from 'lodash';
import {useState} from 'react';
import UrlState from "./UrlState";

export type TReactHook = [any, Function];

export class ReactUrlState extends UrlState {

  constructor() {
    super();
    this.useStateFromUrl = this.useStateFromUrl.bind(this);
    this.useOneStateFromUrl = this.useOneStateFromUrl.bind(this);
  }

  public useStateFromUrl(obj: object) {
    return _.mapValues(obj, (defVal: any, key: string) => {
      const initialVal = this.oneFromUrl(key, defVal);
      return this.useOneStateFromUrl(key, useState(initialVal));
    })
  }

  private useOneStateFromUrl(key: string, hook: TReactHook): TReactHook {
    return [hook[0], (arg) => {
      hook[1](prevVal => {
        const val = _.isFunction(arg)
          ? arg(prevVal)
          : arg;
        this.oneToUrl(key, val);
        return val;
      });
    }];
  }
}

export default ReactUrlState;
