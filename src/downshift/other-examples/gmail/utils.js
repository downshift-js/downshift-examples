import matchSorter from 'match-sorter'
import starWarsNames from 'starwars-names'

const allContacts = starWarsNames.all.map(s => ({
  name: s,
  email: `${s.toLowerCase().replace(/[ ']/g, '.')}@smail.com`,
  id: s.toLowerCase(),
}))

function getContacts(searchValue, {omitContacts = [], limit} = {}) {
  const remainingContacts = allContacts.filter(
    c => !omitContacts.some(sc => sc && sc.id === c.id),
  )
  const sortedContacts = searchValue
    ? matchSorter(remainingContacts, searchValue, {
        keys: ['name'],
      })
    : remainingContacts
  const limitedContacts = limit
    ? sortedContacts.slice(0, limit)
    : sortedContacts
  return limitedContacts
}

function fetchContacts(searchValue, {omitContacts, limit, requestId} = {}) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        response: {
          data: getContacts(searchValue, {omitContacts, limit}),
          requestId,
        },
      })
    }, Math.random() * 1000)
  })
}

export {fetchContacts, getContacts}
