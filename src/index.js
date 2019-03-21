module.exports = function solveSudoku(matrix) {

  let len = matrix[0].length
  let resultMatrix = []
  resultMatrix = matrix.map(row => [...row])

  function searchInRow (row, num) {
    if (matrix[row].indexOf(num) > -1) {
      return true
    }

    if (resultMatrix[row].indexOf(num) > -1 ) {
      return true
    }

    return false
  }

  function searchInColumn (col, num) {
    for (let i=0; i<len; i++) {
      if (matrix[i][col] === num) {
        return true;
      }
    }

    for (let i=0; i<len; i++) {
      if (resultMatrix[i][col] === num) {
        return true;
      }
    }

    return false;
  }

  function searchInSquare (row, col, num) {
    let sizeSquare = 3

    let countSquare = Math.trunc(row/sizeSquare)
    const startRow = countSquare * sizeSquare

    countSquare = Math.trunc(col/sizeSquare)
    const startCol = countSquare * sizeSquare

    for (i=startRow; i<startRow+3; i++) {
      for (j=startCol; j<startCol+3; j++) {
        if (matrix[i][j] === num || resultMatrix[i][j] === num) {
          return true;
        }
      }
    }

    return false;
  }

  function findCurrentNumber (row, col) {
    for (num=resultMatrix[row][col]+1; num<=9; num++) {
      if (!searchInColumn(col, num)) {
        if (!searchInRow(row, num)) {
          if (!searchInSquare(row, col, num)) {
            return num            
          }
        }
      }
    }

    return -num; // or num <0
  }

  let queue = []

  for (let row=0; row<len; row++) {
    for (let col=0; col<len; col++) {
      if (matrix[row][col] === 0) {
        let newNumber = findCurrentNumber (row, col)
        if (newNumber > 0) {
          resultMatrix[row][col] = newNumber
          queue.push((row+1)*10+(col+1))
        } else {
          resultMatrix[row][col] = 0
          position = queue.pop()
          row = Math.trunc(position / 10)
          col = position - row*10 - 1//prev element because 'for' do +1 for col
          col--
          row--
        }
      }
    }
  }

  return resultMatrix
}