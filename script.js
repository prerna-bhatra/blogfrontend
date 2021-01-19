//ShowComments()
//show signup


'use strict';
CheckLogin()

function CheckLogin()
{
  var UserLogin = localStorage.getItem("user");
  if(UserLogin!=null){
    document.getElementById('SIGNOUTBTN').style.display='block'
    document.getElementById('SIGNUPLOGIN').style.display='none'
  }
  else{
   
    document.getElementById('SIGNOUTBTN').style.display='none'
    document.getElementById('SIGNUPLOGIN').style.display='block'
  }

}
//global BlogId to save into database
let BlogId
// document.getElementById('Login').style.display = 'none';
const selectableTextArea = document.querySelectorAll(".selectable-text-area");
const twitterShareBtn = document.querySelector("#twitter-share-btn");

selectableTextArea.forEach(elem => {
elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

//document.addEventListener("mousedown", documentMouseDown);
function selectableTextAreaMouseUp(event) {
setTimeout(() => { // In order to avoid some weird behavior...
  const selectedText = window.getSelection().toString().trim();
  if(selectedText.length) { 
    const x = event.pageX;
    const y = event.pageY;
    const twitterShareBtnWidth = Number(getComputedStyle(twitterShareBtn).width.slice(0,-2));
    const twitterShareBtnHeight = Number(getComputedStyle(twitterShareBtn).height.slice(0,-2));
    if(document.activeElement !== twitterShareBtn) {
      twitterShareBtn.style.left = `${x - twitterShareBtnWidth*0.5}px`;
      twitterShareBtn.style.top = `${y - twitterShareBtnHeight*1.25}px`;
      twitterShareBtn.style.display = "block";
      twitterShareBtn.classList.add("btnEntrance");
    }
    else {
      twitterShareBtn.style.left = `${x-twitterShareBtnWidth*0.5}px`;
      twitterShareBtn.style.top = `${y-twitterShareBtnHeight*0.5}px`;
    }
  }    
}, 0);
}

//show this div when click on comment buttons

//read comments



var BlogArray=[
  
]

var BlogImg=[

]

FetchAndShowBlogs()

function FetchAndShowBlogs()
 {
    //show Trending blogs or top 6 blogs having most views
   

 }

    
 var signout=document.getElementById('SignOut');
 console.log(signout)
 document.getElementById('SignOut').addEventListener('click',
 function SignOut()
 {
     console.log("signout")
     fetch('http://localhost:5000/api/signout')
     .then(response=>
         {
             console.log(response)
             localStorage.removeItem("user");
             window.location.href='index.html'
         }
 
     )
 })
