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
function Togglediv()
{
  //	alert(selectedText) 
  console.log("toggle")
 var x = document.getElementById("CommentBoxArea");
 console.log(x.style)
 console.log(x.style.display)
 if (x.style.display !== "block") {
    x.style.display = "block";
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  } else {
    x.style.display = "none";
  }

  const selectedText = document.getSelection().toString().trim();
  var selectedTextData=document.getElementById('SelectedText');
  selectedTextData.innerHTML=selectedText;

  let pos= document.getSelection().getRangeAt(0).getBoundingClientRect()
  let RangeOfText=document.getSelection().getRangeAt(0)
  
  //publish comment and save into database
  document.getElementById('PublishBtn').addEventListener('click',
  function PublishComment()
  {
     // alert('comment') 
    console.log(pos,RangeOfText)
    var x = document.getElementById("CommentBoxArea");
    x.style.display = "none";
    var userData = localStorage.getItem("user");
    console.log(userData)
    console.log(typeof(userData))
    var userDataObj=JSON.parse(userData)
    console.log(userDataObj)
    console.log(userDataObj.user._id)
    var comment=document.getElementById("Comment").value;
    console.log(document.getElementById("CommentPrivacy"))
    console.log(document.getElementById("CommentPrivacy").value)
    var Privacy=document.getElementById("CommentPrivacy").value;
    console.log(Privacy)
    console.log(comment)
    const UserId=userDataObj.user._id
    
    
    const data={CommentName:comment,UserName:userDataObj.user.name,HighlightTextYcordinator:pos.y,HighlightTextRangeStartOffest:RangeOfText.startOffset, HighlightTextRangeEndOffest:RangeOfText.endOffset,BlogId:BlogId,CommentPrivacy:Privacy}
    console.log(data)
  fetch(`http://localhost:5000/api/comment/${UserId}`, {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
      console.log('Success:',  JSON.stringify(data));
      alert("comment added")
      })
      .catch((error) => {
      console.error('Error:', error);
      });
  })
 // PublishComment
}

//read comments
let CommentsArray=[]
function ReadComments()
{
  var x=document.getElementById('MyComments')
  var y=document.getElementById('ReadCommentsArea')
     x.style.display='none'
    y.style.display='block'
  
  console.log(BlogId)
  fetch(`http://localhost:5000/api/comments/${BlogId}`)
  .then(response => response.json())
  .then(
    json=>{
      console.log(json)
      MyCommentsArray=[]
      document.getElementById('MyCommentsList').innerHTML=' '
      document.getElementById('CommentsList').innerHTML=' '
      console.log(MyCommentsArray)
		CommentsArray=[...json]
		console.log("copy array")
		console.log(typeof(json))
    console.log(CommentsArray)
   
    CommentsArray.forEach((element,index) => {
        console.log(element)
        document.getElementById('CommentsList').innerHTML+='<li class="Comments">'+element.UserName+'</br>'+element.CommentName+'</li>';
        });

    // const com=document.getElementsByClassName('Comments')[0];
    // console.log(com)
    /*document.querySelectorAll('Comments').forEach(item => {
      item.addEventListener('click', 
      function ClickComment() {
        alert("hhj")
      })
    })
*/

console.log(CommentsArray.length)
for(let i=0;i<CommentsArray.length;i++)
{
  console.log(i)
  document.getElementsByClassName('Comments')[i].addEventListener('click',
  function ClickComment()
  {
   // alert(i)
    //alert(CommentsArray[i].HighlightTextYcordinator)
    const ele=document.getElementById("MainPara")
    const MainParaEleArray=document.getElementsByTagName("p")
    console.log(MainParaEleArray)
    const textNode = ele.childNodes[0];
    scrollTo(0,(CommentsArray[i].HighlightTextYcordinator))
    
    var MarkElement=document.getElementById('Mark')
    if(MarkElement==null)
    {
    const range = document.createRange()
    const mark = document.createElement('mark');
    mark.setAttribute("id","Mark")
   // mark.setAttribute("color","blue")
    range.setStart(textNode, CommentsArray[i].HighlightTextRangeStartOffest);
    range.setEnd(textNode, CommentsArray[i].HighlightTextRangeEndOffest);
    range.surroundContents(mark);
    }
    else{
      const MainParaEle=document.getElementsByTagName('mark')
      while(MainParaEle.length)
      {
        //range.selectNodeContents(mark)
     //window.getSelection().removeAllRanges();
        var parent = MainParaEle[ 0 ].parentNode;
       
        console.log(parent)
        while( MainParaEle[ 0 ].firstChild ) {
          parent.insertBefore(  MainParaEle[ 0 ].firstChild, MainParaEle[ 0 ] );
      }
       parent.removeChild( MainParaEle[ 0 ] );
      }
      MainParaEleArray[0].normalize();
      const range = document.createRange()
    const mark = document.createElement('mark');
    mark.setAttribute("id","Mark")
    range.setStart(textNode, CommentsArray[i].HighlightTextRangeStartOffest);
    range.setEnd(textNode, CommentsArray[i].HighlightTextRangeEndOffest);
    range.surroundContents(mark);
    }
    
    

  }
  )
}
    }
  )
  
}

