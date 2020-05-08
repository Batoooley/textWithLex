/*
This sketch belongs to the "textInputW/p5" folder. if you find it in the wild pls return it.

NOTE: this code [not yet] contains text combinatorics tests.

note: shiffman devides the code by "scale" of typing, creating one function for .changed and
one for .input. I would also divide them like that But I'm thinking of the divide more visualy
where the top of the screen would have the "correct" or "found" magic squares, and the bottom half
would be logging each matrix transformation on screen underneath each other.

HW: make the "newText" function, return a reversed order of the input phrase/sentence

*/

var textField;
var output;
var submit;

let vals = []; //[0, 1, 2, 3];

let l;
let s;

var theSplit;

function setup() {
  noCanvas();
  //access text textarea
  //This is the input bar/cell on the screen
  // textField = createInput("enter a word");

  //this will access the textarea in the html file called blueberry
  //with textarea hitting enter does not trigger the .change()
  textField = select('#blueberry')

  //.changed() is an event function inside p5.dom library (or addon, wtvr you call it)
  //whenever the user hits enter (which is a .changed() event), execute the function called 'newText'
  // textField.changed(newText); //nextMatrix

  //whenever ANY change happens to the text (which is a .input() event) exceute 'newTyping'
  textField.input(newTyping); //foundSquare

  //asigning the ourput var to be the text inside the index.html document/file <p id = outout/>
  //which is accessed by the select() function
  output = select('#output');

  //accesses the button submit from html page
  submit = select('#submit');
  submit.mousePressed(newText); //because their is no .change trigger, we put the next text funtion in here when using text area
}


function newText() { //this could be foundSquare()
l = theSplit;
  //----Sorting code
  //STEP 1
  var largestI = -1;
  for (var i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log("-1 reached");
    // largestI = -1;
  }

  //STEP 2
  var largestJ = -1;
  for (var j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j;
    }
  }

  //STEP 3
  swap(vals, largestI, largestJ);

  //STEP 4: reverse from the largest I + 1 to the end
  var size = vals.length - largestI - 1;
  var endArray = [size]; //[size];
  arrayCopy(vals, largestI + 1, endArray, 0, size);
  endArray = reverse(endArray);
  arrayCopy(endArray, 0, vals, largestI + 1, size);
  //----end of sorting code

  s = " "; //must be emptied before every new combo is generated
  l = " "; //must be emptied before every new combo is generated
  for (var i = 0; i < vals.length; i++) {
    s += vals[i];
    l += theSplit[vals[i]];
  }
  createP(l);

  console.log(vals);
}


function newTyping() { //this could be nextMatrix()
  //.html() function displayed the text typed live on the screen/page
  output.html(textField.value());

  //createP creates a paragraph on screen
  // createP(textField.value());

  // console.log(textField.value());
  //createP creates a paragraph on screen
  var originalInput = textField.value();
  // createP(originalInput);

  theSplit = originalInput.split(" ");

  //for reversing the input string:
  var theReverse = theSplit.reverse();
  var joinReverse = theReverse.join(" ");

  ////////dynamic sizing of the vars array:
  for (var i = 0; i < theSplit.length; i++) {
    vals.push(i);
    vals.length = i + 1;
  }
  console.log(vals.length);
  console.log(vals);
  ////////
}

//MATCH WITH STEP 3
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
