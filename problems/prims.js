module.exports = function prims(input){
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[i].length; j++){
            input[i][j] = input[i][j].split(' ').map(val=>parseFloat(val));

        }
        let visited = input[i].map(v=>false);
        let distance = input[i].map(v=>Number.POSITIVE_INFINITY)
        let from = input[i].map(v=>-1)

        distance[0] = 0;
        
        for(let j = 0; j < input[i].length; j++){
            let key = minDistance(distance, visited);
            visited[key] = true;

            for(let k = 0; k < input[i].length; k++){
                if(input[i][key][k] > 0 && !visited[k] && distance[k]> input[i][key][k])
                {
                    distance[k] = input[i][key][k];
                    from[k] = key;
                }
            }

        }
        generateMatrix(input[i], from);
        console.log(input[i]);
    }
}

function minDistance(distances, visited){
    let min = Number.POSITIVE_INFINITY;
    let minIndex = -1;
    for(let i = 0; i < distances.length; i++){
        if(distances[i]<min && !visited[i]){
            min = distances[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function generateMatrix(matrix, from){
    let sum = 0;
    console.log(from);
    for(let i = 0; i<matrix.length; i++){
        for(let j = i + 1; j<from.length; j++){
            if(from[j]!==i)
            {
                matrix[i][j] = 0;
                matrix[j][i] = 0;
            }
            else{
                sum+=matrix[i][j];
            }
        }
    }
    console.log(sum)
}