function documentMouseDown(event) {
/* if(event.target.id!=="twitter-share-btn" && getComputedStyle(twitterShareBtn).display==="block") {
  twitterShareBtn.style.display = "none";
  twitterShareBtn.classList.remove("btnEntrance");
  window.getSelection().empty();
}
*/
var popup= document.getElementById("Div1")
/*var icons= document.getElementById("twitterShareBtn");
icons.remove();
*/
popup.remove();
}

function shareTwitter()
{
   const selectedText = document.getSelection().toString().trim();
   //	alert(selectedText)
 // documentMouseDown()
 console.log(selectedText)
 if (selectedText != "") {
  window.open('https://twitter.com/intent/tweet?text='+encodeURI(selectedText) + '&url=' + encodeURI(document.URL));
}
}

//signout
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

var MyCommentsArray=[]
function ShowMyComments()
{
    var x=document.getElementById('ReadCommentsArea')
    var y=document.getElementById('MyComments')
      x.style.display='none'
    y.style.display='block'
    console.log(BlogId)
    
   
    var userData = localStorage.getItem("user");
    var userDataObj=JSON.parse(userData)
    var UserId=userDataObj.user._id;
    
    fetch(`http://localhost:5000/api/MyComments/${UserId}/${BlogId}`)
    .then(response=>response.json())
    .then(json=>
        {
            console.log(json,typeof(json))
            CommentsArray=[]
            document.getElementById('CommentsList').innerHTML=' '
            document.getElementById('MyCommentsList').innerHTML=' '
            console.log(CommentsArray)
            MyCommentsArray=[...json]
            console.log(MyCommentsArray)
            MyCommentsArray.forEach((element,index) => {
                console.log(element)
         document.getElementById('MyCommentsList').innerHTML+='<li class="Comments">'+'</br>'+element.CommentName+'</li>';
                });
                console.log(MyCommentsArray.length)
for(let i=0;i<MyCommentsArray.length;i++)
{
  console.log(i)
  document.getElementsByClassName('Comments')[i].addEventListener('click',
  function ClickComment()
  {
   // alert(i)
    //alert(MyCommentsArray[i].HighlightTextYcordinator)
    
    const ele=document.getElementById("MainPara")
    const MainParaEleArray=document.getElementsByTagName("p")
    console.log(MainParaEleArray)
    const textNode = ele.childNodes[0];
    scrollTo(0,(MyCommentsArray[i].HighlightTextYcordinator))
    
    var MarkElement=document.getElementById('Mark')
    if(MarkElement==null)
    {
    const range = document.createRange()
    const mark = document.createElement('mark');
    mark.setAttribute("id","Mark")
   // mark.setAttribute("color","blue")
    range.setStart(textNode, MyCommentsArray[i].HighlightTextRangeStartOffest);
    range.setEnd(textNode, MyCommentsArray[i].HighlightTextRangeEndOffest);
    range.surroundContents(mark);
    }
    else{
      const MainParaEle=document.getElementsByTagName('mark')
      while(MainParaEle.length)
      {
        //range.selectNodeContents(mark)
     //window.getSelection().removeAllRanges();
        var parent = MainParaEle[ 0 ].parentNode;
       
        console.log(parent)
        while( MainParaEle[ 0 ].firstChild ) {
          parent.insertBefore(  MainParaEle[ 0 ].firstChild, MainParaEle[ 0 ] );
      }
       parent.removeChild( MainParaEle[ 0 ] );
      }
      MainParaEleArray[0].normalize();
      const range = document.createRange()
    const mark = document.createElement('mark');
    mark.setAttribute("id","Mark")
    range.setStart(textNode, MyCommentsArray[i].HighlightTextRangeStartOffest);
    range.setEnd(textNode, MyCommentsArray[i].HighlightTextRangeEndOffest);
    range.surroundContents(mark);
    }
  }
  )
}
    
 })
}



