var range = document.querySelector(".range");
var rangeValues = range.querySelectorAll(".range-control-value");

[].forEach.call(rangeValues, function(input) {
  input.readOnly = true;
});
