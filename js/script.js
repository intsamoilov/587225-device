"use strict";

var formLink = document.querySelector(".btn-write-us");
var modal = document.querySelector(".modal");
var modalForm = modal.querySelector(".modal-form");
var formFeedback = modalForm.querySelector(".modal-form-feedback");
var modalFormClose = modalForm.querySelector(".modal-close");
var formName = modalForm.querySelector("[name=name]");
var formEmail = modalForm.querySelector("[name=email]");
var formText = modalForm.querySelector("[name=message]");

var mapLink = document.querySelector(".small-map");
var modalMap = modal.querySelector(".modal-map");
var modalMapClose = modalMap.querySelector(".modal-close");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

var sliderPopular = document.querySelector(".slides");
var activeSlidePopular = sliderPopular.querySelector(".slide.active");
var btnsPopular = sliderPopular.querySelectorAll(".slider-btn");

var sliderServices = document.querySelector(".main-services");
var activeSlideServices = sliderServices.querySelector(".main-services-info.active");
var btnsServices = sliderServices.querySelectorAll(".services-btn");
var activeBtnServices = sliderServices.querySelector(".selected");

/*var btnsServices1 = sliderServices.querySelector(".services-btn-1");
var btnsServices2 = sliderServices.querySelector(".services-btn-2");
var btnsServices3 = sliderServices.querySelector(".services-btn-3");*/

try {
	storageName = localStorage.getItem("name");
	storageEmail = localStorage.getItem("email");
} catch (err) {
	isStorageSupport = false;
}

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
		modalForm.classList.remove("modal-error");
		modalForm.width = modalForm.offsetWidth;
		modalForm.classList.add("modal-error");
	} else if (isStorageSupport) {
		localStorage.setItem("name", formName.value);
		localStorage.setItem("email", formEmail.value);
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

var onBtnClickPopular = function(evt) {
	evt.preventDefault();
	var slideKeyPopular = "." + evt.target.dataset.key; 

	activeSlidePopular.classList.remove("active");   
	activeSlidePopular = sliderPopular.querySelector(slideKeyPopular);
	activeSlidePopular.classList.add("active");
};

[].forEach.call(btnsPopular, function(btn) {
	btn.addEventListener("click", onBtnClickPopular);
});

var onBtnClickServices = function(evt) {
	evt.preventDefault();
	var slideKeyServices = "." + evt.target.dataset.key; 

	activeSlideServices.classList.remove("active");   
	activeSlideServices = sliderServices.querySelector(slideKeyServices);
	activeSlideServices.classList.add("active");

	activeBtnServices.classList.remove("selected");
	activeBtnServices = evt.target;
	activeBtnServices.classList.add("selected");
};

[].forEach.call(btnsServices, function(btn) {
	btn.addEventListener("click", onBtnClickServices);
});