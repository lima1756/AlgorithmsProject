module.exports = function trains(data){
    let answers = [];
    for(let i =0; i<data.input.length; i++){
        for(let j =0; j < data.input[i].length; j++){
            data.input[i][j] = data.input[i][j].split(',').map(val=>parseInt(val));
        }
        let days = []
        
        for(let j = 0; j < data.input[i][0][data.input[i][0].length-1]+1; j++) {
            days.push(0);
        }
        
        for(let j = 1; j< days.length; j++){
            if(data.input[i][0].indexOf(j)!==-1){
                days[j] = days[j-1] + data.input[i][1][0];
                const rollback7 = j>=7?j-7:0;
                const rollback30 = j>=30?j-30:0;
                if(days[j]>days[rollback7]+data.input[i][1][1] && (j >= 7 || j === days.length-1)){
                    days[j]=days[rollback7]+data.input[i][1][1];
                }
                if(days[j]>days[rollback30]+data.input[i][1][2] && (j>=30 || j==days.length-1)){
                    days[j]=days[rollback30]+data.input[i][1][2];
                    
                }
            }
            else{
                days[j] = days[j-1];
            }
            
        }
        answers.push(days[days.length-1]);
    }
    return answers;
}