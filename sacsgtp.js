const messages = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send');
const titleText = document.getElementById('welcome');

let firstMessageSent = false;




function generateDirections(originRoom, directionRoom) {
  let botResponse
    if (originRoom && directionRoom) {
        let originBuilding = building.get(originRoom);
        let directionBuilding = building.get(directionRoom);


        let originLevel = levels.get(originRoom);
        let directionLevel = levels.get(directionRoom);

        let originSubArea = sub_area.get(originRoom);
        let directionSubArea = sub_area.get(directionRoom);
        
        if (originRoom === directionRoom) { //SAME ROOM
          botResponse = "That's the same room!"
        } else {

          if (originBuilding === directionBuilding) {
            if (originLevel === directionLevel) {
              
                  if (originSubArea === directionSubArea) { //SAME AREA
                    botResponse = `${directionRoom} is very close to ${originRoom}, please take a look around.`;
                  }
                  else { //SAME LEVEL
                    
                    botResponse = `${to_mid.get(originRoom).charAt(0).toUpperCase()}${to_mid.get(originRoom).slice(1)}. `;
                    botResponse = botResponse + `${from_mid.get(directionRoom).charAt(0).toUpperCase()}${from_mid.get(directionRoom).slice(1)} to reach ${directionRoom}. `;
  
                  }

            } else {
              if (originBuilding === "SAH") { //SAH WITHIN
                
                
                botResponse = `${to_mid.get(originRoom).charAt(0).toUpperCase()}${to_mid.get(originRoom).slice(1)}. `;
                
                if (originLevel === 0) {
                  botResponse = botResponse + `Use the lift and the fire stairs to reach Level ${directionLevel}. `
                } else {
                  if (originLevel > directionLevel) {
                    botResponse = botResponse + `Use the East fire stairs to reach Level ${directionLevel}. `
                  } else {
                    botResponse = botResponse + `Use the West fire stairs to reach Level ${directionLevel}. `
                  }
                }

                botResponse = botResponse + `${from_mid.get(directionRoom).charAt(0).toUpperCase()}${from_mid.get(directionRoom).slice(1)} to reach ${directionRoom}. `;
                
              } else if (originBuilding === "BBC") { //BBC WITHIN

                  
                  botResponse = `${to_mid.get(originRoom).charAt(0).toUpperCase()}${to_mid.get(originRoom).slice(1)}. `;

                  if (originLevel > 0) {
                    if (directionLevel > 0) {
                      if (directionSubArea === "not_library") {
                        botResponse = botResponse + `Use the East fire stairs to reach Level ${directionLevel}. `
                      }
                      else {
                        botResponse = botResponse + `Use the fire stairs to reach Level ${directionLevel}. `
                      }
                    } else if (directionLevel === 0) {
                      botResponse = botResponse + `Use the fire stairs to reach Level 1, then use the main staircase to reach Ground floor. `
                    } else if (directionLevel < 0) {
                      botResponse = botResponse + `Use the fire stairs to reach Level 1, then use the main staircase to reach the Ground floor. Exit the BBC, then travel down the dual staircases to Lower Ground. `
                    }
                  } else if (originLevel === 0) {
                    if (directionLevel > 0) {
                      if (directionLevel === 1) {
                        botResponse = botResponse + `Use the main staircase to reach Level 1. `
                      } else {
                        if (directionSubArea === "not_library") {
                          botResponse = botResponse + `Use the main staircase to reach Level 1, then use the East fire stairs to reach Level ${directionLevel}. `
                        } else {
                          botResponse = botResponse + `Use the main staircase to reach Level 1, then use the fire stairs to reach Level ${directionLevel}. `
                        }
                      }
                    } else if (directionLevel < 0) {
                      botResponse = botResponse + `Walk through the BBC Plaza, then travel down the dual staircases to Lower Ground. `
                    } 
                  } else if (originLevel < 0) {
                    if (directionLevel > 0) {
                      botResponse = botResponse + `Use the dual staircases to reach the BBC Plaza, then enter the BBC and use the main staircase to reach Level 1. Use the fire stairs to reach Level ${directionLevel}. `
                    } else if (directionLevel === 0) {
                      if (directionSubArea === "far_plaza") {
                        botResponse = botResponse + `Use the dual staircases to reach the BBC Plaza. `
                      } else if (directionSubArea === "bbc_foyer_area") {
                        botResponse = botResponse + `Use the dual staircases to reach the BBC Plaza, then enter the BBC. `
                      }
                    }
                  
                  }

                   
                  botResponse = botResponse + `${from_mid.get(directionRoom).charAt(0).toUpperCase()}${from_mid.get(directionRoom).slice(1)} to reach ${directionRoom}. `;
                  
              } else {
                botResponse = "bro wtf";
              }
                
            }
            
            
            
          } else {
            
            //other building 
            
            if (originBuilding === "BBC") { //FROM BBC
              botResponse = `${to_mid.get(originRoom).charAt(0).toUpperCase()}${to_mid.get(originRoom).slice(1)}. `;

              if (originLevel === -1) {
                botResponse = botResponse + "Exit the design centre and turn right towards the staircases. "
              }  
              else if (originLevel === 0) {
                botResponse = botResponse + "Exit the BBC towards the plaza. "
              }
              else if (originLevel > 1) {
                botResponse = botResponse + "Walk down the fire stairs to Level 1, then walk down the main staircase near reception to the BBC entrance. "
              }
              else {
                botResponse = botResponse + "Walk down the main staircase near reception to the BBC entrance. "
              }
                
              botResponse = botResponse + `Travel to the SAH by crossing Kent Street and walking through Sydney square. `

              if (directionLevel > 0) {
                botResponse = botResponse + `Use the lift and/or fire stairs to travel to Level ${directionLevel}. `
              }

              botResponse = botResponse + `${from_mid.get(directionRoom).charAt(0).toUpperCase()}${from_mid.get(directionRoom).slice(1)} to reach ${directionRoom}. `;


            } else if (originBuilding === "SAH") { //FROM SAH
              
              botResponse = `${to_mid.get(originRoom).charAt(0).toUpperCase()}${to_mid.get(originRoom).slice(1)}. `;
              
              
              if (originLevel >= 4) {
                botResponse = botResponse + "Use the East Stairs to travel to ground floor and exit the SAH. ";
              }

              botResponse = botResponse + `Travel to the BBC by walking through Sydney square and crossing Kent Street. `
              
              if (directionLevel > 1) {
                botResponse = botResponse + `Enter the BBC through the main entrance and walk up the main staircase to Level 1. Then use the fire stairs to reach Level ${directionLevel}. `
              } else if (directionLevel === 0) {
                if (directionRoom.startsWith("bg")) {
                  botResponse = botResponse + `Walk through past the main entrance to the classrooms at the far end of the BBC Plaza. `
                } else {
                  botResponse = botResponse + `Enter the BBC through the main entrance and walk towards the hallway on the right. `
                }
              } else if (directionLevel < 1) {
                botResponse = botResponse + `Use one of the two staircases outside of the BBC to travel down to the Design Centre. `
              }

              botResponse = botResponse + `${from_mid.get(directionRoom).charAt(0).toUpperCase()}${from_mid.get(directionRoom).slice(1)} to reach ${directionRoom}. `;
  

            } else {
              botResponse = "bro wtf";
            }
          }
        }
      } else {
        botResponse = "bro wtf";
      }
  return botResponse;
}


