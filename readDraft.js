var url_string = window.location.href
var url = new URL(url_string);
var blogId = url.searchParams.get("blogId");
var userData = localStorage.getItem("user");
var userDataObj=JSON.parse(userData)


ShowDraftContent()
FetchDraftswithVersions()
function ShowDraftContent()
{

    fetch(`http://localhost:5000/api/ReadBlog/${blogId}`)
    .then(response=>response.json())
    .then(json=>
        {
            console.log(json)
            document.getElementById('Headinginput').value=json.data.BlogHeading;
           var imgsrc=`http://localhost:5000/api/blogs/img/${blogId}`;
           document.getElementById('DraftImg').src=imgsrc
            document.getElementById('ContentInput').value=json.data.BlogContent;

        })
}

var VerionsArr=[]
let counter=0;
function FetchDraftswithVersions()
{
    
  console.log("version") 
  console.log(typeof(blogId)) 
  fetch(`http://localhost:5000/api/EditDraftfetch/${userDataObj.user._id}/${blogId}`)
  .then(response=>response.json())
  .then(json=>
      {
          console.log(json)
          VerionsArr=[...json.data]
          document.getElementById('versions').innerHTML+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+VerionsArr.length
          VerionsArr.forEach(showversions)
           
          function showversions(item,index)
          {
             // console.log(VerionsArr[index+1].version)
             console.log(index)
            
            document.getElementById('AllVersions').innerHTML+='<div id="version" class="versionclass">'+VerionsArr[index].version+'.0.'+counter+'&nbsp;&nbsp;&nbsp'+VerionsArr[index].createdAt.slice(0,10)+'</div>'
            counter+=1;
            if(index<VerionsArr.length-1 && VerionsArr[index+1].version===VerionsArr[index].version+1){
                   counter=0;
                   
                 }
                 
            
          }

          VerionsArr.forEach(clickVersion)
          function clickVersion(item,index)
          {
            document.getElementsByClassName('versionclass')[index].addEventListener('click',
            function Clickv()
            {
                    //console.log(index)
                    document.getElementById('Headinginput').value=VerionsArr[index].EditedHeading;
                    document.getElementById('ContentInput').value=VerionsArr[index].EditedContent;
                    var imgsrc=`http://localhost:5000/api/EditDraftimg/${VerionsArr[index]._id}`;
                    document.getElementById('DraftImg').src=imgsrc


            } 
         )
          }
      })

}



document.getElementById('EditBtn').addEventListener('click',
function EnableForm()
{
  document.getElementById('ContentInput').disabled=false
  document.getElementById('Headinginput').disabled=false
  document.getElementById('imginput').disabled=false
  

}
)
