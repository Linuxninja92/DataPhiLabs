app.controller('MainController',['$scope','$http',function($scope,$http){

	$scope.title='User Directory';
	$scope.Display=false;
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
	$scope.User=[];
	$scope.details=[];
	$scope.searchedUserDetails=false;




$scope.fname=false;
$scope.lname=false;
$scope.gender=false; 	
$scope.contactNumber=false;
$scope.birthDate=false;
$scope.ageOfUser=false;
$scope.ContactInvalid=false;
$scope.dobInvalid=false;
$scope.ageInvalid=false;


$scope.newUser = function () {
        $scope.Display=true;
    };


$scope.saveUser=function(obj){   //all the values are in obj
	//console.log ("Hi");
	$scope.firstname = obj.firstname;
	$scope.lastname = obj.lastname;
$scope.age = obj.age;
$scope.dob = obj.dob;
$scope.gender = obj.gender;
$scope.Contact = obj.Contact;
var result = $scope.checkValidations(name);
if (result == true) {

	$http({
            url : 'run',
            method : "POST",
            
            data : {
                'FirstName' : $scope.firstname,
'LastName' : $scope.lastname,
'Age' :$scope.age,
'DOB':$scope.dob,
'Gender':$scope.gender,
'MobileNo':$scope.Contact,
'FreeTextInfo': ''


		
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            console.log(response.data);
            alert(response.data);
        }, function(response) {
            //fail case
            console.log(response);
             alert(response.data);
        });


}
console.log(result);
$scope.UserNames();
}

/*$scope.UserNames=function(){
	$scope.searchedUserDetails=false;
	$http({
            url : 'run',
            method : "GET",
            
            data : {
                'FirstName' : $scope.firstname,
'LastName' : $scope.lastname,


		
            }
        }).then(function(response) {
        	var res=JSON.parse(response.data);
        	//$scope.items=res;
	$scope.items=[{name:"abhi"},{name:"xyz"}];
	console.log(response.data);
            alert(response.data);
        }, function(response) {
            //fail case
            console.log(response);
             alert(response.data);
        });
}

$scope.UserNames();
*/

$scope.searchDetails=function(data){
	$scope.searchedUserDetails=true;

$http({
            url : 'run',
            method : "POST",
            
            data : {
                'FirstName' : $scope.firstname,
'LastName' : $scope.lastname,
'Age' :$scope.age,
'DOB':$scope.dob,
'Gender':$scope.gender,
'MobileNo':$scope.Contact,
'FreeTextInfo': ''


		
            }
        }).then(function(response) {

	//data should be binded here  to java
$scope.result=JSON.parse(data);
$scope.listofsearchedUsers=$scope.result;



            console.log(response.data);
            alert(response.data);
        }, function(response) {
            //fail case
            console.log(response);
             alert(response.data);
        });




           
	//on sucess data has been passed to db

	
}

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null 
}

$scope.checkValidations=function(name){
	$scope.isValidated=false;
	if (angular.isUndefinedOrNull($scope.firstname)) {
		$scope.fname=true;
	}
	else{
		$scope.fname=false;
	
	}

	if (angular.isUndefinedOrNull($scope.lastname)) {
		$scope.lname=true;}
	else{
		$scope.lname=false;
	}

	if (angular.isUndefinedOrNull($scope.gender)) {
		$scope.gender=true;}
	else{
		$scope.gender=false;
	
	}

	if (angular.isUndefinedOrNull($scope.Contact)) {
		$scope.contactNumber=true;}
	else{

		$scope.contactNumber=false;
	if ($scope.Contact.length!=10 || isNaN($scope.Contact)) {$scope.ContactInvalid=true;}
	else{$scope.ContactInvalid=false;}
	}
	
	

	if (angular.isUndefinedOrNull($scope.dob)) {
		$scope.birthDate=true;}
	else{
		$scope.birthDate=false;
	var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
		if (!pattern.test($scope.dob)) {$scope.dobInvalid=true;}
		else		{$scope.dobInvalid=false;}
	}

	if (angular.isUndefinedOrNull($scope.age)) {
		$scope.ageOfUser=true;}
	else	{	
		$scope.ageOfUser=false;
		if (isNaN($scope.age)) {$scope.ageInvalid=true;}
	else{$scope.ageInvalid=false;}
	}
	if ($scope.ageOfUser==false && $scope.ageInvalid==false && $scope.birthDate==false && $scope.dobInvalid==false && $scope.ContactInvalid==false
	 && $scope.gender==false
		&& $scope.lname==false && $scope.fname==false ) {$scope.isValidated=true;
		return $scope.isValidated;}
	}

}]);