const BlogArray=[
  {
    blogId:0,
    blogHeader:'Kubernetes explained deep enough: Deployments',
    blogImg:'kubernet.png',
    Author:'Antima Bhatra',
    blogContent:' Early on, organizations ran applications on physical servers. There was no way to define resource boundaries for applications in a physical server, and this caused resource allocation issues. For example, if multiple applications run on a physical server, there can be instances where one application would take up most of the resources, and as a result, the other applications would underperform. A solution for this would be to run each application on a different physical server. But this did not scale as resources were underutilized, and it was expensive for organizations to maintain many physical servers. '
  },
  {
    blogId:1,
    blogHeader:'What is Docker',
    blogImg:'docker.png',
    Author:'megha Bhatra',
    blogContent:'Docker is a software platform for building applications based on containers — small and lightweight execution environments that make shared use of the operating system kernel but otherwise run in isolation from one another. While containers as a concept have been around for some time, Docker, an open source project launched in 2013, helped popularize the technology, and has helped drive the trend towards containerization and microservices in software development that has come to be known as cloud-native development.'
  },
  {
      blogId:2,
    blogHeader:'why node  js',
    blogImg:'node.png',
    Author:'himanshu Bhatra',
    blogContent:'What it really means is that Node.js is not a silver-bullet new platform that will dominate the web development world. Instead, it’s a platform that fills a particular need. And understanding this is absolutely essential. You definitely don’t want to use Node.js for CPU-intensive operations; in fact, using it for heavy computation will annul nearly all of its advantages. Where Node really shines is in building fast, scalable network applications, as it’s capable of handling a huge number of simultaneous connections with high throughput, which equates to high scalability.'
  },
  {
    blogId:3,
    blogHeader:'Google Api',
    blogImg:'googleapi.png',
    Author:'bhavesh sharma',
    blogContent:'Google offers a set of client libraries for calling Google APIs in a variety of languages like Python, Java, and Node. GAPI is Google’s client library for browser-side JavaScript. It’s used in Google Sign-in, Google Drive, and thousands of internal and external web pages for easily connecting with Google APIs. First launched at Google I/O in 2012 to provide easy Google identity and API access, the client library is now used for thousands of domains and currently handles billions of Google API queries every day. Getting Started with GAPI The beautiful part about GAPI is that you do not need to  Google Sign-i'
  }
]

ShowBlog()
  
