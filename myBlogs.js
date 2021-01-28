console.log("drafts")
const UserData=window.localStorage.getItem('user')
showDrafts()

let BlogArray=[
  
]

let BlogImg=[

]

let Week=[

]

let GraphData=[

]

function showDrafts()
{
    if(UserData===null)
    {
        window.location.href='index.html'
    }
    else{
        UserDataObj=JSON.parse(UserData)
    fetch(`http://localhost:5000/api/MyBlogs/${UserDataObj.user._id}`)
  .then(response=>response.json())
  .then(json=>
    {
        console.log(json)
        BlogArray=[...json.data]
        console.log(BlogArray)
        BlogArray.forEach(fetchImg)
        
        function fetchImg(item,index)
        {
         
          BlogImg[index]=`https://desolate-sierra-34755.herokuapp.com/api/blogs/img/${BlogArray[index]._id}`
           
        }
        console.log(BlogImg)

        BlogArray.forEach(showdrafts)

            function showdrafts(item,index)
            {
            
            document.getElementById('drafts').innerHTML+='<div class="col-md-8 DraftClass" id="draft"><div class="row"><div class="col-md-1"><img id="draftimg" width="100%" src='+BlogImg[index]+'></div>'+
            '<div class="col-md-9"><h4>'+BlogArray[index].BlogHeading +'</h4><p>'+BlogArray[index].BlogContent.slice(0,150) +'...</p><p style="color:red">Read More</p></div></div></div><div class="col-md-3 viewstats" id="viewstats"><h4>Click to View Weekly Stats</h4><br/><i style="font-size:77px" class="fa fa-bar-chart" aria-hidden="true"></i>&nbsp;&nbsp; &nbsp'+BlogArray[index].ViewStats.length+' views</div>'

            }

            BlogArray.forEach(ClickDraft)
            
          function ClickDraft(item,index)
          {
            console.log(index)
              document.getElementsByClassName('DraftClass')[index].addEventListener('click',
                function ReadDraft()
                {
                  console.log(index)
                  window.location.href=`readDraft.html?blogId=${BlogArray[index]._id}` 
                }
              )
          }

          BlogArray.forEach(ClickViewsStats)

          function ClickViewsStats(item,index)
          {
            //console.log("click")
           // document.getElementById('drafts').style.display='none'
            document.getElementsByClassName('viewstats')[index].addEventListener('click',
            function showGraph()
            {
              console.log("click")
              Week=[...BlogArray[index].ViewStats]
         
              console.log(Week)

              Week.forEach(d=>{
                d.dateObj =  moment(d.dateonview);  
              });
              
              function buildData(data, keyName ){
                let result = []; 
                _.forEach(data, (val, key)=>{
                  //key is week ,month or year depend upon method
                 // console.log("val",val,"length",val.length)
                  //console.log("key",key) 
                  result.push({[keyName]:key, count:val.length})
                })
                return result;
              }
              
              
              function groupAndBuild(data, dateMethod , groupKey) {
                let groupedData = _.groupBy(data, (d)=>{
                  return d.dateObj[dateMethod]()
                })
                GraphData=[...buildData(groupedData, groupKey)]
                return buildData(groupedData, groupKey)
              }
              //console.log(groupAndBuild(Week,'month','month'))
              console.log(groupAndBuild(Week,'week','week'))
              console.log(Array.isArray(groupAndBuild(Week,'week','week')))
              console.log(GraphData)
              //console.log(result)

              google.charts.load('44', {
                callback: drawBackgroundColor,
                packages: ['corechart']
              });
              
              function drawBackgroundColor() {

              //  const ArrFRomGrph= Object.entries(GraphData);

              //   console.log(ArrFRomGrph)
              const ArrFRomGrph=[]
              GraphData.forEach(ConverToGraph)
              
              function ConverToGraph(item,index)
              {
                ArrFRomGrph[index]= Object.values(GraphData[index])
              }
                
              console.log(ArrFRomGrph)
                var c = [
                  [new Date('3/16/2016'), 3],
                  [new Date('3/17/2016'), 5],
                  [new Date('3/18/2016'), 7],
                  [new Date('3/19/2016'), 9],
                ];
                
                
                var data = new google.visualization.DataTable();
                
                data.addColumn('string', 'Week');
                data.addColumn('number', 'Views');
               
              
                data.addRows(ArrFRomGrph);
              
                var options = {
                  hAxis: {
                    title: 'Time'
                  },
                  vAxis: {
                    title: 'Popularity'
                  },
                  backgroundColor: '#f1f8e9'
                };
              
                var chart = new google.visualization.LineChart(document.getElementById('graphDiv'));
                chart.draw(data, options);
              }

            }
          )

             
          }

         

    })
}
}