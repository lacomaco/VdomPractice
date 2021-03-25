# 직접 만드는 작은 React

## Goal

tiny-react의 목표는 직접 리액트를 구현해 보면서 리액트 내부동작을 학습하고 이해하기 위해서 시작한 프로젝트입니다.

tiny-react는 Vue.JS의 가상돔 라이브러리인 Snabbdom을 바탕으로 제작 되었으며 최종 목표는 React-Router,Mobx와 같은 서드파티 라이브러리까지 직접 구현하며 나만의 프레임워크 생태계를 만드는것이 목표인 토이 프로젝트입니다.

## Getting Started

### MacoCore

```js
import MacoCore from "../src/lib/core/Maco";
import Main from "./main";
import "./style.css";

const { render } = MacoCore;

let container = document.querySelector("#container");

render(container, Main);
```

MacoCore 모듈에는 JSX를 렌더링 데이터로 변환 하는 함수와 컴포넌트를 DOM에 렌더링 하는 함수가 존재합니다.

#### render 함수

```html
<div class="container"></div>
```

```js
import Component from "./component";
const $entry = document.querySelector(".container");
render($entry, Component);
```

render 함수는 컴포넌트를 실제 DOM에 바인딩 하는 함수입니다.

render 함수의 첫 번째 인자엔 실제 DOM을, 두 번째 인자엔 컴포넌트를 넣어주세요.

#### MacoCore.jsxToJson

```js
import MacoCore from "../src/lib/core/Maco";

const TestComponent = LacoFactory((props, effects) => {
  return <div> JSX!</div>;
});
```

MacoCore에는 JSX를 렌더링 데이터로 변환하는 MacoCore.jsxToJson 함수가 존재합니다.

따라서 JSX를 렌더링 하기 위해서는 MacoCore 모듈이 import 되어있어야 합니다.

### LacoFactory

```js
import MacoCore from "Maco"; // 필수로 선언해주셔야합니다!

const TestComponent = LacoFactory((props, effects) => {
  const [data, setData] = effects.useState(0);
  return <div> {data} </div>;
});
```

LacoFactory 함수는 컴포넌트를 생성해주는 함수입니다.

LacoFactory 함수는 인자로 실행할 컴포넌트 함수를 받습니다.

```js
const component = (props, effects) => {
  const [data, setData] = effects.useState(0);
  return <div>{data}</div>;
};
```

컴포넌트 함수는 인자로 props와 effects를 받습니다.

props는 컴포넌트의 props 정보가 담겨져 있는 객체이며

effects는 상태를 관리하고 조작하는 useState,useEffect 함수가 담겨있는 객체입니다.

#### props

props는 다음과 같은 프로퍼티를 가진 객체입니다.

```
{
  dataset:{},
  hook:{},
  key:number | string,
  on:{},
  props:{},
  style:{}
}
```

tiny-react 프로젝트는 snabbdom을 사용하기 때문에 snabbdom의 구조와 동일합니다.

https://github.com/snabbdom/snabbdom#hooks

- hook은 가상돔의 라이프사이클에 바인딩할 함수들이 담겨져 있습니다.

- on은 JSX태그에 선언된 onClick, onChange와 같은 on 으로 시작하는 이벤트 함수들이 담겨져 있습니다.

- style은 style과 관련된 데이터는 style에 저장됩니다.

- key는 컴포넌트의 key 정보가 담겨있습니다. (기본값은 undefined입니다.)

- dataset은 data-으로 시작하는 props 정보들이 저장됩니다.

- 그외의 일반적인 props들은 모두 props에 저장됩니다.

#### effects

effects는 상태를 관리하는 useState,useEffect 함수들이 담겨있는 객체입니다.

#### effects.useState

```js
const TestComponent = LacoFactory((props, effects) => {
  const [data, setData] = effects.useState(0);
  return <div> {data} </div>;
});
```

React의 state와 동일합니다.

useState 함수는 인자로 초기값을 받고 배열을 리턴합니다.

```
[state,state변경 함수]
```

배열의 첫번째 요소는 현재 state이며 두번째 요소는 state를 변경하는 함수입니다.

state를 변경하기 위해서는 state 변경 함수를 통해서 변경하여야 컴포넌트가 리 렌더링 됩니다.

#### effects.useEffect

```js
const TestComponent = LacoFactory((props, effects) => {
  const [data, setData] = effects.useState(0);
  effects.useEffect(() => {
    console.log(data);
  }, []);
  return <div> {data} </div>;
});
```

React의 useEffect와 동일합니다.

useEffect 함수는 첫번째 인자로 실행할 함수를 받으며 두번째 인자로 변경을 감지할 state를 받습니다.

useEffect 함수는 2번째 인자의 state가 변경되거나, 컴포넌트가 첫 렌더링 될때 함수를 실행시킵니다.

### 현재 지원하는 기능

JSX 렌더링

useState,useEffect지원

IE 11 지원 (보수중입니다!)

### 예제 프로젝트 빌드 방법

```
git clone https://github.com/lacomaco/tiny-react.git

//프로젝트 파일에서
npm i

npm run build

dist 파일의 v-domStudy.html파일을 LiveServer로 실행시켜주세요~!
```
