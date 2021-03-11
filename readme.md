# 직접 만드는 작은 React

## Goal

tiny-react의 목표는 직접 리액트를 구현해 보면서 리액트 내부동작을 학습하고 이해하기 위해서 시작한 프로젝트입니다.

tiny-react는 Vue.JS의 가상돔 라이브러리인 Snabbdom을 바탕으로 제작 되었으며 최종 목표는 React-Router,Mobx와 같은 서드파티 라이브러리까지 직접 구현하며 나만의 프레임워크 생태계를 만드는것이 목표인 토이 프로젝트입니다.

## Getting Started

### LacoFactory

```js
const TestComponent = LacoFactory((props,effects)=>{
  const [data,setData] = effects.useState(0);
  return <div> {data} </div>
});
```

LacoFactory 함수는 인자로 실행할 컴포넌트 함수를 받습니다.
LacoFactory 함수 실행시 State,Hooks와 같이 컴포넌트가 저장하고 관리할 정보를 클로저에 담아 사용할 수 있는 기능을 제공합니다.

LacoFactory 함수의 인자로 들어가는 함수는 props,와 effects를 받습니다.

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
hook은 가상돔의 라이프사이클과 관련된 함수들이 위치한 객체입니다.
snabbdom을 사용하기 때문에 snabbdom의 구조와 동일하다고 보시면 됩니다.

https://github.com/snabbdom/snabbdom#hooks

on의 경우 onClick,onChange와 같은 이벤트 함수를 등록했을 경우 담겨있는 props이고 일반 props 데이터는 props 객체에 저장되어 내려옵니다.

#### effects

effects 객체에는 useState,useEffect와 같이 컴포넌트 상태를 관리하는 함수들이 담겨져 내려옵니다.

### LifeCycle 접근

snabbdom 가상 돔에 접근하기 위해서는 다음과 같이 JSX 태그에 hook 정보들을 넣어주면 접근할 수 있습니다.

```js
const TestComponent = LacoFactory((props,effects)=>{
  const [data,setData] = effects.useState(0);
  return <div hook={{
  remove : (vNode,cn)=>{
    ...
    cn(),
  }
  }}> {data} </div>
});
```

LifeCycle 정보들은 아래 링크를 확인해주세요.
https://github.com/snabbdom/snabbdom#hooks

### 현재 지원하는 기능
JSX 렌더링
useState
useEffect
IE 11 지원