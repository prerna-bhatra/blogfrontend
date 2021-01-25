

document.getElementById('signClick').addEventListener('click',(event)=>{
    event.stopPropagation();
    event.preventDefault();
    document.getElementById('Login').style.display='block'
    document.getElementById('SignUp').style.display='none'
})

document.getElementById('loginClick').addEventListener('click',(event)=>{
    event.stopPropagation();
    event.preventDefault();
    document.getElementById('Login').style.display='none'
    document.getElementById('SignUp').style.display='block'
})

document.getElementById('signupsubmit').addEventListener('click',(event)=>{
    signupsubmit()
})

document.getElementById('loginSubmit').addEventListener('click',(event)=>{
    loginSubmit()
})


function signupsubmit()
{
    event.stopPropagation();
    event.preventDefault();
    var username=document.getElementById('name').value;
    var useremail=document.getElementById('email').value;
    var userpassword=document.getElementById('password').value;
    console.log(username,useremail,userpassword)
    const data = { name:username,email:useremail,password:userpassword };
        fetch('https://desolate-sierra-34755.herokuapp.com/api/signup', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        alert("signup successfull please login")
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}



function loginSubmit()
{
    console.log("login")
    event.stopPropagation();
    event.preventDefault();
    var useremail=document.getElementById('emailllogin').value;
    var userpassword=document.getElementById('passwordlogin').value;
    console.log(useremail,userpassword)
    const data = { email:useremail,password:userpassword };
        fetch('https://desolate-sierra-34755.herokuapp.com/api/signin', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if(data.err)
            {
                console.log('failed:',  JSON.stringify(data));
                alert("email or password incorrect")
            }
            else{
                console.log('Success:',  JSON.stringify(data));
                window.location.href='index.html'
            }
        
       // localStorage.setItem("user",JSON.stringify(data))
        
       //
        })
        .catch((error) => {
        console.error('Error:', error);
        });

}

