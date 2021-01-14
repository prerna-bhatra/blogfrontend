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
  fetch(`http://localhost:5000/api/blogs`)
  .then(response=>response.json())
  .then(json=>
    {
        console.log(json)
        BlogArray=[...json.data]
        console.log(BlogArray)
        BlogArray.forEach(fetchImg)
        
        function fetchImg(item,index)
        {
         
          BlogImg[index]=`http://localhost:5000/api/blogs/img/${BlogArray[index]._id}`
           
        }
        console.log(BlogImg)

       // document.getElementById('blogimg').src=BlogImg[0]
       
       document.getElementById('blog1img').src=BlogImg[0]
       document.getElementById('Blog1').innerHTML+='<h1>'+BlogArray[0].BlogHeading+'</h1> <p>'+BlogArray[0].BlogContent.slice(0,205)+
       '...<p style="color:red">Reda More</p></p>'

       document.getElementById('Blog1').addEventListener('click',
        function ReadBlog()
        {
         // alert(BlogArray[0]._id)
        var  BlogId=BlogArray[0]._id;
        window.location.href=`ReadBlog.html?blogId=${BlogId}`

       
          
        }
       )

       BlogArray.forEach(show3Blog)

       function show3Blog(item,index)
       {
       //   document.getElementById()
       if(index<3)
        
       {
         document.getElementById('blogs3').innerHTML+='<div class="col-md-7"><div class="row" ><div class="col-md-12 blog3Class" id="blog3id"><span><h4>'+BlogArray[index+1].BlogHeading+'    '+BlogArray[index+1].createdAt+'</h4><img  id="blog3img" width="70%" src='
        +BlogImg[index+1]+'></span></div></div></div>'
        
       }
       }

       

       
       BlogArray.forEach(showRestBlogs)

       function showRestBlogs(item,index)
       {
         console.log(index)
         if(index<BlogArray.length-4)
         {
document.getElementById('RestBlogs').innerHTML+='<div class="col-md-4 blog3Class" id="RestBlog"><div class="row"> <div class="col-md-3"><img  width="100%" src='+BlogImg[index+4] +'></div><div class="col-md-9"><h4>'+
BlogArray[index+4].BlogHeading+'</h4><p>'+BlogArray[index+4].BlogContent.slice(0,50)+'</p>...<p style="color:red">Read More</p></div></div>'
       }
      }

      for(let i=0;i<BlogArray.length-1;i++)
      {
       // console.log(document.getElementsByClassName('blog3Class'));
        document.getElementsByClassName('blog3Class')[i].addEventListener('click',
        function click()
        {
          console.log(BlogArray[i+1]._id)
          window.location.href=`ReadBlog.html?blogId=${BlogArray[i+1]._id}`
        })
      }

    })
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
