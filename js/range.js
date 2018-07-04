var range = document.querySelector(".range");
var rangeValues = range.querySelectorAll(".range-value");

[].forEach.call(rangeValues, function(input) {
  input.readOnly = true;
});
