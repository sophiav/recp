// Takes an array and splits it into a new array of threes
function sliceInThrees(arr) {
  let slicedArray = [];

  while(arr.length) { // stop when there are no more items in arr
    const result = arr.splice(0, 3); // every slice is 3
    slicedArray.push(result); // add the result to the new array
  }

  return slicedArray;
}
