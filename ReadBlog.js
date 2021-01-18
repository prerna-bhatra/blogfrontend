var url_string = window.location.href
var url = new URL(url_string);
var BlogId = url.searchParams.get("blogId");
console.log(BlogId);
CheckLogin()
ReadBlog()

function CheckLogin()
{
  if(window.localStorage.getItem('user'))
  {
    document.getElementById('MyCommentsBtn').style.display='inline'
  }
  




}

function ReadBlog()
{
    fetch(`http://localhost:5000/api/ReadBlog/${BlogId}`)
    .then(response=>response.json())
    .then(json=>
        {
            console.log(json)
            document.getElementById('blogHeader').innerHTML=json.data.BlogHeading;
            var imgsrc=`http://localhost:5000/api/blogs/img/${BlogId}`;
            document.getElementById('BlogImg').src=imgsrc
            document.getElementById('MainPara').innerHTML=json.data.BlogContent;

        })
}


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