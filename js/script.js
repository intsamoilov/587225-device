"use strict";

var formLink = document.querySelector(".btn-write-us");
var modal = document.querySelector(".modal");
var modalForm = document.querySelector(".modal-form");
var formFeedback = modalForm.querySelector(".modal-form-feedback");
var modalFormClose = modalForm.querySelector(".modal-close");
var formName = modalForm.querySelector("[name=name]");
var formEmail = modalForm.querySelector("[name=email]");
var formText = modalForm.querySelector("[name=message]");

var mapLink = document.querySelector(".small-map");
var modalMap = document.querySelector(".modal-map");
var modalMapClose = modalMap.querySelector(".modal-close");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

/*========================================================================*/

try {
	storageName = localStorage.getItem("name");
	storageEmail = localStorage.getItem("email");
} catch (err) {
	isStorageSupport = false;
}

/*========================================================================*/

formLink.addEventListener("click", function(evt) {
	evt.preventDefault();
	modal.classList.add("modal-show");
	modalForm.classList.add("modal-show");
	if (storageName && storageEmail) {
		formName.value = storageName;
		formEmail.value = storageEmail;
		formText.focus();
	} else {
		formName.focus();
	}
});
modalFormClose.addEventListener("click", function(evt) {
	evt.preventDefault();
	modal.classList.remove("modal-show");
	modalForm.classList.remove("modal-show");
	modalForm.classList.remove("modal-error");
});
formFeedback.addEventListener("submit", function(evt) {
	if (!formName.value || !formEmail.value) {
		evt.preventDefault();
		/*modalForm.classList.remove("modal-error");
		modalForm.offsetWidth = modalForm.offsetWidth;*/
		modalForm.classList.add("modal-error");
	} else {
		if (isStorageSupport) {
			localStorage.setItem("name", formName.value);
			localStorage.setItem("email", formEmail.value);
		}
	}
});
window.addEventListener("keydown", function(evt) {
	if (evt.keyCode == 27 && modalForm.classList.contains("modal-show")) {
		evt.preventDefault();
		modal.classList.remove("modal-show");
		modalForm.classList.remove("modal-show");
		modalForm.classList.remove("modal-error");
	}
});

/*========================================================================*/

mapLink.addEventListener("click", function(evt) {
	evt.preventDefault();
	modal.classList.add("modal-show");
	modalMap.classList.add("modal-show");
});
modalMapClose.addEventListener("click", function(evt) {
	evt.preventDefault();
	modal.classList.remove("modal-show");
	modalMap.classList.remove("modal-show");
});
window.addEventListener("keydown", function(evt) {
	if (evt.keyCode == 27 && modalMap.classList.contains("modal-show")) {
		evt.preventDefault();
		modal.classList.remove("modal-show");
		modalMap.classList.remove("modal-show");
	}
});

/*========================================================================*/

ymaps.ready(init);
function init(){ 
	var myMap = new ymaps.Map("map", {
		center: [55.686980, 37.529654],
		zoom: 16
	}); 
	var myPlacemark = new ymaps.Placemark([55.686980, 37.529654], {
		hintContent: "Москва улица строителей, 15"
	});
	myMap.geoObjects.add(myPlacemark);
}