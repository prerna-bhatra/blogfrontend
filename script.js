//ShowComments()
//show signup


'use strict';
CheckLogin()

function CheckLogin()
{
  var UserLogin = localStorage.getItem("user");
  if(UserLogin!=null){
    document.getElementById('SIGNOUTBTN').style.display='block'
    document.getElementById('SIGNUPLOGIN').style.display='none'
  }
  else{
   
    document.getElementById('SIGNOUTBTN').style.display='none'
    document.getElementById('SIGNUPLOGIN').style.display='block'
  }

}
//global BlogId to save into database
let BlogId
// document.getElementById('Login').style.display = 'none';
const selectableTextArea = document.querySelectorAll(".selectable-text-area");
const twitterShareBtn = document.querySelector("#twitter-share-btn");

selectableTextArea.forEach(elem => {
elem.addEventListener("mouseup", selectableTextAreaMouseUp);
});

//document.addEventListener("mousedown", documentMouseDown);
function selectableTextAreaMouseUp(event) {
setTimeout(() => { // In order to avoid some weird behavior...
  const selectedText = window.getSelection().toString().trim();
  if(selectedText.length) { 
    const x = event.pageX;
    const y = event.pageY;
    const twitterShareBtnWidth = Number(getComputedStyle(twitterShareBtn).width.slice(0,-2));
    const twitterShareBtnHeight = Number(getComputedStyle(twitterShareBtn).height.slice(0,-2));
    if(document.activeElement !== twitterShareBtn) {
      twitterShareBtn.style.left = `${x - twitterShareBtnWidth*0.5}px`;
      twitterShareBtn.style.top = `${y - twitterShareBtnHeight*1.25}px`;
      twitterShareBtn.style.display = "block";
      twitterShareBtn.classList.add("btnEntrance");
    }
    else {
      twitterShareBtn.style.left = `${x-twitterShareBtnWidth*0.5}px`;
      twitterShareBtn.style.top = `${y-twitterShareBtnHeight*0.5}px`;
    }
  }    
}, 0);
}

//show this div when click on comment buttons

//read comments



var BlogArray=[
  
]

var BlogImg=[

]

FetchAndShowBlogs()

