export const Filters = {
  ALL: 'All',
  COMPLETE: 'Complete',
  INCOMPLETE: 'Incomplete'
}

export const applyFilter = (filter) => (item) => filter === Filters.ALL
  ? true
  : filter === Filters.COMPLETE
    ? item.complete !== null
    : item.complete === null
