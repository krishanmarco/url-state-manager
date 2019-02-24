# Url State Manager

A library for managing url parameters.

##### Set a parameter to the url search
```js
import {fromUrl, toUrl} from 'url-state-manager';

toUrl('p1', 0);       // http://www.example.com?p1=0
```

##### Get a parameter from the url search
```js
import {fromUrl, toUrl} from 'url-state-manager';

// If the parameter is set the default value is ignored
// http://wwww.example.com?p1=4
fromUrl('p1', 0);     // 4

// If the parameter is missing the default value is returned
// http://www.example.com
fromUrl('p1', 0);     // 0

```
  
### React hook examples
**Mapping an object of initial values to url hooks**
```js
import React from 'react';
import {useOneStateFromUrl, useStateFromUrl} from 'url-state-manager';

export const App = ({}) => {
  const {
    p1: [p1Val, setP1],
    p2: [p2Val, setP2],
  } = useStateFromUrl({p1: 0, p2: 'x'});
  return (
    <div className="App">
      <a onClick={() => setP1(prev => prev + 1)}>{p1Val}</a>
      <a onClick={() => setP2(prev => prev + 'x')}>{p2Val}</a>
    </div>
  );
};

```
  
**Mapping a single parameter to a url hook**
```js
import React from 'react';
import {useOneStateFromUrl, useStateFromUrl} from 'url-state-manager';

export const App = ({}) => {
  const [p1Val, setP1] = useOneStateFromUrl('p1', 0);
  const [p2Val, setP2] = useOneStateFromUrl('p2', {x: 0});
  return (
    <div className="App">
      <a onClick={() => setP1(prev => prev + 1)}>{p1Val}</a>
      <a onClick={() => setP2(({x}) => ({x : x + 1}))}>{p2Val}</a>
    </div>
  );
};

```
