

function ips(input){
    let ipOutput = [];
    for(let i = 0; i < input.length; i++){
        let ipList = [];
        ipGenerator(input[i], ipList, []);
        ipOutput.push(ipList);
    }
    return ipOutput;
}

function ipGenerator(currentIp, ipList, visited){
    let funcIp = currentIp.slice(0);
    if(JSON.stringify(visited).indexOf(JSON.stringify(funcIp))!==-1){
        return;
    }
    if(checkIp(funcIp))
    {
        ipList.push(funcIp.join('.'));
    }
    if(funcIp.length<4){
        
        funcIp.splice(funcIp.length-1, 0, funcIp[funcIp.length-1].substring(0,1));
        funcIp[funcIp.length-1] =funcIp[funcIp.length-1].substring(1); 
        ipGenerator(funcIp, ipList, visited);
    }
    else if(funcIp.length===4){
        
        for(let i = 3; i>0; i--){
            if(funcIp[i].length>1)
            {
                funcIp[i-1] += funcIp[i][0]
                funcIp[i] = funcIp[i].substring(1)
                ipGenerator(funcIp, ipList, visited)
            }
        }
    }
    visited.push([funcIp]);
}

function checkIp(ip){

    return ip.length===4 && ip.reduce((prev, curr)=> prev && parseInt(curr)>=0 && parseInt(curr)<=255 && curr[0]!=='0', true);
}

module.exports = ips;