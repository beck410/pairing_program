document.addEventListener('DOMContentLoaded', function(){
	
	var $selectBox = document.querySelector('select')
	var studentArray = ['sue', 'bob', 'bill', 'beck', 'lucy', 'penny', 'jez', 'dave', 'luke', 'john'];
	var $studentListParent = document.querySelector('.pairing-list');
 	var $form = document.getElementById("group-generator");	
	var input = document.querySelector(".people-number");

	//Event Listeners

	$form.addEventListener('submit', function(event){	
		event.preventDefault();
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
				spliceStudentsArray(studentsClone, 2)
				break;

			case "randomPairing":
				spliceStudentsArray(shuffledStudents, 2);		
				break;
			case "neighbourThreePairing":
				spliceStudentsArray(studentsClone, 3);
				break;
			case "randomNPairing":
			var inputValue = document.querySelector(".people-number").value;	
			spliceStudentsArray(shuffledStudents, inputValue);
			break;
			default: 
				return;
				break;
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
	Array.prototype.clone = function(){
		return this.slice(0);
	}
	
	//Basic Functions
	
	//remove children of .pairing-list

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
	function spliceStudentsArray(students, endIndex) {
		while(students.length > 0){
			var studentNames = students.splice(0, endIndex);
			var innerText = studentNames.join(" and ");
		  //call showStudentList(string)
			showStudentList(innerText);
		}
	}
	
});

