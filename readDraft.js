var url_string = window.location.href
var url = new URL(url_string);
var blogId = url.searchParams.get("blogId");
var userData = localStorage.getItem("user");
var userDataObj=JSON.parse(userData)
var defaultimg;
var DraftId;

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
                    DraftId=VerionsArr[index]._id;
                    console.log(DraftId,VerionsArr[index]._id)
                    console.log("DraftId",DraftId)
                    document.getElementById('DraftImg').src=imgsrc
                    console.log(imgsrc)
                    defaultimg=imgsrc
                    console.log(defaultimg)
                    console.log(typeof(defaultimg))

                 /* fetch(`http://localhost:5000/api/EditDraftimgjson/${VerionsArr[index]._id}`)
                    .then(response=>response.json())
                    .then(json=>
                      {

                        console.log(json)
                        
                      })
                      */
                      
            } 
         )
          }
      })

}

//console.log(document.getElementById('imginput'.value))
document.getElementById('imginput').addEventListener('change',
function ChangeImg()
{
 // document.getElementById('DraftImg').src=document.getElementById('imginput').value
 console.log(document.getElementById('imginput').value)
 console.log(document.getElementById('imginput').files[0].name)
 //document.getElementById('DraftImg').src=document.getElementById('imginput').files[0].name
 var input = document.getElementById("imginput");
var fReader = new FileReader();
fReader.readAsDataURL(input.files[0]);
fReader.onloadend = function(event){
    var img = document.getElementById("DraftImg");
    img.src = event.target.result;
}
})

var Draftimg;
document.getElementById('createDraftbtn').addEventListener('click',
function creaDraft(event)
{
  event.preventDefault()
   var newHeading=document.getElementById('Headinginput').value
   var newContent=document.getElementById('ContentInput').value
   console.log(newHeading,newContent)
   /*if(document.getElementById('imginput').files[0]===undefined)
   {
    //var Draftimg=
    Draftimg= defaultimg
    console.log(defaultimg)
    console.log(Draftimg)
   }
   else{
    Draftimg=document.getElementById('imginput').files[0]
   }
   */
  
   //console.log(Draftimg)
   Draftimg=document.getElementById('imginput').files[0]
   var formValues=document.querySelector('form');
   var data = new FormData();
   
   data.append('EditedImg',Draftimg)
  // data.append('UserId',userDataObj.user._id)
  data.append('EditedContent',newContent)
  data.append('EditedHeading',newHeading)
  console.log(typeof(DraftId))
  //this id is added in dbms collection when user does not change image and want to keep the previous image
  data.append("DummyId",DraftId)
  //data.append("draftId",)
  fetch(`http://localhost:5000/api/EditDraft/${userDataObj.user._id}/${blogId}`, {
    method: 'POST', 
    body: data,
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    alert("Successfully file uploaded")
    document.getElementById('EditForm').reset()
    })
    .catch((error) => {
    console.error('Error:', error);
    });

})


document.getElementById('EditBtn').addEventListener('click',
function EnableForm()
{
  document.getElementById('ContentInput').disabled=false
  document.getElementById('Headinginput').disabled=false
  document.getElementById('imginput').disabled=false

}
)
