//Global vars
var $selectBox = document.querySelector('select');
var $studentListParent = document.querySelector('.pairing-list');
var $form = document.getElementById("group-generator");	
var input = document.querySelector(".people-number");



document.addEventListener('DOMContentLoaded', function(){

	//Event Listeners

	$form.addEventListener('submit', function(event){	
		
		event.preventDefault();
		
		getJSON('https://volunteerism-beck410.firebaseio.com/students.json', function(data){
			studentArray = data
			
			var $selectBoxValue = $selectBox.options[$selectBox.selectedIndex].value;		
			var peopleNumber;
			var shuffledStudents = shuffleStudents(studentArray);
			var studentsClone = studentArray.clone(); 
			//removeExistingStudents();
		
			$studentListParent.innerText = "";
			switch($selectBoxValue) {
				case "studentPairing":
					showStudentList(shuffledStudents[0]);
					break;
				
				case "neighbourPairing":
					spliceStudentsArray(studentsClone, 2, " and ")
					break;

				case "randomPairing":
					spliceStudentsArray(shuffledStudents, 2, " and ");		
					break;

				case "neighbourThreePairing":
					spliceStudentsArray(studentsClone, 3, ", ");
					break;

				case "randomNPairing":
				var inputValue = document.querySelector(".people-number").value;	
				spliceStudentsArray(shuffledStudents, inputValue, ", ");
				break;
				
		  default: 
					return;
				break;
			}
		});
	});

	//show people input box if select box value is randomNPairing otherwise hide it
	$selectBox.addEventListener('change', function(){
		var $selectBoxValue = $selectBox.options[$selectBox.selectedIndex].value;
			if($selectBoxValue === "randomNPairing"){
				showNumberInput();
			}
			else {
				hideNumberInput();
			}
	});
}); //end of DOMContentLoaded

//Methods
Array.prototype.clone = function(){
	return this.slice(0);
}
	
//Basic Functions

//JSON  function to get list

function getJSON(url, cb){
 xhr = new XMLHttpRequest();

 xhr.open('GET', url);
  
 xhr.onload = function(){
   cb(JSON.parse(xhr.responseText));
 }
  
  xhr.send();
}

//clones & shuffles original student list
function shuffleStudents(array){
	var cloneArray = array.clone(); 
	
  for(var j,x,i, i=cloneArray.length; i; j=Math.floor(Math.random() * i), x=cloneArray[--i], cloneArray[i] = cloneArray[j], cloneArray[j] = x);
	
  return cloneArray;
}

//creates new li and inserts student names
function showStudentList(liText){
		
  //add new li element
	var li = document.createElement('li');
	//add text to p element
	var name = document.createTextNode(liText);
	//append text to p element
	li.appendChild(name);
	//append p to pairing-list div
	$studentListParent.appendChild(li);
}

//show people-number input
function hideNumberInput(){
  input.classList.add("hidden");		
}

//hide people-number input
function showNumberInput(){
	input.classList.remove("hidden");			
}

//splices student array and sends student names to showStudentList function
function spliceStudentsArray(students, endIndex, joiner) {
	while(students.length > 0){
		var studentNames = students.splice(0, endIndex);
		var innerText = studentNames.join(joiner);
		//call showStudentList(string)
		showStudentList(innerText);
	}
}
	
