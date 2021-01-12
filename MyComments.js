ShowMyComments()

console.log("comments")
function ShowMyComments()
{
    var MyCommentsArray=[]
    var userData = localStorage.getItem("user");
    var userDataObj=JSON.parse(userData)
    var UserId=userDataObj.user._id;
    fetch(`http://localhost:5000/api/MyComments/${UserId}`)
    .then(response=>response.json())
    .then(json=>
        {
            console.log(json,typeof(json))
            MyCommentsArray=[...json]
            console.log(MyCommentsArray)
            MyCommentsArray.forEach((element,index) => {
                console.log(element)
         document.getElementById('MyCommentsList').innerHTML+='<li class="MyComments">'+'</br>'+element.CommentName+'</li>';
                });
                console.log(MyCommentsArray.length)
for(let i=0;i<MyCommentsArray.length;i++)
{
  console.log(i)
  document.getElementsByClassName('MyComments')[i].addEventListener('click',
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


