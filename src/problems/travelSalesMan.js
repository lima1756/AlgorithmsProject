module.exports = function travelSalesMan(input){
    let results = []
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < input[i].length; j++){
            input[i][j] = input[i][j].split(' ').map(val=>parseFloat(val));
            input[i][j][j] = Number.POSITIVE_INFINITY;
        }
        Node.upper = Number.POSITIVE_INFINITY;

        
        new Node(null, input[i])
        
        
        results.push(Node.upper);
        

    }
    return results;
}




class Node {

    constructor(current, matrix, cost, posibles){
        this.current = current;
        if(this.current === null){
            this.cost = this.matrixCost(matrix);
            let posibles = [];
            for(let i  = 1; i<matrix.length; i++){
                posibles.push(i);
            }
            this.children = [new Node(0, matrix, this.cost, posibles)]
            this.children[0].calculate();
        }
        else{
            this.posibles = posibles;
            this.cost = cost;
            this.matrix = matrix;
            this.children = [];
            this.visited = [];
        }
    }

    matrixCost(matrix){
        let cost = 0;
        for(let i = 0; i < matrix.length; i++ ){
            let min = Number.POSITIVE_INFINITY
            for(let j = 0; j < matrix.length; j++){
                if(matrix[i][j]<min){
                    min = matrix[i][j];
                }
            }
            if(min!==Number.POSITIVE_INFINITY){
                for(let k = 0; k < matrix.length; k++){
                    matrix[i][k]-= min;
                }
                cost += min;
            }
        }

        for(let i = 0; i < matrix.length; i++ ){
            let min = Number.POSITIVE_INFINITY
            for(let j = 0; j < matrix.length; j++){
                if(matrix[j][i]<min){
                    min = matrix[j][i];
                }
            }
            if(min!==Number.POSITIVE_INFINITY){
                for(let k = 0; k < matrix.length; k++){
                    matrix[k][i]-= min;
                }
                cost += min;
            }
        }
        return cost;
    }
    
    travelCost(from, to){
        return this.matrix[from][to];
    }

    calculate(){
        for(let i = 0; i < this.posibles.length; i++){
            let currentMatrix = this.matrix.map(row=>row.slice());
            for(let j = 0; j < currentMatrix.length; j++){
                currentMatrix[this.current][j] = Number.POSITIVE_INFINITY;
                currentMatrix[j][this.posibles[i]] = Number.POSITIVE_INFINITY;
            }
            currentMatrix[this.posibles[i]][this.current] = Number.POSITIVE_INFINITY;
            let cost = this.matrixCost(currentMatrix) + this.cost + this.travelCost(this.current, this.posibles[i]);
            this.children.push(new Node(this.posibles[i], currentMatrix, cost, this.generatePosible(this.posibles[i], this.posibles)))
        }
        let minIndex = this.obtainMinChildren();
        while(minIndex!==-1 && this.children[minIndex].cost<Node.upper){
            this.visited.push(this.children[minIndex]);
            this.children[minIndex].calculate();
            minIndex = this.obtainMinChildren();
        }
    }

    generatePosible(current, currentPosibles){
        let posibles = []
        for(let i = 0; i< currentPosibles.length; i++){
            if(currentPosibles[i]!==current){
                posibles.push(currentPosibles[i])
            }
        }
        return posibles;
    }

    obtainMinChildren(){
        let min = Number.POSITIVE_INFINITY;
        let minIndex = -1;
        if(this.children.length===0 && Node.upper > this.cost){
            Node.upper = this.cost;
        }
        for(let i = 0; i<this.children.length; i++){
            if(this.children[i].cost<min && this.visited.indexOf(this.children[i])===-1){
                min = this.children[i].cost;
                minIndex = i;
            }
        }
        return minIndex;
    }
}