function FetchAndShowBlogs()
 {
    //show Trending blogs or top 6 blogs having most views
    fetch(`https://desolate-sierra-34755.herokuapp.com/api/ShowTrendingBlog`)
    .then(response=>response.json())
    .then(json=>
      {
        console.log(json)
        let d = document.createDocumentFragment();
        let TrendingRow=document.createElement('div')
        TrendingRow.setAttribute("id","TrendingRow")
        TrendingRow.setAttribute("class","row")
        json.result.forEach(ShowTrendingBlogs)
        function ShowTrendingBlogs(item,index)
        {
         
            //console.log(index)
            let TrendingColumns=document.createElement('div')
            TrendingColumns.setAttribute("id","TrendingColumns")
            TrendingColumns.setAttribute("class","col-md-4 TrendingColumns")
            TrendingRow.appendChild(TrendingColumns)
            //console.log(TrendingColumns)
          
        }    
        d.appendChild(TrendingRow)
        document.getElementById('BlogsArea').appendChild(d)
        
        json.result.forEach(ShowTrendingBlogs1)
        function ShowTrendingBlogs1(item,index)
        {
          // console.log( document.getElementsByClassName('TrendingColumns')[index])
          let imgsrc=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${item._id}`
         // console.log(imgsrc)
         document.getElementsByClassName('TrendingColumns')[index].innerHTML='<img id="blogimg" src='+imgsrc+'></img><h4>'+item.BlogHeading+'</h4><p>'+item.BlogContent.slice(0,50)+'   ...</p><p style="color:red">Read More</p><p class="HashTagItem">'+item.hashTags+'</p>'
         // console.log(typeof(item))
         document.getElementsByClassName('TrendingColumns')[index].addEventListener('click',
         function ClickOnReadBlog()
         {
        //  console.log(item._id)
          window.location.href=`ReadBlog.html?BlogId=${item._id}`
         })
          console.log(item)

        }

      
      })

      //show rest of the blogs
      fetch(`https://desolate-sierra-34755.herokuapp.com/api/ShowNewBlog`)
      .then(response=>response.json())
      .then(json=>
        {
          console.log(json)
          let d1 = document.createDocumentFragment();
          let NewRow=document.createElement('div')
          NewRow.setAttribute("id","NewRow")
          NewRow.setAttribute("class","row")
          json.result.forEach(ShowNewBlogs)
          function ShowNewBlogs(item,index)
          {
           
              //console.log(index)
              let NewColumns=document.createElement('div')
              NewColumns.setAttribute("id","NewColumns")
              NewColumns.setAttribute("class","col-md-4 NewColumns")
              NewRow.appendChild(NewColumns)
              //console.log(TrendingColumns)
            
          }    
          d1.appendChild(NewRow)
          document.getElementById('NewBlogsArea').appendChild(d1)
          
          json.result.forEach(ShowNewBlogs1)
          function ShowNewBlogs1(item,index)
          {
            // console.log( document.getElementsByClassName('TrendingColumns')[index])
            let imgsrc=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${item._id}`
           // console.log(imgsrc)
           document.getElementsByClassName('NewColumns')[index].innerHTML='<img id="blogimg" src='+imgsrc+'></img><h4>'+item.BlogHeading+'</h4><p>'+item.BlogContent.slice(0,50)+'   ...</p><p style="color:red">Read More</p><p class="HashTagItem">'+item.hashTags+'</p>'
           // console.log(typeof(item))
           document.getElementsByClassName('NewColumns')[index].addEventListener('click',
           function ClickOnReadBlog()
           {
          //  console.log(item._id)
            window.location.href=`ReadBlog.html?BlogId=${item._id}`
           })
            console.log(item)
  
          }
  
        
        })

//show rest of the blogs which are not trending and new 
        fetch(`https://desolate-sierra-34755.herokuapp.com/api/blogs`)
    .then(response=>response.json())
    .then(json=>
      {
        console.log(json)
        let d2 = document.createDocumentFragment();
        let AllBlogRow=document.createElement('div')
        AllBlogRow.setAttribute("id","AllBlogRow")
        AllBlogRow.setAttribute("class","row")
        json.result.forEach(ShowAllBlogs)
        function ShowAllBlogs(item,index)
        {
         
            //console.log(index)
            let AllBlogColumns=document.createElement('div')
            AllBlogColumns.setAttribute("id","AllBlogColumns")
            AllBlogColumns.setAttribute("class","col-md-4 AllBlogColumns")
            AllBlogRow.appendChild(AllBlogColumns)
            //console.log(TrendingColumns)
          
        }    
        d2.appendChild(AllBlogRow)
        document.getElementById('RestBlogsArea').appendChild(d2)
        
        json.result.forEach(ShowTrendingBlogs1)
        function ShowTrendingBlogs1(item,index)
        {
          // console.log( document.getElementsByClassName('TrendingColumns')[index])
          let imgsrc=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${item._id}`
         // console.log(imgsrc)
         document.getElementsByClassName('AllBlogColumns')[index].innerHTML='<img id="blogimg" src='+imgsrc+'></img><h4>'+item.BlogHeading+'</h4><p>'+item.BlogContent.slice(0,50)+'   ...</p><p style="color:red">Read More</p><p class="HashTagItem">'+item.hashTags+'</p>'
         // console.log(typeof(item))
         document.getElementsByClassName('AllBlogColumns')[index].addEventListener('click',
         function ClickOnReadBlog()
         {
        //  console.log(item._id)
          window.location.href=`ReadBlog.html?BlogId=${item._id}`
         })
          console.log(item)

        }

      
      })
      
    
    }


    function SearchItem()
    {
      let SearchItems=document.getElementsByClassName('HashTagItem')
      let SearchValue=document.getElementById('SearchBox').value
      document.getElementById('WihoutSearch').style.display='none'
      document.body.style.backgroundColor ='gray'
      document.getElementById('ShowSpinner').style.display='block'

      //frontend Search
      // for(let i=0;i<SearchItems.length;i++)
      // {
      //   let divitem=document.getElementsByClassName('TrendingColumns')[i]
      //   //console.log(divitem)
      //  let txtValue = divitem.textContent || divitem.innerText || divitem.img;
      //   console.log(txtValue)
      //   if (txtValue.indexOf(SearchValue) > -1) {
      //     divitem.style.display = "";
      // } else {
      //     divitem.style.display = "none";
      // }
      // }
      const data={hashtag:SearchValue}
      let hashtagArr=[]
      fetch(`https://desolate-sierra-34755.herokuapp.com/api/SearchByHashTag`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(json => {
          document.getElementById('HashTagArea').innerHTML=' '
          console.log(json.data)
        //  console.log()
          hashtagArr=[...json.data]
          console.log(hashtagArr)
          hashtagArr.forEach(ShowHashTagsSearch)

          function ShowHashTagsSearch(item,index)
          {
            document.body.style.backgroundColor ='white'
            document.getElementById('ShowSpinner').style.display='none'
              document.getElementById('HashTagArea').innerHTML+='<div class="row"><div class="col-md-4 SerachedDiv" id="SerachedDiv"><h4>'+item.BlogHeading +'</h4><p>'+item.BlogContent.slice(0,100) +'</p></div></div>'
              document.getElementById('HashTagArea').style.display="block"
              console.log(index)
          }
        //console.log('Success:',  JSON.stringify(json));    
      //  console.log(json.data)
        // data.data.forEach(ReplaceAllWithFound)
        hashtagArr.forEach(ClickeSearch)

        function ClickeSearch(item,index)
        {
          document.getElementsByClassName('SerachedDiv')[index].addEventListener('click',
            function Clicked()
            {
              window.location.href=`ReadBlog.html?BlogId=${item._id}`
            }
            )
        }

    })
      console.log(document.getElementById('SearchBox').value)
    if( document.getElementById('SearchBox').value=='')
    {
      document.getElementById('WihoutSearch').style.display='block'
      document.body.style.backgroundColor ='white'
      document.getElementById('ShowSpinner').style.display='none'
      document.getElementById('HashTagArea').style.display='none'
    }
    }
  

 var signout=document.getElementById('SignOut');
 console.log(signout)
 document.getElementById('SignOut').addEventListener('click',
 function SignOut()
 {
     console.log("signout")
     fetch('https://desolate-sierra-34755.herokuapp.com/api/signout')
     .then(response=>
         {
             console.log(response)
             localStorage.removeItem("user");
             window.location.href='index.html'
         }
 
     )
 })
