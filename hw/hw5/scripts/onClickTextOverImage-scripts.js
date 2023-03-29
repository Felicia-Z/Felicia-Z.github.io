// Document.querySelectorAll() 
// returns a static (not live) NodeList representing a list of the document's elements 
// that match the specified group of selectors.

// Document.querySelector() 
// returns the first Element within the document that matches the specified selector, or group of selectors. 
// If no matches are found, null is returned.

var textOverImages=document.querySelectorAll(".onClickTextOverImage div");

for(var i=0;i<textOverImages.length;i++){
    textOverImages[i].onclick=function(){
        // The classList JavaScript is a read-only property that is used to return CSS classes in the form of an array. 
        this.classList.toggle("show");
    }
};

console.log("ffafde4");