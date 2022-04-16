function sortByWay(way) {
  if (way === '_idByDesc') {
    return { _id: 'desc'}
  }

  if (way === 'nameByAsc') {
    return { name: 'asc' }
  }

  if (way === 'nameByDesc') {
    return { name: 'desc' }
  }

  if (way === 'name_enByAsc') {
    return { name_en: 'asc' }
  }

  if (way === 'name_enByDesc') {
    return { name_en: 'desc' }
  }

  if (way === 'categoryByAsc') {
    return { category: 'asc' }
  }

  if (way === 'categoryByDesc') {
    return { category: 'desc' }
  }
}

module.exports = sortByWay