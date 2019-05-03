module.exports = function dijkstra(input){
    let res = []
    for(let i = 0; i < input.length; i++){
        const start = parseInt(input[i][0]);
        let matrix = []
        for(let j = 1; j < input[i].length; j++){
            matrix.push(input[i][j].split(' ').map(val=>parseFloat(val)));
        }
        let visited = matrix.map(v=>false);
        let distance = matrix.map(v=>Number.POSITIVE_INFINITY)
        let from = matrix.map(v=>-1)

        distance[start] = 0;
        
        for(let j = 0; j < matrix.length; j++){
            let key = minDistance(distance, visited);
            visited[key] = true;

            for(let k = 0; k < matrix.length; k++){
                if(matrix[key][k] > 0 && !visited[k] && distance[k] > distance[key] + matrix[key][k])
                {
                    distance[k] = distance[key] + matrix[key][k];
                    from[k] = key;
                }
            }

        }
        generateMatrix(matrix, from);
        
        const output = matrix.map(row => row.slice());
        res.push(output.map(row=>row.join(' ')).join('\n'))
    }
    return res;
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
    for(let i = from.length-1; i>=0; i--){
        for(let j = 0; j < from.length; j++){
            if(from[i] === j){
                matrix[j][i] = matrix[i][j];
            }
            else{
                matrix[i][j] = 0;
            }
        }
    }
    for(let i = 0; i<matrix.length; i++){
        for(let j = i+1; j< matrix.length; j++){
            if(matrix[i][j]!==0){
                matrix[j][i] = matrix[i][j]
            }
            else if(matrix[j][i]!==0){
                matrix[i][j] = matrix[j][i]
            }
        }
    }
}
