document.addEventListener('DOMContentLoaded', function(){

	//when go button clicked pass it the option chosen (option value is the function to execute) 
	
	//Variables
	var button = document.querySelector('.choose-option');
	var selectBox = document.querySelector('select')
	var studentArray = ['sue', 'bob', 'bill', 'beck', 'lucy', 'penny', 'jez', 'dave', 'luke', 'john'];
	var studentListParent = document.querySelector('.pairing-list'); 

	//Event Listeners
	button.addEventListener('click', function(){	
		var selectBoxValue = selectBox.options[selectBox.selectedIndex].value;		
		var students = shuffleStudents(studentArray);
		var peopleNumber;
		removeExistingStudents();

		if(selectBoxValue === "studentPairing"){
			studentPairing(students);
		}

		else if(selectBoxValue === "neighbourPairing"){
			neighbourPairing(studentArray);	
		}

		else if(selectBoxValue === "randomPairing"){	
			randomPairing(students);		
		}
		
		else if(selectBoxValue === "neighbourThreePairing"){
			neighbourThreePairing(studentArray);
		}

		else if(selectBoxValue === "randomNPairing") {
			randomNPairing(students);
		}	
	});

	selectBox.addEventListener('change', function(){
		var selectBoxValue = selectBox.options[selectBox.selectedIndex].value;
			if(selectBoxValue === "randomNPairing"){
				showNumberInput();
			}
			else {
				hideNumberInput();
			}
	});

	//Methods
	Array.prototype.random = function(length) {
		return this[Math.floor((Math.random()*length))];
	}

	Array.prototype.clone = function(){
		return this.slice(0);
	}
	
	//Basic Functions
	
	//remove children of .pairing-list
	function removeExistingStudents() {
		while(studentListParent.firstChild) {
			studentListParent.removeChild(studentListParent.firstChild);
		}
	}

	//clones & shuffles original student list
	function shuffleStudents(array){
		var cloneArray = array.clone(); 
		for(var j,x,i, i=cloneArray.length; i; j=Math.floor(Math.random() * i), x=cloneArray[--i], cloneArray[i] = cloneArray[j], cloneArray[j] = x);
		return cloneArray;
	}


	function showStudentList(paraText){
		
		//add new p element
		var para = document.createElement('p');
		//add text to p element
		var name = document.createTextNode(paraText);
		//append text to p element
		para.appendChild(name);
		//append p to pairing-list div
		studentListParent.appendChild(para);
	}

	//show people-number input
	function showNumberInput(){
			var input = document.querySelector(".people-number");
			input.style.display="block";

	}

	//hide people-number input
	function hideNumberInput(){
		var input = document.querySelector(".people-number");
		input.style.display="none";
	}
	
	//Specific Functions
	
	function studentPairing(students){	
		for(var i=0;i<students.length; i++){
			showStudentList(students[i]);
		}
	}

	function neighbourPairing(students){
		//take first two of array 
		for(var i=0, j=1;i<students.length; i+= 2, j++){ 
			//create string and separate with an 'and'
			var pair = 'pair' + ' ' + j + ': ' + students[i] + ' and ' + students[i+1];
			//call function to append students
			showStudentList(pair);	
		}
	}

	function randomPairing(students){
		//take first two of array 
		for(var i=0, j=1;i<students.length; i+= 2, j++){ 
		//create string and separate with an 'and'
			var pair = 'pair' + ' ' + j + ': ' + students[i] + ' and ' + students[i+1];
		//call showStudentList(string)
			showStudentList(pair); 
		//
		}
	}

	function neighbourThreePairing(students){		
		//take first three of array 
		for(var i=0, j=1;i<students.length; i+= 3, j++){ 
		//create string and separate with an 'and'
			var trio = 'pair' + ' ' + j + ': ' + students[i] + ', ' + students[i+1] + ' and ' +	students[i+3];
		//call showStudentList(string)
			showStudentList(trio);
		}	
	}

	function randomNPairing(students){
		var input = document.querySelector(".people-number");
		//working
		var number = input.value;
		var group;
		//take first n of array 
		while(students.length !== 0){
			for(var i=0; i<number; i++){
			 group += students[i];
			}	
		//call showStudentList(string)
			showStudentList(group);
			students.shift(number);

		}	
	}
});
