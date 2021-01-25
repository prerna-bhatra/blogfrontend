var url_string = window.location.href
var url = new URL(url_string);
var blogId = url.searchParams.get("blogId");
var userData = localStorage.getItem("user");
var userDataObj=JSON.parse(userData)
var defaultimg;
var DraftId;
let VerionsArr=[]

FetchDraftswithVersions()



let counter=0;
let counter1=1;
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
          if(VerionsArr.length===0)
          {
            document.getElementById('versions').innerHTML+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+1
          }
          else{
            document.getElementById('versions').innerHTML+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+VerionsArr.length
          }
          
          document.getElementById('AllVersions').innerHTML+='<div id="version1">1.0.0</div>'

          VerionsArr.forEach(showversions)
           
          function showversions(item,index)
          {
             // console.log(VerionsArr[index+1].version)
             
             console.log(index)
             if(VerionsArr[index].version===1)
             {
              document.getElementById('AllVersions').innerHTML+='<div id="version" class="versionclass">'+VerionsArr[index].version+'.0.'+counter1+'&nbsp;&nbsp;&nbsp'+VerionsArr[index].createdAt.slice(0,10)+'</div><div ><button class="deleteVersion1"><i class="fa fa-trash"></i></button></div>'
              counter1+=1; 
            }
             else{
              document.getElementById('AllVersions').innerHTML+='<div id="version" class="versionclass">'+VerionsArr[index].version+'.0.'+counter+'&nbsp;&nbsp;&nbsp'+VerionsArr[index].createdAt.slice(0,10)+'</div><div><button class="deleteVersion1"><i class="fa fa-trash"></i></button></div>'
              counter+=1;
              if(index<VerionsArr.length-1 && VerionsArr[index+1].version===VerionsArr[index].version+1){
                     counter=0;
                     
              }
             }
          }

          ShowDraftContent()
          
//show first version data

document.getElementById('version1').addEventListener('click',
function ChangeBlogDetails()
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
  
})
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

          VerionsArr.forEach(deleteVersion)
          function deleteVersion(item,index)
          {
            document.getElementsByClassName('deleteVersion1')[index].addEventListener('click',
            function deleteVersionClick()
            {
              fetch(`http://localhost:5000/api/DeleteDraft/${item._id}`)
              .then(response=>response.json)
              .then(json=>
                {
                  alert("deleted")
                // document.getElementById("AllVersions").innerHTML.reload
                  VerionsArr.splice(index,1)
                  console.log(VerionsArr)
                //  document.getElementsByClassName('deleteVersion1').splice(index,1)
               // console.log()
                //   document.getElementById("AllVersions").style.display='none'
               // Array.from()
               console.log(document.getElementsByClassName('versionclass'))
              //  Array.from(document.getElementsByClassName('versionclass')).splice(index,1)
              //  console.log( Array.from(document.getElementsByClassName('versionclass')).splice(index,1))
               Array.from(document.getElementsByClassName('versionclass'))[index].remove()
               Array.from(document.getElementsByClassName('deleteVersion1'))[index].remove()
                // setTimeout(function()
                // {  console.log("set time out 3 secondns")
                //   document.getElementById("AllVersions").style.display='block'
                // }, 3000);
                })
            })
          }
      })

}

//showing latest content of version in content
function ShowDraftContent()
{

  console.log("veriosn array is gloabbal",VerionsArr)
     if(VerionsArr.length===0)
     {
       //show original content verion 1.0.0
      fetch(`http://localhost:5000/api/ReadBlog/${blogId}/0`)
      .then(response=>response.json())
      .then(json=>
          {
              console.log(json)
              document.getElementById('Headinginput').value=json.data.BlogHeading;
             var imgsrc=`http://localhost:5000/api/blogs/img/${blogId}/0`;
             document.getElementById('DraftImg').src=imgsrc
              document.getElementById('ContentInput').value=json.data.BlogContent;
  
          })
     }
     else{
       //show latest version content
      document.getElementById('Headinginput').value=VerionsArr[VerionsArr.length-1].EditedHeading;
      var imgsrc=`http://localhost:5000/api/EditDraftimg/${VerionsArr[VerionsArr.length-1]._id}`;
      document.getElementById('DraftImg').src=imgsrc
       document.getElementById('ContentInput').value=VerionsArr[VerionsArr.length-1].EditedContent;
     }
   
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
      //store the new data into  verionArr
       VerionsArr.push(data)
      console.log(VerionsArr)
      console.log('Success:', data);
    alert("Successfully file uploaded")
    document.getElementById('EditForm').reset()
    document.getElementById("AllVersions").innerHTML+='<div id="version" class="versionclass">'+VerionsArr[VerionsArr.length-1].version+'.0.'+counter1+'&nbsp;&nbsp;&nbsp'+VerionsArr[VerionsArr.length-1].createdAt.slice(0,10)+'</div><div ><button class="deleteVersion1"><i class="fa fa-trash"></i></button></div>'
    counter1+=1
  //  document.getElementById("AllVersions").innerHTML.reload(window.location.href + " #here" );
 // document.getElementById("AllVersions").style.display='none'
 // document.getElementById("AllVersions").style.display='block'

        // setTimeout(function()
        // {  console.log("set time out 3 secondns")
        //   document.getElementById("AllVersions").style.display='block'
        // }, 3000);
      
        //new data is not working because the data is not getting chnaged into array
    })
    .catch((error) => {
    console.error('Error:', error);
    });

})





//Publish the draft
document.getElementById('PublishBtn').addEventListener('click',
function PublishDraft()
{
    let Headinginput=document.getElementById('Headinginput').value;
    let ContentInput=document.getElementById('ContentInput').value;
   let  Finalimg=document.getElementById('imginput').files[0]
   var formValues=document.querySelector('form');
   var data = new FormData();
   data.append('BlogImg',Finalimg)
  // data.append('UserId',userDataObj.user._id)
  data.append('BlogContent',ContentInput)
  data.append('BlogHeading',Headinginput)
  console.log(typeof(DraftId))
  if(DraftId===undefined)
  {
    DraftId=0;
  }
  console.log("DraftId",DraftId)
  fetch(`http://localhost:5000/api/PublishEditedDraft/${userDataObj.user._id}/${blogId}/${DraftId}`, {
    method: 'POST', 
    body: data,
    })
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);
    alert("Successfully blog published")
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
