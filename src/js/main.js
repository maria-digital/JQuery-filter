let currentValue = "all";

filterSelection("all")
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btn");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(e) {
        let current = document.getElementsByClassName("active");
        const id = e.target.id;
        if (id === currentValue) {
            filterSelection('all');
            this.classList.remove("active");
            currentValue = 'all';
        } else {
            if (current[0]){
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
            filterSelection(id);
            currentValue = id;
        }
    });
}

const btnContainerReviews = document.getElementById("reviewsContainer");
const buttonsReviews = btnContainerReviews.getElementsByClassName("btn");
let currentValueReviews = 0;


for (let i = 0; i < buttonsReviews.length; i++) {
    buttonsReviews[i].addEventListener("click", function(e) {
        const current = document.getElementsByClassName("active");
        const id = e.target.id;
        if (id === currentValueReviews) {
            this.classList.remove("active");
            filterReviews(0);
            currentValueReviews = 0;
        } else {
            if (current[0]){
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
            filterReviews(id);
            currentValueReviews = id;
        }
    });
}

function filterReviews(c) {
    let x;
    let i;
    x = document.getElementsByClassName("filterDiv");
    if (c === 0) c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        const valueReview = x[i].children[1].innerHTML;
        if (parseFloat(valueReview) >= c) w3AddClass(x[i], "show");
    }
}

const inputContainerSize = document.getElementById("sizeContainer");
const inputsSize = inputContainerSize.getElementsByClassName("input");

for (let i = 0; i < inputsSize.length; i++) {
    inputsSize[i].addEventListener("input", function(e) {
        filterSize()
    });
}


function filterSize() {
    let x;
    let i;
    x = document.getElementsByClassName("filterDiv");
    const from = document.getElementById("from").value || 0;
    const to = document.getElementById("to").value || 200;
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        const roomSize = x[i].children[2].innerHTML;
        if (parseInt(roomSize) >= from && parseInt(roomSize) <= to ) w3AddClass(x[i], "show");
    }
}
