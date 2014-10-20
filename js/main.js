document.addEventListener('DOMContentLoaded', function(){
	
	var $selectBox = document.querySelector('select')
	var studentArray = ['sue', 'bob', 'bill', 'beck', 'lucy', 'penny', 'jez', 'dave', 'luke', 'john'];
	var $studentListParent = document.querySelector('.pairing-list');
 	var $form = document.getElementById("group-generator");	

	//Event Listeners

	$form.addEventListener('submit', function(event){	
		event.preventDefault();
		var $selectBoxValue = $selectBox.options[$selectBox.selectedIndex].value;		
		var peopleNumber;
		var students = shuffleStudents(studentArray);
		
		removeExistingStudents();

		if($selectBoxValue === "studentPairing"){
			studentPairing(students);
		}

		else if($selectBoxValue === "neighbourPairing"){
			neighbourPairing(studentArray);	
		}

		else if($selectBoxValue === "randomPairing"){	
			randomPairing(students);		
		}
		
		else if($selectBoxValue === "neighbourThreePairing"){
			neighbourThreePairing(studentArray);
		}

		else if($selectBoxValue === "randomNPairing") {
			randomNPairing(students);
		}	
	});

	//show people input box if select boc value is randomNPairing otherwise hide it
	$selectBox.addEventListener('change', function(){
		var $selectBoxValue = $selectBox.options[$selectBox.selectedIndex].value;
			if($selectBoxValue === "randomNPairing"){
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
		while($studentListParent.firstChild) {
			$studentListParent.removeChild($studentListParent.firstChild);
		}
	}

	//clones & shuffles original student list
	function shuffleStudents(array){
		var cloneArray = array.clone(); 
		for(var j,x,i, i=cloneArray.length; i; j=Math.floor(Math.random() * i), x=cloneArray[--i], cloneArray[i] = cloneArray[j], cloneArray[j] = x);
		return cloneArray;
	}


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
		while(students.length > 0){	
			var studentNames = students.splice(0, 2);
			var innerText = studentNames.join(" and ");
			//call function to append students
			showStudentList(innerText);	
		}
	}

	function randomPairing(students){
		//take first two of array 
		while(students.length > 0){
			var studentNames = students.splice(0,2);
			var innerText = studentNames.join(" and ");			
			//call showStudentList(string)
			showStudentList(innerText); 
		}
	}

	function neighbourThreePairing(students){		
		//take first three of array 
		while(students.length > 0){
			var studentNames = students.splice(0,3);
			var innerText = studentNames.join(" and ");			
			//call showStudentList(string)						
			showStudentList(innerText);
			}
		}	

	function randomNPairing(students){
		var inputValue = document.querySelector(".people-number").value;
		while(students.length > 0){
			var studentNames = students.splice(0, inputValue);
			var innerText = studentNames.join(" and ");
		  //call showStudentList(string)
			showStudentList(innerText);
		}	
	}
});
