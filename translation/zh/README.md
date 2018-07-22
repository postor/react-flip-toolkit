
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
  <img src="../../example-assets/photogrid.gif" width='600px' alt='an animation showing click to expand a photo' />
</a>
</p>

<p>
<a href="https://codepen.io/aholachek/pen/KeevYN">
  <img src="../../example-assets/dropdown.gif" width='600px' alt='a smoothly transitioning menu dropdown' />
</a>
</p>

<p>
<a href="https://codepen.io/aholachek/pen/gKjYNw?editors=0110">
  <img src="../../example-assets/sort-filter.gif" width='600px' alt='an animation demoing sort and filter operations' />
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

FLIP的亮点在于它能平滑的过度两个完全独立的元素而看起来像是一个元素在动画:

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
[在Codepen中查看](https://codepen.io/aholachek/pen/qKeLaN)

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
| debug                   | `false`                                        | `bool`                     | This experimental prop will pause your animation right at the initial application of FLIP-ped styles. That will allow you to inspect the state of the animation at the very beginning, when it should look similar or identical to the UI before the animation began.                                                                                                              |



### 2. `Flipped`

包装一个要做动画的元素.

例如：在一个组件上这样写

```jsx
<Flipped flipId="coolDiv">
  <div className="small" />
</Flipped>
```

在另一个地方另一个组件上这样写

```jsx
<Flipped flipId="coolDiv">
  <div className="big" />
</Flipped>
```

他们就会被 `react-flip-toolkit` 做成补间动画

`Flipped` 组件不会产生实际的html标签， 它只是单纯的把一些属性传递给它包含的元素/节点上. 如果子节点是一个react组件，则需要保证它会把传递给它的未知props赋予对应的HTML DOM元素上.

#### Basic props

| prop                    | default                                        | type     | details                                                                                                                                                                                                                                                                                                                                         |
| ----------------------- | :--------------------------------------------: | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children **(required)** | -                                              | `node`   | Wrap a single child with the `Flipped` component.                                                                                                                                                                                                                                                                                               |
| flipId **(required)**   | -                                              | `string` | Use this to tell `react-flip-toolkit` how elements should be matched across renders so they can be animated.                                                                                                                                                                                                                                    |
| inverseFlipId           | -                                              | `string` | Refer to the id of the parent `Flipped` container whose transform you want to cancel out. [Read more about canceling out parent transforms here.](#scale-transitions-made-easier)                                                                                                                                                               |
| transformOrigin         | `"0 0"`                                        | `string` | This is a convenience method to apply the proper CSS `transform-origin` to the element being FLIP-ped. This will override `react-flip-toolkit`'s default application of `transform-origin: 0 0;` if it is provided as a prop.                                                                                                                   |
| spring                  | `{stiffness: 1000`, `damping: 500`, `mass: 3}` | `object` | You can customize the spring on a per-element basis by changing the `stiffness`, `damping`, or `mass` values passed in the `spring` object prop. If you provide an `ease` prop (described below), that will be used instead instead of a spring.  [You can explore the spring setting options here.](https://codepen.io/aholachek/full/bKmZbV/) |
| ease                    | `easeOutExpo`                                  | `string` | This string should refer to [one of the available easing options.](https://codepen.io/aholachek/full/bKmZbV/) This prop will override the easing specified in the parent `Flipped` component.                                                                                                                                                   |
| duration                | `250`                                          | `number` | Timing for the individual FLIP transition. This is only meaningful if you've specified an `ease` prop, because springs don't take durations. This prop will override the one specified in the parent `Flipped` component if one exists.                                                                                                         |
| delay                   | `0`                                            | `number` | Amount of time to wait before tweening the element position. You can use this to create staggered transitions.                                                                                                                                                                                                                                  |

#### Callback props

| prop            | arguments                           | details                                                                                                                                                                                                                                                                                         |
| --------------- | :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onAppear        | `element`, `index`                  | Called when the element first appears. It is provided a reference to the DOM element being transitioned as the first argument, and the index of the element relative to all appearing elements as the second.                                                                                   |
| onDelayedAppear | `element`, `index`                  | This is a replacement for  `onAppear` that is called only after all exiting elements have finished exiting. It automatically applies `opacity: 0` to newly appeared elements at the very beginning. The `onDelayedAppear` function is responsible for setting the `opacity` to the final value. |
| onStart         | `element`                           | Called when the FLIP animation starts. It is provided a reference to the DOM element being transitioned as the first argument                                                                                                                                                                   |
| onComplete      | `element`                           | Called when the FLIP animation completes. It is provided a reference to the DOM element being transitioned as the first argument. (If transitions are interruped by new ones, `onComplete` will still be called.)                                                                               |
| onExit          | `element`, `index`, `removeElement` | Called when the element is removed from the DOM. It must call the `removeElement` function when the exit transition has completed.                                                                                                                                                              |

#### Transform props

默认情况下，FLIP动画的元素通过translate, scale, 和 opacity都会被转换。然而，特定的效果会需要更多的控制，所以如果你指定以下props，就可以限定对应的属性才被补间动画:

| prop      | type   | details                             |
| --------- | :----: | :---------------------------------- |
| translate | `bool` | Tween `translateX` and `translateY` |
| scale     | `bool` | Tween `scaleX` and `scaleY`         |
| opacity   | `bool` |                                     |

#### Advanced props

| prop              | type             | details                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | :--------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| componentId       | `string`         | Unique identifier for the component                                                                                                                                                                                                                                                                                                         |
| componentIdFilter | `array`,`string` | Only apply FLIP transitions if the transition originates or ends with a component with the specified `componentId`. To limit the application of an inverse transform, you refer to the parent's `componentId` [as seen in this example.](https://github.com/aholachek/react-flip-toolkit/blob/master/demo/src/CardsExample/UserGrid.js#L44) |

## 让大小渐变更容易

一些其他的 FLIP 库只提供了位置渐变, 但[如果你可以同时做大小渐变的话](#demos)事情会变得更有趣.

<a href="https://codepen.io/aholachek/pen/mKXBJR?editors=0110">
<img src="../../example-assets/nested-example.gif" width='600px' alt='an animation demoing nested scale transforms' />
</a>

[在Codepen中查看](https://codepen.io/aholachek/pen/mKXBJR)

缩放动画的问题与子节点有关 - 如果你将div扩展2倍，你也会通过缩放它来扭曲它所拥有的任何孩子，从而创建一个奇怪的动画。 这就是为什么这个库允许你用一个带有`inverseFlipId`的`Flipped`组件来包装孩子来抵消父变换的原因：

```jsx
<Flipped flipId={parentFlipId}>
  <div>
    <Flipped inverseFlipId={parentFlipId} scale>
      <div>some text that will not be warped</div>
    </Flipped>
  </div>
</Flipped>
```

默认情况下，父级的缩放和平移变换都将被抵消（这允许子组件在不受父级影响的情况下制作自己的FLIP动画）。

但是对于大多数情况下，您还需要另外指定`scale` prop以限制对比例的调整并允许定位与父项一起移动。


**为了达到最佳的字元素逆转效果* 应用了逆变换的DOM元素应该与其父容器齐平并且 -- 这意味着任何padding应该应用于倒置容器而不是父容器。

## 代码库详情

- ~8.5kb minified and gzipped
- React 16+
- 测试覆盖 latest Chrome, Firefox, Safari, and Edge. Seems to work ok in IE 11.
- 实用 [Rematrix](https://github.com/jlmakes/rematrix) 来计算 matrix , [Wobble](https://github.com/skevy/wobble) 做 spring 物理动画, 另外还有个定制版本的 [Shifty](https://github.com/jeremyckahn/shifty) 用于补间动画

## FAQ

- **为什么没有动?**
  - 当你需要做动画的时候请确保更新了`Flipper`组件的 `flipKey` 属性.
  - 如果 `Flipped`包装的是React组件 而不是DOM 元素, 则需要确保这个React组件会把未知的prop传递到它的DOM元素, 例如: `<div className="square" {...rest} />`

- **为什么我的动画看起来好像没有过度?**
  - 如果你使用的是easing, 尝试一个超长的过度时间，例如 `10000` 这样你就可以捕捉到每一个细节. 动画做的太快的时候我们无法捕捉到影响它的许多因素.
  - 如果还是没有效果, 你可以尝试[实验中的 `debug` prop](#props) .

- **为什么动画做到了一个预期之外的位置？?**
  - 不论何时， 一个`flipId`在页面中只能有一个 . 如果有多个`Flipped`使用了相同的id, 就会发生奇怪的事情. 请确保 `flipId` 都是唯一的.
