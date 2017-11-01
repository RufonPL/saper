// Get elements
var boardWidth = Number(document.getElementById('boardWidth').value);
var boardHeight = Number(document.getElementById('boardHeight').value);
var bombsNumber = Number(document.getElementById('bombsNumber').value);
var bombsPosition = [];

function deployMines(firstClick){
  let random, i;
  let arrayAllPos=[];
//  console.log("firstClick = "+firstClick);

  // Get all possible bomb position, except position of players first click
  for (i=1; i<=(boardWidth*boardHeight); i++){
    if (i == firstClick){
      continue;
    }
    arrayAllPos.push(i);
  }

  // Get random bombs positions
  for (i = bombsNumber; i > 0; i--){
    random = Math.floor((Math.random() * (arrayAllPos.length)));
    bombPos = arrayAllPos[random];
    arrayAllPos.splice(random, 1);
    bombsPosition.push(bombPos);
    arrayAllPos.splice(arrayAllPos[random], 0);
  }

//  console.log(bombsPosition);
}


function checkForBomb(){
  let firstClick = this.classList;
  let checked = document.getElementById("fieldsChecked").innerHTML;
  let left = document.getElementById("fieldsLeft").innerHTML;

  let arrOfClasses = this.classList;
  let bombsNearbyFields = [];
  for (i = 0; i < arrOfClasses.length; i++) {
    value = arrOfClasses[i];
//    console.log(bombsPosition);
    if (value.substring(0,3) === "pos"){
      value = Number(value.replace("pos", ""));

      // Deploy mines after first click
      if (Number(checked) == 0){
          deployMines(value);
      }

      // Check for bombs
      if (Number(bombsPosition.indexOf(value)) == Number("-1")){
//        console.log("bez bomby");
        this.className += " checked";
        countedBombs = countNearbyBombs(value);
        this.innerHTML = countedBombs.nearbyBombs;

        // if nearby bombs = 0 we can clear nearby fields, because they are safe
        if (countedBombs.nearbyBombs == 0){
          console.log("ok, we have an emptyFields = 0");
          checkEmpty = countedBombs.emptyFields;
          console.log(checkEmpty);
          checkEmptyFields(countedBombs.emptyFields);

        } else {
          console.log("ok, bomb nearby = "+countedBombs.nearbyBombs);
        }

/*        if (countedBombs.nearbyBombs == 0){
          console.log("ok, we have an emptyFields");
          console.log(checkEmpty);

          for (inc = 0; checkEmpty.length > inc; inc++){
            countedBombs = countNearbyBombs(checkEmpty[inc]);
            console.log("countedBombs = ")
            console.log(countedBombs);
            if (countedBombs.nearbyBombs == 0){
              for (index = 0; countedBombs.emptyFields.length > index; index++){
                field = countedBombs.emptyFields[index];
                if (field <= 0){
                  continue;
                }

                console.log("wyciagamy empty field "+field);
                if (checkEmpty.indexOf(field) == Number("-1") && field > 0){
                  console.log(field+" bierzemy");
                  checkEmpty.push(field);
                }
                countedBombs = countNearbyBombs(field)
                field = document.getElementsByClassName("pos"+field);
                if (field[0].className.search("checked") < 0) {
                  field[0].innerHTML = countedBombs.nearbyBombs;
                  field[0].className += " checked";
                }

//                console.log(countedBombs.emptyFields);
/*                if (countedBombs.emptyFields[index] < 0 || checkEmpty.indexOf(countedBombs.emptyFields[index]) == "-1"){
                  continue;
                }
                checkEmpty.push(countedBombs.emptyFields[index]);*/
/*              } 
//              console.log(checkEmpty);
            } else {
              bombsNearbyFields.push(countedBombs);
              field = countedBombs.emptyFields[inc];
            }
          }
          console.log(bombsNearbyFields);
        }*/
      } else {
        kaboom(value);
        return;
      }
      this.removeEventListener('click', checkForBomb);
      break;
     }
  }
  // increment number of fields left, and clear fields
  left = Number(left) - 1;
  document.getElementById("fieldsLeft").innerHTML = left;
  if (left == 0) /*&& checked == ((boardWidth * boardHeight) - bombsNumber))*/{
    winner();
  }
  checked = Number(checked) + 1;
  document.getElementById("fieldsChecked").innerHTML = checked;  
}


