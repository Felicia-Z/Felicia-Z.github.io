function sbLevel(event, sbLevel) {
    // Declare all variables
    var i, tab2content, tab2links;
  
    // Get all elements with class="tabcontent" and hide them
    tab2content = document.getElementsByClassName("tab2content");
    for (i = 0; i < tab2content.length; i++) {
      tab2content[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tab2links = document.getElementsByClassName("tab2links");
    for (i = 0; i < tab2links.length; i++) {
      tab2links[i].className = tab2links[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }