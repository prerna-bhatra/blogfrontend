console.log("my blogs")
const UserData=window.localStorage.getItem('user')
showMyBlogs()

function showMyBlogs()
{
    if(UserData===null)
    {
        window.location.href='index.html'
    }
}