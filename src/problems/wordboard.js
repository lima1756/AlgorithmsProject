function wordboard(input){
    let output = []
    for(let i = 0; i<input.length; i++){
        let [height,width] = input[i][0].split(' ');
        let matrix = []
        let partial = []
        for(let j = 0; j< height; j++){
            matrix.push(input[i][j+1].split(' '))
        }
        for(let j = parseInt(height)+1; j< input[i].length; j++){
            let wordResult = false;
            for(let k = 0; k<parseInt(height); k++){
                if(wordResult)
                    break;
                for(let l = 0; l<parseInt(width); l++){
                    let matrixCopy = JSON.parse(JSON.stringify(matrix))
                    if(solve(matrixCopy, input[i][j], k, l, 0, parseInt(height), parseInt(width)))
                    {
                        wordResult = true;
                        break;
                    }
                }
            }
            partial.push(wordResult);
        }
        output.push(partial);
    }
    return output;
}

function solve(matrix, word, i, j, charPos, height, width){
    if(i>height-1 || i<0 || j>width-1 || j< 0){
        return false;
    }
    if(charPos > word.length-1){
        return true;
    }

    if(matrix[i][j] === word[charPos]){
        let save = matrix[i][j];
        matrix[i][j] = ' ';

        if(solve(matrix, word, i+1, j, charPos+1, height, width) || solve(matrix, word, i-1, j, charPos+1, height, width) ||
            solve(matrix, word, i, j+1, charPos+1, height, width) || solve(matrix, word, i, j-1, charPos+1, height, width))
            return true;

        matrix[i][j] = save;
    }
}

module.exports = wordboard;