const BlogArray=[
    {
      blogId:0,
      blogHeader:'Kubernetes explained deep enough: Deployments',
      blogImg:'kubernet.png',
      blogContent:' Early on, organizations ran applications on physical servers. There was no way to define resource boundaries for applications in a physical server, and this caused resource allocation issues. For example, if multiple applications run on a physical server, there can be instances where one application would take up most of the resources, and as a result, the other applications would underperform. A solution for this would be to run each application on a different physical server. But this did not scale as resources were underutilized, and it was expensive for organizations to maintain many physical servers. '
    },
    {
      blogId:1,
      blogHeader:'What is Docker',
      blogImg:'docker.png',
      blogContent:'Docker is a software platform for building applications based on containers — small and lightweight execution environments that make shared use of the operating system kernel but otherwise run in isolation from one another. While containers as a concept have been around for some time, Docker, an open source project launched in 2013, helped popularize the technology, and has helped drive the trend towards containerization and microservices in software development that has come to be known as cloud-native development.'
    },
    {
        blogId:2,
      blogHeader:'why node  js',
      blogImg:'node.png',
      blogContent:'What it really means is that Node.js is not a silver-bullet new platform that will dominate the web development world. Instead, it’s a platform that fills a particular need. And understanding this is absolutely essential. You definitely don’t want to use Node.js for CPU-intensive operations; in fact, using it for heavy computation will annul nearly all of its advantages. Where Node really shines is in building fast, scalable network applications, as it’s capable of handling a huge number of simultaneous connections with high throughput, which equates to high scalability.'
    },
    {
      blogId:3,
      blogHeader:'Google Api',
      blogImg:'googleapi.png',
      blogContent:'Google offers a set of client libraries for calling Google APIs in a variety of languages like Python, Java, and Node. GAPI is Google’s client library for browser-side JavaScript. It’s used in Google Sign-in, Google Drive, and thousands of internal and external web pages for easily connecting with Google APIs. First launched at Google I/O in 2012 to provide easy Google identity and API access, the client library is now used for thousands of domains and currently handles billions of Google API queries every day. Getting Started with GAPI The beautiful part about GAPI is that you do not need to  Google Sign-i'
    }
  ]

  ShowBlog()
    
  function  ShowBlog(){
    var imgsrc1='./images/'+BlogArray[0].blogImg
    var imgsrc2='./images/'
    console.log(imgsrc2)
   // console.log(document.getElementById('img2'))
    console.log(imgsrc1)
    document.getElementById('Blog1').innerHTML+='<h3>'+BlogArray[0].blogHeader+'</h3>'+'<img id="img1" src='+imgsrc1+'></img>'
    BlogArray.forEach(ShowthreeBlogs)
    function ShowthreeBlogs(item,index)
    {
      if(index<3)
    document.getElementById('Blogs').innerHTML+='<div class="col-md-12" id="blog"><span><h3>'+BlogArray[index+1].blogHeader +'</h3></span><span><img id="img2" src='+imgsrc2+BlogArray[index+1].blogImg+'></img></span></div>'
     
  }
 
  }

document.getElementById('Blog1').addEventListener('click',
function ClickBlog1()
{
 // alert(BlogArray[0].blogHeader)

window.location.href='Blog.html'
document.getElementById('blogHeader').innerHTML=BlogArray[0].blogHeader;
})



