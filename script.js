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
    fetch(`http://localhost:5000/api/ShowTrendingBlog`)
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
          let imgsrc=`http://localhost:5000/api/blogs/img/${item._id}`
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

       /*
       
        function ShowTrendingBlogs(item,index)
       
       // console.log(document.getElementsByClassName('TrendingColumns'))
        var x= document.getElementsByClassName('TrendingColumns');
         console.log('unnn', x)
        
         
*/
      })
      //show rest of the blogs
    
    }


    function SearchItem()
    {
      let SearchItems=document.getElementsByClassName('HashTagItem')
      let SearchValue=document.getElementById('SearchBox').value

      // console.log(SearchItems)
      // console.log(Array.isArray(SearchItems))

      for(let i=0;i<SearchItems.length;i++)
      {
        let divitem=document.getElementsByClassName('TrendingColumns')[i]
        //console.log(divitem)
       let txtValue = divitem.textContent || divitem.innerText || divitem.img;
        console.log(txtValue)
        if (txtValue.indexOf(SearchValue) > -1) {
          divitem.style.display = "";
      } else {
          divitem.style.display = "none";
      }
      }
      // SearchItems.forEach(ShowSearch)

      //     function ShowSearch(item,index)
      //     {
      //       console.log(item)
      //     }
    }
  

  
 var signout=document.getElementById('SignOut');
 console.log(signout)
 document.getElementById('SignOut').addEventListener('click',
 function SignOut()
 {
     console.log("signout")
     fetch('http://localhost:5000/api/signout')
     .then(response=>
         {
             console.log(response)
             localStorage.removeItem("user");
             window.location.href='index.html'
         }
 
     )
 })