function appendMessage(text, sender) {
  const msgEl = document.createElement('div');
  msgEl.classList.add('message', sender);

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  msgEl.appendChild(bubble);
  messages.appendChild(msgEl);
  messages.scrollTop = messages.scrollHeight;
}

let directionRoom = null;
let originRoom = null;
let bothRooms = false;




function processRequest() {
  const text = userInput.value.trim();
  if (!text) return;

  if (!firstMessageSent) {
    titleText.style.display = 'none';
    firstMessageSent = true;
  }

  appendMessage(text, 'user');
  userInput.value = '';

  let bbcWeight = 0;
  let greetingWeight = 0;
  let essayWeight = 0;
  let bruzWeight = 0;
  

  const new_text = text.toLowerCase();

  new_text.replace("auditorium","bbca")
  new_text.replace("gymnasium","gym")

  let botResponse = ""; 








  let split_text = new_text.split(" ");

  if (new_text.includes("\"?\"")) {
        botResponse = "I see how it is. "
  } else if (new_text == "?") {
        botResponse = "To request directions, enter in the format \"room1 to room2\" (e.g. s523 to b409). For a list of valid rooms, use ?roomlist. You can also ask for the BBC passcode";
  } else if (classrooms.includes(split_text[0]) && classrooms.includes(split_text[2]) && split_text[1] == "to") {
        originRoom = split_text[0];
        directionRoom = split_text[2];
        botResponse = generateDirections(originRoom, directionRoom);
        originRoom = null;
        directionRoom = null;
  } else if (new_text == "?roomlist" || new_text == "? roomlist" || new_text == "roomlist") {
    botResponse = "Valid room inputs:\n" + classrooms.sort().join(", ") + ".";
  } else if (new_text == "salt air") {
    botResponse = "and the rust on your door";
  } else if (new_text == "never needed anything more") {
    botResponse = "just stop please";
  } else {
    for (const word of split_text) {
      if (greetings.includes(word)) {
        greetingWeight += 1;
      } else if (word == "bbc" || word == "passcode" || word == "code") {
        bbcWeight += 1;
      } else if (word == "essay" || word == "thesis" || word == "spo" || word == "paragraph" || word == "evaluate") {
        essayWeight += 1;
      } else if (word == "schoology" || word == "ep" || word == "edumate" || word == "timetable" || word == "subject" || word == "assessment" || word == "homework") {
        bruzWeight += 1;
      }
  
    }

    if (bbcWeight >= 2) {
      console.log("wtb");
      botResponse = "The passcode to enter the BBC is 1401#";
        
    } else if (greetingWeight >= 1) {
      botResponse = "Hello!";
    } else if (essayWeight >= 1) {
      botResponse = "Also try ChatGPT";
    } else if (bruzWeight >= 1) {
      botResponse = "I do not have the budget to answer your query."
    } else {
      botResponse = "I'm not sure I understand.";
    }
  }
  



  // Fallback for empty botResponse just before replacements and appendMessage
  if (!botResponse) {
    botResponse = "bro what";
  }

  botResponse = botResponse.replace("reach heath","reach the Heath Centre")
  botResponse = botResponse.replace("reach gym","reach the gym")
  botResponse = botResponse.replace("reach fairfax","reach the Fairfax Room")
  botResponse = botResponse.replace("reach black_box","reach the Black Box Theatre")
  botResponse = botResponse.replace("reach auditorium","reach the BBC Auditorium")
  botResponse = botResponse.replace("reach bbca","reach the BBC Auditorium")
  botResponse = botResponse.replace("reach health","reach the Health Centre")
  botResponse = botResponse.replace("reach ms_office","reach the Middle School Office")
  
  botResponse = botResponse.replace("reach sg","reach SG")
  botResponse = botResponse.replace("reach bg","reach BG")
  botResponse = botResponse.replace("reach blg","reach BLG")
  botResponse = botResponse.replace("reach b","reach B")
  botResponse = botResponse.replace("reach s","reach S")
  botResponse = botResponse.replace("reach cathedral","reach the Cathedral")
  botResponse = botResponse.replace("reach chapter","reach the Chapter House")
  botResponse = botResponse.replace("reach it_helpdesk","reach the IT Helpdesk")

  botResponse = botResponse.replace("to reach Bbc_reception","")
  botResponse = botResponse.replace("to reach Sah_reception","")
  botResponse = botResponse.replace("to reach Bbc_reception","")
  botResponse = botResponse.replace("to reach Sah_reception","")


  console.log("FINAL botResponse:", botResponse);
  appendMessage(botResponse, 'bot');
}

sendButton.addEventListener('click', processRequest);
userInput.addEventListener('keypress', keypress => {
  if (keypress.key === 'Enter') {
    processRequest();
    // console.log(`originRoom: ${originRoom}`)
    // console.log(`directionRoom: ${directionRoom}`)
    // console.log(`bothRooms: ${bothRooms}`)
    console.log("john")
  } 
  
});
