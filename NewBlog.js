var UserData=localStorage.getItem('user')
if(UserData===null)
{
  window.location.href='index.html'
}

//hashtag Input
let a = document.getElementById('hashTagInput');
a.addEventListener('keyup',addthis);

function addthis() {
    b = a.value.replace('#',''); 
    a.value = '#'+b
    
    if (a.value.indexOf(' '))
    {
    a.value = a.value.replace(' ','#');
    }
    
}

console.log(UserData)
document.getElementById('SaveBlog').addEventListener('click',
function  SaveBlog(event)
{
    event.preventDefault()
    console.log("saving")  
   var userDataobj=JSON.parse(UserData)
    var UserId= userDataobj.user._id;
    var UserName=userDataobj.user.name;
    console.log(UserId)
    var HeadingValue=document.getElementById('heading').value;
    var ContentValue=document.getElementById('content').value;
    var SaveModev=document.getElementById('SaveMode').value;
    console.log(HeadingValue,ContentValue,SaveModev)
    var blogimg=document.getElementById('imgtag').files[0]
    console.log(blogimg)
    var formValues=document.querySelector('form');
    console.log(formValues)
   
    //
    let HashTagsValue=document.getElementById('hashTagInput').value;
    let HashTagsArray=[]
    
    HashTagsArray=[...HashTagsValue.split("#")]
    console.log("arr type",typeof(HashTagsArray))
    console.log(HashTagsArray)
    let data = new FormData();
    data.append('BlogImg', document.getElementById('imgtag').files[0])
    data.append('SaveMode', SaveModev);
    data.append('BlogHeading',HeadingValue)
    data.append('BlogContent',ContentValue)
    data.append('UserId',UserId)
    data.append('UserName',UserName)
    data.append('hashTags',HashTagsArray)
    console.log(...data);
    

   fetch(`http://localhost:5000/api/blog/${UserId}`, {
        method: 'POST', 
        body: data,
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        alert("Successfully file uploaded")
        document.getElementById('formElem').reset()
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        
}
)


