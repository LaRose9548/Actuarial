// Retrieving JSON data
let xmlhttp = new XMLHttpRequest();
let myObj = {};
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", "deathRate.json", true);
xmlhttp.send();

// Global variables initialization
let bmiOBJ = {
  "Underweight":  { "min":  0.0, "max": 18.4 },
  "Normal":       { "min": 18.5, "max": 24.9 },
  "Overweight":   { "min": 25.0, "max": 29.9 },
  "Obese":        { "min": 30.0, "max": 999.0 }
};
let personalData = {}; // Personal data from the form

// Functions
const parseData = (data) => {
  // Creating personal data object
  data.forEach (( field ) => {
    if (field.name === "heightFtBMI" || field.name === "heightInBMI"
        || field.name === "weightBMI" || field.name === "numPaks"
        || field.name === "quitTime" || field.name === "smokingTime") {
      personalData[field.name] = Number.parseInt(field.value, 10);
    } else {
      personalData[field.name] = field.value;
    }
  });

  personalData["BMI"] = calculateBMI();
}

const presentResults = () => {

}

const calculateBMI = () => {
  let h = ( personalData.heightInBMI + ( personalData.heightFtBMI * 12 ) );
  let bmi = ( ( personalData.weightBMI ) / ( h * h ) ) * 703;

  return Math.round (bmi * 10) / 10; // Rounding to 1 decimal point
}

const determineActuarial = () => {
  console.log(myObj);
}

const calcPaksYear = () => {
  switch (personalData.pksPeriod) {
    case "perDay":    numPaksYear = personalData.numPaks * 365;
                      break;
    case "perWeek":   numPaksYear = personalData.numPaks * 52;
                      break;
    case "perMonth":  numPaksYear = personalData.numPaks * 12;
                      break;
    default:          console.log ("ERROR: Invalid pksPeriod value.")
  }

  return numPaksYear;
}

const calcPeriodTime = (period, time) => {
  let years = 0;

  switch (period) { // round down
    case "Years":   years = time;
                    break;
    case "Months":  years = time / 12;
                    break;
    case "Days":    years = time / 365;
                    break;
    default:        console.log ("ERROR: Invalid period of time.");
  }

  return years; // Float
}

const addSmokerSpecificQuestions = (smokerType) => {
  let stringHTML = "";

  if (smokerType === "Yes") {
    stringHTML =
    `<label>
      <div class="tab">a) How many packs do you smoke and how often?\
        <div id="smokeQuestionYesA">\
          <input type="number" name="numPaks" placeHolder="2" required> packs \
          <input type="radio" name="pksPeriod" value="perDay" required>per Day\
          <input type="radio" name="pksPeriod" value="perWeek" required>per Week\
          <input type="radio" name="pksPeriod" value="perMonth" required>per Month\
        </div>\
      </div>\
    </label>\
    <br><br>\
    <label>
      <div class="tab">b) How long have you been smoking?\
        <div id="smokeQuestionYesB">
          <input type="number" name="smokingTime" placeHolder="2" required>\
          <input type="radio" name="smokingPeriod" value="Years" required>Years\
          <input type="radio" name="smokingPeriod" value="Months" required>Months\
          <input type="radio" name="smokingPeriod" value="Days" required>Days\
        </div>\
      </div>\
    </label>\
    <br>`;
  } else if (smokerType === "Previously"){
    stringHTML =
    `<label>
      <div class="tab">a) How many packs did you smoke and how often?\
        <div id="smokeQuestionPrevA">\
          <input type="number" name="numPaks" placeHolder="2" required> packs \
          <input type="radio" name="pksPeriod" value="perDay" required>per Day\
          <input type="radio" name="pksPeriod" value="perWeek" required>per Week\
          <input type="radio" name="pksPeriod" value="perMonth" required>per Month\
        </div>\
      </div>\
    </label>\
    <br><br>\
    <label>
      <div class="tab">b) How long did you smoke?\
        <div id="smokeQuestionPrevB">
          <input type="number" name="smokingTime" placeHolder="2" required>\
          <input type="radio" name="smokingPeriod" value="Years" required>Years\
          <input type="radio" name="smokingPeriod" value="Months" required>Months\
          <input type="radio" name="smokingPeriod" value="Days" required>Days\
        </div>\
      </div>\
    </label>
    <br><br>\
    <label>
      <div class="tab">c) How long since you quit smoking?\
        <div id="smokeQuestionPrevC">
          <input type="number" name="quitTime" placeHolder="2" required>\
          <input type="radio" name="quitPeriod" value="Years" required>Years\
          <input type="radio" name="quitPeriod" value="Months" required>Months\
          <input type="radio" name="quitPeriod" value="Days" required>Days\
        </div>\
      </div>\
    </label>\
    <br>`;
  } else { // smokerType === "No"
    // stringHTML = `<br>`;
  }

  $('#smokerAdditionalQuestions').html(stringHTML);
}

// Clicking Submit starts it all off :D
$( "form" ).on( "submit", function ( event ) {
  var data = $( event.target ).serializeArray(); // Parsing form info to data obj

  // Preventing the submit button from submitting the form
  event.preventDefault();

  // Parsing the data for usage and calculation
  parseData (data);

  // Making calculations
  determineActuarial ();

  // Presenting results
  presentResults ();

});

// Clicking a button resets the form
$( "#resetResults" ).on( "click", function ( event ) {
  $('form')[0].reset();
  presentResults (null); // Resetting results div
});

// Answering smoker question changes additional questions
$( "#smokeQuestion" ).on( "click", function ( event ) {
  var data = $( event.target ).serializeArray(); // Parsing form info to data obj

  addSmokerSpecificQuestions (data[0].value);
});
