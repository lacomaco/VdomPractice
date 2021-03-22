# 직접 만드는 작은 React

## Goal

tiny-react의 목표는 직접 리액트를 구현해 보면서 리액트 내부동작을 학습하고 이해하기 위해서 시작한 프로젝트입니다.

tiny-react는 Vue.JS의 가상돔 라이브러리인 Snabbdom을 바탕으로 제작 되었으며 최종 목표는 React-Router,Mobx와 같은 서드파티 라이브러리까지 직접 구현하며 나만의 프레임워크 생태계를 만드는것이 목표인 토이 프로젝트입니다.

## Getting Started

### MacoCore

```js
import MacoCore, { patch } from "../src/lib/core/Maco";
import Main from "./main";
import "./style.css";

const { render } = MacoCore;

let container = document.querySelector("#container");

render(container, Main);
```

Maco 모듈에는 JSX를 렌더링 데이터로 변환해주는 함수와 컴포넌트를 DOM에 렌더링해 주는 render 함수가 존재합니다.

#### render 함수

```js
render(DOM, Component);
```

render 함수의 첫 번째 인자엔 컴포넌트를 위치시킬 실제 DOM 요소를, 두 번째 인자엔 Root 컴포넌트를 넣은 후 실행시켜주면 해당 DOM 요소 위치에 Root 컴포넌트를 렌더링합니다.

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

컴포넌트 함수는 인자로 props와 effects를 받습니다.

JSX를 파싱하기 위해서 LacoFactory 함수의 상단에 MacoCore 모듈을 선언해줘야합니다.

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

hook은 가상돔의 라이프사이클에 바인딩할 함수들을 관리하는 객체입니다.

snabbdom을 사용하기 때문에 snabbdom의 구조와 동일하다고 보시면 됩니다.

https://github.com/snabbdom/snabbdom#hooks

on은 JSX태그에 선언된 onClick, onChange와 같은 이벤트를 저장하고 넘겨주는 프로퍼티입니다.

style과 관련된 데이터는 style에 저장됩니다.

그외의 일반 데이터는 props에 저장됩니다.

#### effects

effects 객체에는 useState,useEffect와 같이 컴포넌트 상태를 관리하는 함수들이 담겨져 내려옵니다.

#### effects.useState

```js
const TestComponent = LacoFactory((props, effects) => {
  const [data, setData] = effects.useState(0);
  return <div> {data} </div>;
});
```

React의 state와 동일합니다. state가 변경되면 이를 비교하여 컴포넌트를 리렌더링 합니다.

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

React의 useEffect와 동일합니다. 컴포넌트가 마운트될때,2번째 인자에들어간 state값이 변경되면 effect역시 다시 실행됩니다.

아직 unMount시 effect가 실행되는 기능은 미 구현상태입니다.

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
