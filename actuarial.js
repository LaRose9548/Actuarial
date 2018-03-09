// Global variables initialization
let calcBMI = 0;
let smokerJSON = {}; // retrieve smoker JSON object
let diabeticJSON = {}; // retrieve diabetic JSON object
let personalData = {}; // Personal data from the form

const parseData = (data) => {
  // Creating personal data object
  data.forEach (( field ) => {
    personalData[field.name] = field.value;
  });
}

const presentResults = () => {

}

const calculateBMI = () => {

}

const determineActuarial = () => {

}

const calcPaksYear = (pksPeriod, numPaks) => {
  numPaks = Math.ciel (numPaks); // round up
  switch (pksPeriod) {
    case "perDay":    numPaksYear = numPaks * 365;
                      break;
    case "perWeek":   numPaksYear = numPaks * 52;
                      break;
    case "perMonth":  numPaksYear = numPaks * 12;
                      break;
    default:          console.log ("ERROR: Invalid pksPeriod value.")
  }
}

const addSmokerSpecificQuestions = (smokerType) => {
  let stringHTML = "";

  if (smokerType === "Yes") {
    stringHTML = `<br>\
    <label>a) How many packs do you smoke and how often?\
      <div id="smokeQuestionYesA">\
        Number Packs: <input type="number" name="numPaks" placeHolder="2" required>\
        <input type="radio" name="pksPeriod" value="perDay" required>per Day\
        <input type="radio" name="pksPeriod" value="perWeek" required>per Week\
        <input type="radio" name="pksPeriod" value="perMonth" required>per Month\
      </div>\
    </label>\
    <br>\
    <label>b) How long have you been smoking?\
      <div id="smokeQuestionYesB">
        Smoking Length: <input type="number" name="smokingTime" placeHolder="2" required>\
        <input type="radio" name="smokingPeriod" value="Years" required>Years\
        <input type="radio" name="smokingPeriod" value="Months" required>Months\
        <input type="radio" name="smokingPeriod" value="Days" required>Days\
      </div>\
    </label>`;
  } else if (smokerType === "Previously"){
    stringHTML = `<br>\
    <label>a) How many packs did you smoke and how often?\
      <div id="smokeQuestionPrevA">\
        <input type="number" name="numPaks" placeHolder="2" required> packs \
        <input type="radio" name="pksPeriod" value="perDay" required>per Day\
        <input type="radio" name="pksPeriod" value="perWeek" required>per Week\
        <input type="radio" name="pksPeriod" value="perMonth" required>per Month\
      </div>\
    </label>\
    <br>\
    <label>b) How long did you smoke?\
      <div id="smokeQuestionPrevB">
        <input type="number" name="smokingTime" placeHolder="2" required>\
        <input type="radio" name="smokingPeriod" value="Years" required>Years\
        <input type="radio" name="smokingPeriod" value="Months" required>Months\
        <input type="radio" name="smokingPeriod" value="Days" required>Days\
      </div>\
    </label>
    <br>\
    <label>c) How long since you quit smoking?\
      <div id="smokeQuestionPrevC">
        <input type="number" name="quitTime" placeHolder="2" required>\
        <input type="radio" name="quitPeriod" value="Years" required>Years\
        <input type="radio" name="quitPeriod" value="Months" required>Months\
        <input type="radio" name="quitPeriod" value="Days" required>Days\
      </div>\
    </label>`;
  } else {
    // Do nothing as stringHTML is ""
  }

  $('#smokerAdditionalQuestions').html(stringHTML);
}

// Clicking Submit starts it all off :D
$( "form" ).on( "submit", function ( event ) {
  var data = $( event.target ).serializeArray(); // Parsing form info to data obj
console.log (data);
  // Preventing the submit button from submitting the form
  event.preventDefault();

  // Parsing the data for usage and calculation
  parseData (data);

  // Making calculations
  calculateBMI ();
  determineActuarial ();

  // Presenting results
  presentResults ();

});

// Clicking a button resets it all
$( "#resetResults" ).on( "click", function ( event ) {
  $('form')[0].reset();
  presentResults (null); // Resetting results div
});

// Clicking Submit starts it all off :D
$( "#smokeQuestion" ).on( "click", function ( event ) {
  var data = $( event.target ).serializeArray(); // Parsing form info to data obj

  addSmokerSpecificQuestions (data[0].value);
});
