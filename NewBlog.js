var UserData=localStorage.getItem('user')
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
    var data = new FormData();
    data.append('file', document.getElementById('imgtag').files[0])
    data.append('user', 'hubot');
    console.log(...data);
    /*for (var [key, value] of data.entries()) { 
        console.log(key, value);
      }
      */
    fetch(`http://localhost:5000/api/blog/${UserId}`, {
        method: 'POST', 
        body: data,
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}
)


