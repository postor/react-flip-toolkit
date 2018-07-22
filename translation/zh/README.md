
# react-flip-toolkit

<a href="https://codepen.io/aholachek/pen/ERRpEj">
<img src="../../example-assets/rft-logo.gif" width='550px' alt='react-flip-toolkit animated logo' />
</a>

## Comparison with other React FLIP libraries

| Feature                                        | [`react-flip-move`](https://github.com/joshwcomeau/react-flip-move) | [`react-overdrive`](https://github.com/berzniz/react-overdrive) | `react-flip-toolkit` |
| ---------------------------------------------- | :-----------------------------------------------------------------: | :-------------------------------------------------------------: | :------------------: |
| 位置动画                               | ✅                                                                   | ✅                                                               | ✅                    |
| 大小动画                                   | ❌                                                                   | ✅                                                               | ✅                    |
| 透明度动画                                | ❌                                                                   | ✅                                                               | ✅                    |
| 父级大小动画不影响下层 | ❌                                                                   | ❌                                                               | ✅                    |
| 使用真实的 FLIP 而不是 克隆 和 匀滑转换 | ✅                                                                   | ❌                                                               | ✅                    |
| 支持嵌套的动画                       | ❌                                                                   | ❌                                                               | ✅                    |
| 支持spring物理动画                     | ❌                                                                   | ❌                                                               | ✅                    |
| 配置容易 & 适合初学者             | ✅                                                                   | ✅                                                               | 🤷                   |


## Table of Contents
- [Demos](#demos)
- [快速入门](#quick-start)
  - [最简示例: 单元素渐变动画](#simplest-example-tweening-a-single-element)
  - [实用功能: 多元素渐变动画](#more-useful-tweening-different-elements)
- [组件介绍](#the-components)
  - [1. `Flipper`](#1-flipper)
    - [Props](#props)
  - [2. `Flipped`](#2-flipped)
    - [基础 props](#basic-props)
    - [回调 props](#callback-props)
    - [Transform props](#transform-props)
    - [高级 props](#advanced-props)
- [让大小渐变动画更简单](#scale-transitions-made-easier)
- [代码库](#library-details)
- [FAQ](#faq)

## Demos

<p>
<a href="https://literate-fly.surge.sh/photos">
  <img src="./example-assets/photogrid.gif" width='600px' alt='an animation showing click to expand a photo' />
</a>
</p>

<p>
<a href="https://codepen.io/aholachek/pen/KeevYN">
  <img src="./example-assets/dropdown.gif" width='600px' alt='a smoothly transitioning menu dropdown' />
</a>
</p>

<p>
<a href="https://codepen.io/aholachek/pen/gKjYNw?editors=0110">
  <img src="./example-assets/sort-filter.gif" width='600px' alt='an animation demoing sort and filter operations' />
</a>
</p>

- [更新列表 (`react-flip-move` 示例的对比实现)](https://literate-fly.surge.sh/flip-move)
- [最简单的例子](https://codepen.io/aholachek/pen/oyKJgL)
- [吉他网店例子](https://literate-fly.surge.sh/guitar)
- [单纯为了展示复杂嵌套做的例子](https://literate-fly.surge.sh/cards)
- [React-flip-toolkit logo](https://codepen.io/aholachek/pen/ERRpEj)
- [Spring 和 easing 参数](https://codepen.io/aholachek/full/bKmZbV/)

## 快速入门

`npm install react-flip-toolkit`

把你的容器元素放到一个`Flipper` 组件中， 让`Flipper`组件的 `flipKey` prop 在每次需要做动画的时候变化.

把你要做动画的元素放在 `Flipped` 组件中， `Flipped` 组件的 `flipId` prop在渲染的过程中始终保持匹配.

### 最简单的例子: 单个元素渐变过度

```jsx
import React, { Component } from React;
import { Flipper, Flipped } from 'react-flip-toolkit';

class AnimatedSquare extends Component {
  state = { fullScreen: false };

  toggleFullScreen = () => {
    this.setState(prevState => ({
      fullScreen: !prevState.fullScreen
    }));
  };

  render() {
    return (
      <Flipper flipKey={this.state.fullScreen}>
        <Flipped flipId="square">
          <div
            className={this.state.fullScreen ? "full-screen-square" : "square"}
            onClick={this.toggleFullScreen}
          />
        </Flipped>
      </Flipper>
    );
  }
}
```

[在 Codepen 中查看](https://codepen.io/aholachek/pen/oyKJgL)

### 实用功能: 多元素渐变

FLIP的亮点在于它能平滑的过度多个完全独立的元素而看起来像是一个动画:

```jsx
import React, { Component } from React;
import { Flipper, Flipped } from 'react-flip-toolkit';

const SmallSquare = ({ onClick, ...rest}) => (
  <div className="square" onClick={onClick} {...rest} />
);

const BigSquare = ({ onClick, ...rest }) => (
  <div className="full-screen-square" onClick={onClick} {...rest}/>
);

class AnimatedSquare extends Component {
  state = { fullScreen: false };

  toggleFullScreen = () => {
    this.setState(prevState => ({
      fullScreen: !prevState.fullScreen
    }));
  };

  render() {
    return (
      <Flipper flipKey={this.state.fullScreen}>
        {this.state.fullScreen ? (
          <Flipped flipId="square">
            <BigSquare onClick={this.toggleFullScreen} />
          </Flipped>
        ) : (
          <Flipped flipId="square">
            <SmallSquare onClick={this.toggleFullScreen} />
          </Flipped>
        )}
      </Flipper>
    );
  }
}
```
[view on Codepen](https://codepen.io/aholachek/pen/qKeLaN)


## 组件

### 1. `Flipper`

包含所有要做动画元素的包装组件.

```jsx
<Flipper flipKey={someKeyThatChanges}>
  {/* children */}
</Flipper>
```

#### Props

| prop                    | default                                        | type                       | details                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------- | :--------------------------------------------: | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| flipKey **(required)**  | -                                              | `string`, `number`, `bool` | Changing this tells `react-flip-toolkit` to transition child elements wrapped in `Flipped` components.                                                                                                                                                                                                                                                                             |
| children **(required)** | -                                              | `node`                     | One or more element children                                                                                                                                                                                                                                                                                                                                                       |
| spring                  | `{stiffness: 1000`, `damping: 500`, `mass: 3}` | `object`                   | **The default easing for all transitions uses springs**. You can customize the spring by changing the `stiffness`, `damping`, or `mass` values passed in the `spring` object prop. If you provide an `ease` prop (described below), that will be used instead instead of a spring.   [You can explore the spring setting options here.](https://codepen.io/aholachek/full/bKmZbV/) |
| ease                    | `easeOutExpo`                                  | `string`                   | If you'd rather use easing functions instead of springs, you can set the default easing for all FLIP transitions by providing a name of an easing function. [Try out all easing options.](https://codepen.io/aholachek/full/bKmZbV/)                                                                                                                                               |
| duration                | `250`                                          | `number`                   | Default duration in `ms` for all FLIP transitions that use the `ease` prop instead of the default `spring` (which uses a physics simulation and therefore doesn't require a duration)                                                                                                                                                                                              |
| applyTransformOrigin    | `true`                                         | `bool`                     | Whether or not `react-flip-toolkit` should apply a transform-origin of "0 0" to animating children (this is generally, but not always, desirable for FLIP animations)                                                                                                                                                                                                              |
| element                 | `div`                                          | `string`                   | If you'd like the wrapper element created by the `Flipped` container to be something other than a `div`, you can specify that here.                                                                                                                                                                                                                                                |
| className               | -                                              | `string`                   | A class applied to the wrapper element, helpful for styling.                                                                                                                                                                                                                                                                                                                       |
