
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
- [Quick start](#quick-start)
  - [Simplest example: tweening a single element](#simplest-example-tweening-a-single-element)
  - [More useful: tweening different elements](#more-useful-tweening-different-elements)
- [The Components](#the-components)
  - [1. `Flipper`](#1-flipper)
    - [Props](#props)
  - [2. `Flipped`](#2-flipped)
    - [Basic props](#basic-props)
    - [Callback props](#callback-props)
    - [Transform props](#transform-props)
    - [Advanced props](#advanced-props)
- [Scale transitions made eas(ier)](#scale-transitions-made-easier)
- [Library details](#library-details)
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

- [Updating list (`react-flip-move` example clone)](https://literate-fly.surge.sh/flip-move)
- [Simplest possible example](https://codepen.io/aholachek/pen/oyKJgL)
- [Guitar shop](https://literate-fly.surge.sh/guitar)
- [Absurd, overly complex, nested example](https://literate-fly.surge.sh/cards)
- [React-flip-toolkit logo](https://codepen.io/aholachek/pen/ERRpEj)
- [Spring and easing options](https://codepen.io/aholachek/full/bKmZbV/)

## Quick start

`npm install react-flip-toolkit`

Wrap your container element with a `Flipper` component that has a `flipKey` prop that changes every time an animation should happen.

Wrap elements that should be animated with `Flipped` components that have `flipId` props matching them across renders.

### Simplest example: tweening a single element

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

[view on Codepen](https://codepen.io/aholachek/pen/oyKJgL)

### More useful: tweening different elements

The power of FLIP lies in smoothly tweening two completely separate elements to appear as if they are one:

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


## The Components

### 1. `Flipper`

The parent wrapper component that contains all the elements to be animated.

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
