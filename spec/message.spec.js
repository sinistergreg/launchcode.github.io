const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect(function() { new Message(); }).toThrow(new Error("Name is required."));
      });
    
      it("constructor sets name", function() {
        let myMessage = new Message("Greg");
        
        expect(myMessage.name).toEqual("Greg")
      });
    
      it("contains a commands array passed into the constructor as 2nd argument", function() {
        let myCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let myMessage = new Message('Test message with two commands', myCommands);
        
        expect(myMessage.name).toEqual('Test message with two commands');
        expect(myMessage.commands.length).toEqual(2);
        expect(myMessage.commands[0].commandType).toEqual('MODE_CHANGE');
        expect(myMessage.commands[0].value).toEqual('LOW_POWER');
        expect(myMessage.commands[1].commandType).toEqual('STATUS_CHECK');
      });
    
    });