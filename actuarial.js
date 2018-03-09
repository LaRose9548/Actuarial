// Global variables initialization
let bmiOBJ = {
  "Underweight":  { "min":  0.0, "max": 18.4 },
  "Normal":       { "min": 18.5, "max": 24.9 },
  "Overweight":   { "min": 25.0, "max": 29.9 },
  "Obese":        { "min": 30.0, "max": 999.0 }
};
let personalData = {}; // Personal data from the form
// Need to retrieve JSON data to something usable

const parseData = (data) => {
  // Creating personal data object
  data.forEach (( field ) => {
    personalData[field.name] = field.value;
  });
}

const presentResults = () => {

}

const calculateBMI = (heightIn, heightFt, weight) => {
  let height = heightIn + heightFt * 12;
  let bmi = ( weight / (height * height)) * 703;

  return Math.round (bmi * 10) / 10; // Rounding to 1 decimal point
}

const determineActuarial = () => {

}

const calcPaksYear = (pksPeriod, numPaks) => {
  numPaks = Math.ceil (numPaks); // round up
  switch (pksPeriod) {
    case "perDay":    numPaksYear = numPaks * 365;
                      break;
    case "perWeek":   numPaksYear = numPaks * 52;
                      break;
    case "perMonth":  numPaksYear = numPaks * 12;
                      break;
    default:          console.log ("ERROR: Invalid pksPeriod value.")
  }

  return numPaksYear;
}

const calcPeriodTime = (period, time) => {
  let years = 0;

  switch (period) { // round down
    case "Years":   years = Math.floor (time);
                    break;
    case "Months":  years = Math.floor (time / 12);
                    break;
    case "Days":    years = Math.floor (time / 365);
                    break;
    default:        console.log ("ERROR: Invalid period of time.");
  }

  return years;
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
