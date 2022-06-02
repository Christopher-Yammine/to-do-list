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
        let donebody=$("#donebody")[0];
        console.log(donebody);
       todos.innerHTML='';
       donebody.innerHTML='';
       let tododiv='';
       let donediv='';
       let todoslist=[];
        for (let i=0;i<=localStorage.length;i++){
            todoslist.push((JSON.parse(window.localStorage.getItem(i))));
            if (todoslist[i]==null) {continue;}
            if (todoslist[i].todoDone==0){
            tododiv+=` <div class="notdone">
            <div class="notdonetitle">
                <h3>${todoslist[i].todoTitle}</h3>
                <h3>${todoslist[i].todoRank}</h3>
                
            </div>
            <div class="notdonebody">
                <p>${todoslist[i].todoDesc}</p>
                <div>
                <button class="btncancel" id=${i+2}>❌</button>
                <button class="edit" id=${i+1}>✏️</button>
                <button class="btndone" id=${i}>🗸</button>
                </div>

            </div>
        </div>
        `} else {
            donediv+=`<div class="donetext">
            <div class="notdonetitle">
                <h3>${todoslist[i].todoTitle}</h3>
                <h3>${todoslist[i].todoRank}</h3>
                
            </div>
            <div class="notdonebody">
                <p>${todoslist[i].todoDesc}</p>
                

            </div>
        </div>
       `
            
        }


        }
        donebody.innerHTML+=donediv;
        todos.innerHTML+=tododiv;
        $(".btndone").click(function(event){
         
            
            counter--;
           
           let status=JSON.parse(window.localStorage.getItem(event.currentTarget.id));
           let doneObject ={
            todoId: todoslist[event.currentTarget.id].todoId,
            todoTitle:todoslist[event.currentTarget.id].todoTitle,
            todoRank:todoslist[event.currentTarget.id].todoRank,
            todoDesc:todoslist[event.currentTarget.id].todoDesc,
            todoDone:1,
            todoDate:todoslist[event.currentTarget.id].todoDate
            }
           window.localStorage.setItem(event.currentTarget.id,JSON.stringify(doneObject));
        
           console.log(status.todoDone);
           displayUndone();
           
           
        });
        $(".edit").click(function(event){
            $("#edittext").css("display","block");
            $("#finishediting").css("display","block");
            editingflag=event.currentTarget.id-1;
            console.log(editingflag);
        });
        $(".btncancel").click(function(event){
            window.localStorage.removeItem(event.currentTarget.id-2);
            displayUndone();
        });
        $("#finishediting").click(function(event){
            editedtext=$("#edittext")[0].value;
            let status=JSON.parse(window.localStorage.getItem(editingflag));
           let editedObject ={
            todoId: todoslist[editingflag].todoId,
            todoTitle:todoslist[editingflag].todoTitle,
            todoRank:todoslist[editingflag].todoRank,
            todoDesc:editedtext,
            todoDone:todoslist[editingflag].todoDone,
            todoDate:todoslist[editingflag].todoDate
            }
           window.localStorage.setItem(editingflag,JSON.stringify(editedObject));
        
           console.log(status);
           displayUndone();
            
            $("#edittext")[0].value='';
            $("#edittext").css("display","none");
            $("#finishediting").css("display","none");
            
        });
        $("#filter").click(sortRank);

        
    
    }

    function sortRank(){

        sortedlist=[];
        for (let i=0;i<localStorage.length;i++){
            
            sortedlist.push((JSON.parse(window.localStorage.getItem(i))));
            if (sortedlist[i]==null) {continue;}
           sortedlist.sort();
           window.localStorage.clear();
           let sortedObject ={
            todoId: sortedlist[i].todoId,
            todoTitle:sortedlist[i].todoTitle,
            todoRank:sortedlist[i].todoRank,
            todoDesc:sortedlist[i].todoDesc,
            todoDone:sortedlist[i].todoDone,
            todoDate:sortedlist[i].todoDate
            }
           window.localStorage.setItem(i,JSON.stringify(sortedObject));
           
           displayUndone();
           
          
        }
       
        

    }

    
    displayUndone();