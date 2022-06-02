/*const myObject = {
    name : "john doe",
    age : 32,
    gender : "male",
    profession : "optician" 
  }
  
  window.localStorage.setItem("myObject", JSON.stringify(myObject));
  console.log(window.localStorage.getItem("myObject"));
  let newObject = window.localStorage.getItem("myObject");
  console.log(JSON.parse(newObject));
  var d1 = new Date();*/
  let counter=localStorage.length;
  $("#btnadd")[0].addEventListener('click',saveValues)
  
 function saveValues(){
    let d1 = new Date();
    date=[d1.getDate(),d1.getMonth()+1,d1.getFullYear(),d1.getMinutes(),d1.getHours()]
    let id=Math.floor(Math.random() * 1000);
    let title=$("#todotext")[0].value;
    let rank=$("#importance")[0].value;
    let description=$("#description")[0].value;
    let isdone=0;
    
    let todoObject ={
        todoId: id,
        todoTitle:title,
        todoRank:rank,
        todoDesc:description,
        todoDone:isdone,
        todoDate:date
    }
    window.localStorage.setItem(counter, JSON.stringify(todoObject));
    counter++;
    displayUndone();
    }
    function displayUndone(){
        let todos=$("#todos")[0];
       todos.innerHTML='';
       let tododiv='';
       let todoslist=[];
        for (let i=0;i<localStorage.length;i++){
            todoslist.push((JSON.parse(window.localStorage.getItem(i))));
            if (todoslist[i]==null) continue;
            tododiv+=` <div class="notdone">
            <div class="notdonetitle">
                
                <h3>${todoslist[i].todoRank}</h3>
                
            </div>
            <div class="notdonebody">
                <p>${todoslist[i].todoDesc}</p>
                <button class="btndone" id=${i}>🗸</button>

            </div>
        </div>
        <hr>`
        }
        todos.innerHTML+=tododiv;
        $(".btndone").click(function(event){
           console.log(event.currentTarget.id);
           window.localStorage.removeItem(event.currentTarget.id);
           
           displayUndone();
        });
    

        
    
    }
    displayUndone();
    
    //console.log(todoObject.todoDate[4]);
    //console.log(title);
    //$("#todotext")[0].value='';
 