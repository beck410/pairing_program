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
		var shuffledStudents = shuffleStudents(studentArray);
		var studentsClone = studentArray.clone();
		removeExistingStudents();

		if($selectBoxValue === "studentPairing"){
			showStudentList(shuffledStudents[0]);
		}

		else if($selectBoxValue === "neighbourPairing"){
			spliceStudentsArray(studentsClone, 2)
		}

		else if($selectBoxValue === "randomPairing"){	
			spliceStudentsArray(shuffledStudents, 2);		
		}
		
		else if($selectBoxValue === "neighbourThreePairing"){
			spliceStudentsArray(studentsClone, 3);
		}

		else if($selectBoxValue === "randomNPairing") {
			var inputValue = document.querySelector(".people-number").value;	
			spliceStudentsArray(shuffledStudents, inputValue);
		}	
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

	
	function spliceStudentsArray(students, endIndex) {
		while(students.length > 0){
			var studentNames = students.splice(0, endIndex);
			var innerText = studentNames.join(" and ");
		  //call showStudentList(string)
			showStudentList(innerText);
		}
	}
	
});