function checkEmptyFields (array){
  console.log("inside checkEmptyFields");
  console.log(array);
  arrayEmptyFields = array;
  arrayNearBombFields = [];
  let maxFirstArray = arrayEmptyFields.length;
  console.log(arrayEmptyFields.length);
  for (let i = 0; i < arrayEmptyFields.length; i++){
    console.log("Main iterator = "+i);
    field = countNearbyBombs(arrayEmptyFields[i]);
    console.log(field);

    console.log(field.nearbyBombs);
    console.log(field.nearbyBombs == 0)
    console.log(arrayEmptyFields.indexOf(field.fieldPosition));
    console.log(arrayEmptyFields.indexOf(field.fieldPosition) == Number(-1));
    console.log(field.fieldPosition);
    console.log(field.fieldPosition > 0);

    if (field.nearbyBombs == 0 && arrayEmptyFields.indexOf(field.fieldPosition, maxFirstArray+1) == Number(-1) && field.fieldPosition > 0) {
      console.log("field ok to push");
      for (let j = 0; j < field.emptyFields.length; j++){
        arrayEmptyFields.push(field.emptyFields[j]);
      }
    }

    if (field.nearbyBombs > 0 && arrayNearBombFields.indexOf(field.fieldPosition) == Number(-1) && field.fieldPosition > 0) {    
      console.log("field not ok to push");
      for (let k = 0; k < field.emptyFields.length; k++){
        arrayNearBombFields.push(field.emptyFields[k]);
      }
    }
    console.log(field);

    console.log(field.fieldPosition+" empty fields")
    console.log(arrayEmptyFields);
    console.log(field.fieldPosition+" nearBombs fields")
    console.log(arrayNearBombFields);

    if (i > 100000){
      return;
    }
  }
}


function countNearbyBombs(value) {
  let number = 0;
  let element = 0;
  let arrayCheckNear = [];
  let emptyFields = [];
  //Check if cubes over element exists
  if ((value % boardWidth) != Number(1)){
    arrayCheckNear.push(value-boardWidth-1);
    arrayCheckNear.push(value+boardWidth-1);
    arrayCheckNear.push(value-1);
  }
  arrayCheckNear.push(value-boardWidth);
  if (value != (boardWidth*boardHeight)){
    arrayCheckNear.push(value+boardWidth);
  }
  if ((value % boardWidth) != Number(0)){
    arrayCheckNear.push(value-boardWidth+1);
    arrayCheckNear.push(value+boardWidth+1);
    arrayCheckNear.push(value+1);
  }

  for (i = 0; i < arrayCheckNear.length; i++){
    element = arrayCheckNear[i];
    if (bombsPosition.indexOf(element) >= Number(0)){
      number++;
    } else {
      if (element <= (boardWidth*boardHeight)){
      emptyFields.push(element);
      }
    }
  }
//    console.log(this);
//    console.log(emptyFields);
  returnValue = { nearbyBombs: number, 
                  emptyFields: emptyFields,
                  fieldPosition: value};
//  console.log(returnValue);
  return returnValue;
}

// Winner!
function winner(){
  win = document.getElementById("success");
  win.style.display = "block";
  win = win.getElementsByTagName("a");
  win[0].href = window.location.href;  
}


// Game Over - show all bombs locations
function kaboom(value) {
  let bomb, pos;
  for (i = 0; i < bombsPosition.length; i++){
//    console.log(bombsPosition[i]);
    pos = bombsPosition[i];
    pos = document.getElementsByClassName("pos"+pos);
    pos[0].className += " bombed";
    pos[0].innerHTML = '<i class="fa fa-bomb" aria-hidden="true"></i>';
  }
  let allCubes = document.getElementsByClassName("cube");
  for (let i = 0; i < allCubes.length; i++){
    allCubes[i].removeEventListener('click', checkForBomb);
  }  
  lost = document.getElementById("lost");
  lost.style.display = "block";
  lost = lost.getElementsByTagName("a");
  lost[0].href = window.location.href;

  // create modal - TODO

}


function startGame() {
  let allCubes = document.getElementsByClassName("cube");
  for (let i = 0; i < allCubes.length; i++){
    allCubes[i].addEventListener('click', checkForBomb);
  }
}

var startPosition = startGame();
