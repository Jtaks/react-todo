import React from 'react'

const addDividers = (children) =>
  children.reduce((dividedList, item, i, list) => {
    dividedList.push(item)
    if (i !== list.length - 1) {
      dividedList.push(
        <li
          style={{
            height: 0,
            padding: 0,
            margin: 0,
            borderBottom: '1px solid lightgrey'
          }}>
          &nbsp;
        </li>
      )
    }
    return dividedList
  }, [])

function ListView({ children, nonIdealState, noDividers }) {
  const list = noDividers ? children : addDividers(children)
  return <ul>{list && list.length ? list : nonIdealState}</ul>
}

export default ListView
