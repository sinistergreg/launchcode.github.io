const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let myRover = new Rover(12000);
    expect(myRover.position).toEqual(12000);
    expect(myRover.mode).toEqual('NORMAL');
    expect(myRover.generatorWatts).toEqual(110);
  });

  //test 8

  it("response returned by receiveMessage contains name of message", function() {
    let message = new Message("MSG005", []);
    let rover = new Rover(42);
    let response = rover.receiveMessage(message);
    
    expect(response.message).toEqual("MSG005");
  });

//test 9

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let myCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let myMessage = new Message('Test message with two commands', myCommands);
    let myRover = new Rover(98382);
    
    let response = myRover.receiveMessage(myMessage);
    expect(response.results.length).toEqual(2);
  
  });

 //test 10
  
  it("responds correctly to status check command", function() {
    let myCommands = [new Command('STATUS_CHECK')];
    let myMessage = new Message('Routine status check', myCommands);
    let myRover = new Rover(98382);

    let response = myRover.receiveMessage(myMessage);
    
    expect(response.results[0].completed).toBeTrue();
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  });
  
  //test 11

  it("responds correctly to mode change command", function() {
        let myCommands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let myMessage = new Message('Change mode to normal', myCommands);
    let myRover = new Rover(98382);

    let response = myRover.receiveMessage(myMessage);

    expect(response.results[0].completed).toBeTrue();
    expect(myRover.mode).toEqual('LOW_POWER');
  });

//test 12

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let myCommands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let myMessage = new Message('Change mode to low power', myCommands);
    let myRover = new Rover(98382);

    let response = myRover.receiveMessage(myMessage);

    expect(response.results[0].completed).toBeFalse();
    expect(myRover.mode).toEqual('NORMAL');
  });

//test 13

  it("responds with position for move command", function() {
    let myCommands = [new Command('MOVE', 12000)];
    let myMessage = new Message('Move position to 12000', myCommands);
    let myRover = new Rover(98382);

    let response = myRover.receiveMessage(myMessage);

    expect(response.results[0].completed).toBeTrue();
    expect(myRover.position).toEqual(12000);
  });
});