function  ShowBlog(){
  var imgsrc1='./images/'+BlogArray[0].blogImg
  var imgsrc2='./images/'
  console.log(imgsrc2)
 // console.log(document.getElementById('img2'))
  console.log(imgsrc1)
  document.getElementById('Blog1').innerHTML+='<h3>'+BlogArray[0].blogHeader+'</h3>'+'<img id="img1" src='+imgsrc1+'></img>'
  BlogArray.forEach(ShowthreeBlogs)
  function ShowthreeBlogs(item,index)
  {
    if(index<3)
  document.getElementById('Blogs').innerHTML+='<div class="blog2" id="blog"><span><h3>'+BlogArray[index+1].blogHeader +'</h3></span><span><img id="img2" src='+imgsrc2+BlogArray[index+1].blogImg+'></img></span></div>'

}
}

document.getElementById('Blog1').addEventListener('click',
function ClickBlog1()
{
//alert(BlogArray[0].blogHeader)
BlogId=0
var userData = localStorage.getItem("user");
if(userData!==null)
{
var userDataObj=JSON.parse(userData)
var UserId=userDataObj.user._id;
 Promise.all(
[
  fetch(`http://localhost:5000/api/comments/${BlogId}`),
  fetch(`http://localhost:5000/api/MyComments/${UserId}/${BlogId}`)
]
 )  
.then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
})
.then(
  json=>{
    console.log(json)
    console.log(json[0].length)
     document.getElementById('AllComments').innerHTML+=' '+json[0].length;
     document.getElementById('MyCommentsBtn').innerHTML+=' '+json[1].length
     document.getElementById('selectable-text-area').style.display='block'
document.getElementById('BlogsArea').style.display='none'
  document.getElementById('blogHeader').innerHTML=BlogArray[0].blogHeader
  document.getElementById('MainPara').innerHTML=BlogArray[0].blogContent
  }
)
}
else{
  fetch(`http://localhost:5000/api/comments/${BlogId}`)
  .then(response=>response.json())
  .then(json=>
    {
      document.getElementById('AllComments').innerHTML+=' '+json.length;
      document.getElementById('MyCommentsBtn').style.display='none '
      document.getElementById('selectable-text-area').style.display='block'
document.getElementById('BlogsArea').style.display='none'
  document.getElementById('blogHeader').innerHTML=BlogArray[0].blogHeader
  document.getElementById('MainPara').innerHTML=BlogArray[0].blogContent
      
    })
}
})


for(let i=1;i<BlogArray.length;i++)
{
  console.log(i)
  if(i<=3)
  {
  console.log(BlogArray[i].blogHeader)
  document.getElementsByClassName('blog2')[i-1].addEventListener('click',
function ClickBlog1()
{
//alert(BlogArray[0].blogHeader)

document.getElementById('selectable-text-area').style.display='block'
document.getElementById('BlogsArea').style.display='none'
console.log(i)
//console.log(BlogArray[i].blogHeader)
BlogId=BlogArray[i].blogId;
var userData = localStorage.getItem("user");
if(userData!==null)
{
var userDataObj=JSON.parse(userData)
var UserId=userDataObj.user._id;
Promise.all(
  [
    fetch(`http://localhost:5000/api/comments/${BlogId}`),
    fetch(`http://localhost:5000/api/MyComments/${UserId}/${BlogId}`)
  ]
   )  
  .then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  })
.then(
  json=>{
    console.log(json.length)
    document.getElementById('AllComments').innerHTML+=' '+json[0].length;   
    document.getElementById('MyCommentsBtn').innerHTML+=' '+json[1].length
  }
)
}
else{
  fetch(`http://localhost:5000/api/comments/${BlogId}`)
  .then(response=>response.json())
  .then(json=>
    {
      document.getElementById('AllComments').innerHTML+=' '+json.length;    
      document.getElementById('MyCommentsBtn').style.display='none '
    })
}
console.log(BlogId)
 document.getElementById('blogHeader').innerHTML=BlogArray[i].blogHeader
  document.getElementById('MainPara').innerHTML=BlogArray[i].blogContent
 
},false) 
}
}
