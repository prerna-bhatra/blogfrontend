//console.log("drafts")
const UserData=window.localStorage.getItem('user')
showDrafts()

var BlogArray=[
  
]

var BlogImg=[

]

function showDrafts()
{
    if(UserData===null)
    {
        window.location.href='index.html'
    }
    else{
        UserDataObj=JSON.parse(UserData)
    fetch(`https://desolate-sierra-34755.herokuapp.com/api/drafts/${UserDataObj.user._id}`)
  .then(response=>response.json())
  .then(json=>
    {
      //  console.log(json)
        BlogArray=[...json.data]
        //console.log(BlogArray)
        BlogArray.forEach(fetchImg)
        
        function fetchImg(item,index)
        {
         
          BlogImg[index]=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${BlogArray[index]._id}`
           
        }
       // console.log(BlogImg)

        BlogArray.forEach(showdrafts)

            function showdrafts(item,index)
            {
 document.getElementById('drafts').innerHTML+='<div class="col-md-8 DraftClass" id="draft"><div class="row"><div class="col-md-1"><img id="draftimg" width="100%" src='+BlogImg[index]+'></div>'+
'<div class="col-md-9"><h4>'+BlogArray[index].BlogHeading +'</h4><p>'+BlogArray[index].BlogContent.slice(0,150) +'...</p><p style="color:red">Read More</p></div></div>'
            }

            BlogArray.forEach(ClickDraft)
            
          function ClickDraft(item,index)
          {
           // console.log(index)
              document.getElementsByClassName('DraftClass')[index].addEventListener('click',
                function ReadDraft()
                {
                //  console.log(index)
                  window.location.href=`readDraft.html?blogId=${BlogArray[index]._id}` 
                }
              )
          }
    })
}
}