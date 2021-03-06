import React, { Component } from "react"
import { Flipper, Flipped } from "../../../src"
import anime from "animejs"
import "./index.css"

const data = [
  { id: 1, title: "Somebody once told me" },
  { id: 2, title: "The World was gonna roll me" },

  { id: 3, title: "I aint the sharpest tool in the shed" },
  {
    id: 4,
    title: "She was looking kind of dumb with her finger and her thumb"
  },
  { id: 5, title: "In the Shape of an L on her Forehead" },
  { id: 6, title: "Well the years start coming and they don't stop coming" },
  { id: 7, title: "Fell to the floor but I hit the ground running" }
]

const onElementAppear = type => (el, index) => {
  anime({
    targets: el,
    opacity: [0, 1],
    duration: 400,
    delay: index * 50,
    easing: "easeOutSine"
  })
}

const onExit = type => (el, index, removeElement) => {
  anime({
    targets: el,
    scaleY: type === "list" ? 0 : 1,
    scaleX: type === "grid" ? 0 : 1,
    duration: 200,
    complete: removeElement,
    easing: "easeOutSine"
  }).pause

  return () => {
    el.style.opacity = ""
    removeElement()
  }
}

class ListExample extends Component {
  state = { type: "list", sort: "ascending", filteredIds: [] }

  render() {
    return (
      <div className="fm-example">
        <h1>react-flip-move example clone</h1>
        <Flipper
          flipKey={`${this.state.type}-${this.state.sort}-${JSON.stringify(
            this.state.filteredIds
          )}`}
          spring={{ mass: 0.3 }}
        >
          <div className="fm-fieldsets">
            <fieldset>
              <legend>Sort</legend>
              <label
                onClick={() => {
                  this.setState({
                    sort: "ascending"
                  })
                }}
              >
                <input
                  type="radio"
                  name="sort"
                  checked={this.state.sort === "ascending"}
                />
                ascending
              </label>
              <label
                onClick={() => {
                  this.setState({
                    sort: "descending"
                  })
                }}
              >
                <input
                  type="radio"
                  name="sort"
                  checked={this.state.sort === "descending"}
                />
                descending
              </label>
            </fieldset>

            <fieldset>
              <legend>Type</legend>
              <label
                onClick={() => {
                  this.setState({
                    type: "grid"
                  })
                }}
              >
                <input
                  type="radio"
                  name="type"
                  checked={this.state.type === "grid"}
                />
                grid
              </label>
              <label
                onClick={() => {
                  this.setState({
                    type: "list"
                  })
                }}
              >
                <input
                  type="radio"
                  name="type"
                  checked={this.state.type === "list"}
                />
                list
              </label>
            </fieldset>

            {!!this.state.filteredIds.length && (
              <button
                className="fm-show-all"
                onClick={() => {
                  this.setState({
                    filteredIds: []
                  })
                }}
              >
                show all cards
              </button>
            )}
          </div>

          <Flipped flipId="list">
            <div className={this.state.type === "grid" ? "fm-grid" : "fm-list"}>
              <Flipped inverseFlipId="list">
                <ul className="list-contents">
                  {[...data]
                    .filter(d => !this.state.filteredIds.includes(d.id))
                    .sort((a, b) => {
                      if (this.state.sort === "ascending") {
                        return a.id - b.id
                      } else {
                        return b.id - a.id
                      }
                    })
                    .map(({ title, id }, i) => {
                      const flipId = `item-${id}`
                      const delay = i * 45
                      return (
                        <Flipped
                          flipId={flipId}
                          onAppear={onElementAppear(this.state.type)}
                          onExit={onExit(this.state.type)}
                          key={flipId}
                          delay={delay}
                        >
                          <li className="fm-item">
                            <Flipped inverseFlipId={flipId} scale>
                              <div>
                                <div>
                                  <h3>{title}</h3>
                                  <p>{title}</p>
                                </div>

                                <button
                                  className="fm-remove"
                                  onClick={() => {
                                    this.setState(prevState => {
                                      return {
                                        filteredIds: prevState.filteredIds.concat(
                                          id
                                        )
                                      }
                                    })
                                  }}
                                >
                                  &times;
                                </button>
                              </div>
                            </Flipped>
                          </li>
                        </Flipped>
                      )
                    })}
                </ul>
              </Flipped>
            </div>
          </Flipped>
        </Flipper>
      </div>
    )
  }
}

export default ListExample
