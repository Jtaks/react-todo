import React, { useState, useCallback, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTransition, config } from 'react-spring'
import nanoid from 'nanoid'
import { applyFilter, Filters } from './utils'
import { ListItem } from './components/ListItem'
import Pill from './components/Pill'
import ListView from './components/ListView'
import { ThemeContext, defaultContext } from './ThemeContext'

const { modes, theme } = defaultContext

export const App = (initProps) => {
  const inputRef = useRef()

  const [themeMode, setThemeMode] = useState(modes.LIGHT)
  const [text, setText] = useState(initProps.text)
  const [items, setItems] = useState(initProps.items)
  const [currentFilter, setCurrentFilter] = useState(initProps.filter)


  const filterCallback = useMemo(
    () => applyFilter(currentFilter),
    [currentFilter]
  )

  const listTransitions = useTransition(
    items.filter(filterCallback),
    (item) => item.id,
    {
      config: config.stiff,
      from: { opacity: 0, height: 0 },
      enter: { opacity: 1, height: 'auto' },
      update: { opacity: 1, height: 'auto' },
      leave: { opacity: 0, height: 0 },
      unique: true
    }
  )

  const nonIdealStateTransition = useTransition(
    ['There\'s nothing here!'],
    null,
    {
      config: config.stiff,
      from: { opacity: 0, height: 0 },
      enter: { opacity: 1, height: 'auto' },
      update: { opacity: 1, height: 'auto' },
      leave: { opacity: 0, height: 0 },
      unique: true
    }
  )

  const addToList = useCallback(() => {
    if (text.length > 0) {
      setItems((items) => [
        ...items,
        { id: nanoid(4), value: text, complete: null }
      ])
      setText('')
      inputRef.current.focus()
    }
  }, [text, setItems, setText])

  const toggleComplete = useCallback(
    (id) =>
      setItems((is) => {
        const doneIndex = is.findIndex((i) => i.id === id)
        if (doneIndex === -1) {
          return is
        }
        const newItems = [...is]
        const isComplete = newItems[doneIndex].complete !== null
        newItems[doneIndex].complete = isComplete ? null : Date.now()
        return newItems
      }),
    [setItems]
  )

  const remove = useCallback(
    (id) => setItems((is) => [...is.filter((i) => i.id !== id)]),
    [setItems]
  )

  const toggleTheme = useCallback(
    () =>
      setThemeMode((prev) => (prev === modes.LIGHT ? modes.DARK : modes.LIGHT)),
    [setThemeMode]
  )

  return (
    <ThemeContext.Provider
      value={{ modes, theme: theme[themeMode], toggleTheme }}>
      <div
        style={{
          height: '100%',
          paddingTop: '32px',
          backgroundColor: theme[themeMode].elevation.one.backgroundColor
        }}>
        <div
          style={{
            margin: 'auto',
            maxWidth: '600px',
            overflow: 'hidden',
            backgroundColor: theme[themeMode].elevation.two.backgroundColor,
            color: theme[themeMode].color.default,
            boxShadow: theme[themeMode].elevation.two.boxShadow
          }}>
          <header>
            {/* Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                width: '100%'
              }}>
              <input
                ref={inputRef}
                style={{
                  flexGrow: 1,
                  border: 'none',
                  fontSize: '1.25em',
                  fontWeight: '100',
                  backgroundColor: 'transparent',
                  color: theme[themeMode].color.default
                }}
                value={text}
                placeholder="What has to be done?"
                onChange={(e) => setText(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    addToList()
                  }
                }}
              />
              <i
                style={{
                  fontSize: '2em',
                  color: theme[themeMode].color.subtle,
                  cursor: 'pointer',
                  marginLeft: '16px'
                }}
                className="material-icons"
                onClick={addToList}>
                add
              </i>
              <i
                style={{
                  fontSize: '1.65em',
                  color: theme[themeMode].color.subtle,
                  cursor: 'pointer',
                  marginLeft: '16px'
                }}
                className="material-icons"
                onClick={() => toggleTheme()}>
                {themeMode === modes.LIGHT ? 'brightness_5' : 'brightness_2'}
              </i>
            </div>
            {/* PillBox */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '8px'
              }}>
              <Pill
                style={{
                  border:
                    currentFilter === Filters.ALL
                      ? `1px solid ${theme[themeMode].color.muted}`
                      : 'initial'
                }}
                onClick={() => setCurrentFilter(Filters.ALL)}
                text={Filters.ALL}
              />
              <Pill
                style={{
                  border:
                    currentFilter === Filters.COMPLETE
                      ? `1px solid ${theme[themeMode].color.muted}`
                      : 'initial'
                }}
                onClick={() => setCurrentFilter(Filters.COMPLETE)}
                text={Filters.COMPLETE}
              />
              <Pill
                style={{
                  border:
                    currentFilter === Filters.INCOMPLETE
                      ? `1px solid ${theme[themeMode].color.muted}`
                      : 'initial'
                }}
                onClick={() => setCurrentFilter(Filters.INCOMPLETE)}
                text={Filters.INCOMPLETE}
              />
            </div>
          </header>
          {/* List */}
          <ListView
            nonIdealState={nonIdealStateTransition.map((transition) => (
              <ListItem
                key={transition.key}
                style={{
                  color: theme[themeMode].color.disabled,
                  backgroundColor:
                    theme[themeMode].elevation.three.backgroundColor
                }}
                transition={transition}
                noDrag={true}
              />
            ))}
            noDividers>
            {listTransitions.map((transition) => (
              <ListItem
                key={transition.key}
                transition={transition}
                toggleComplete={toggleComplete}
                remove={remove}
              />
            ))}
          </ListView>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  filter: PropTypes.oneOf([Filters.ALL, Filters.COMPLETE, Filters.INCOMPLETE])
}

App.defaultProps = {
  items: [],
  text: '',
  filter: Filters.INCOMPLETE
}
