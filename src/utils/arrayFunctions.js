export function countDuplicatedItemsArray(valueToFind, array) {
  let count = 0
  array.forEach(function (element) {
    if (element == valueToFind) {
      count++
    }
  })

  return count
}


export function removeItemArray(array, itemToRemove) {
  if (array.indexOf(itemToRemove) > -1) {
    array.splice(array.indexOf(itemToRemove), 1)
  }

  return array
}


export function removeArrayDuplicates(array) {
  return Array.from(new Set(array))
}