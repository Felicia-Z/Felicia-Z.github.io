// tab2 in snowboard riding skill level   
function sbLevel(event, level) {
    // Declare all variables
    var i, tab2content, tab2links;
  
    // Get all elements with class="tab2content" and hide them
    tab2content = document.getElementsByClassName("tab2content");
    for (i = 0; i < tab2content.length; i++) {
      tab2content[i].style.display = "none";
    }
  
    // Get all elements with class="tab2links" and remove the class "active"
    tab2links = document.getElementsByClassName("tab2links");
    for (i = 0; i < tab2links.length; i++) {
      tab2links[i].className = tab2links[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(level).style.display = "block";
    evt.currentTarget.className += " active";
  }

//   go back to top button
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// dropdown navigation bar
//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}