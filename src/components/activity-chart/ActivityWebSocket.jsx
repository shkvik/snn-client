import { labels } from './ActivityData'

const debug = true; 


const StreamType = {
    FLOAT: 'float',
    LOGIC: 'logic'
}


const messageStreamFormat = {
    currentTs: [1,2,4],
    predictTs: [1,2,4]
}


function webSocketConnection(setData, streamType, tsGUID){
    try {
        const ws = new WebSocket('ws://192.168.0.131:8080');
        
        ws.onopen = () => {
            if(debug){
                console.log('WebSocket connection opened');
            }

            const messageFormat = {type,tsGUID}
                
            messageFormat.type = streamType,
            messageFormat.tsGUID
            
            ws.send(JSON.stringify(messageFormat));
        };
      
        ws.onclose = () => {
            if(debug){
                console.log(`WebSocket${ws.socket._socket._guid} connection closed`);
            }
          
        };
      
        ws.onmessage = (event) => {
            updatedData = JSON.parse(event.data);
            
            if(debug){
                console.log(updatedData);
            }

            const newData = {
                labels: labels,
                datasets: [
                    {
                        data: updatedData.currentTs,
                    },
                ]
            };
            
            setData(newData)
        };
        
    }
        catch(error){
        console.log(error);
    }
}
