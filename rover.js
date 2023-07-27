class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }
 
   recieveMessage(message) {
     let response = {
       message: message.name,
       results: []
     }
     if(message.commands) {
       for(let i = 0; i < message.commands.length; i++) {
 
         if(message.commands[i].commandType === 'STATUS_CHECK') {
           response.results.push({
             completed: true,
             roverStatus: {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
             }
           });
         } else if(message.commands[i].commandType === 'MOVE') {
           this.position = message.commands[i].value;
           response.results.push({
             completed: true
           });
         } else if(message.commands[i].commandType === 'MODE_CHANGE') {
           if(message.commands[i].value === 'NORMAL') {
             this.mode = message.commands[i].value
             response.results.push({
               completed: true
             });
           } else {
             response.results.push({
               completed: false
             });
           }
         }
         
       }
     }
 
     return response;
   }
 }

module.exports = Rover;