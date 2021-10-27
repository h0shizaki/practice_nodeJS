function getData(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:3000/books",true)
    xhttp.onreadystatechange = ()=> {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            var trHTML = '';
            var objects = JSON.parse(xhttp.responseText); 

            for(let i = 0; i < objects['data'].length;i++ ){
                trHTML +='<tr>';
                trHTML +='<td>'+objects['data'][i]['id']+'</td>';
                trHTML +='<td>'+objects['data'][i]['name']+'</td>';
                trHTML +='<td>'+objects['data'][i]['author']+'</td>';
                trHTML +='<td><a class="btn btn-warning" href="editBook.html?id='+objects['data'][i]['id']+'">Edit</a></td>';
                trHTML +='<td><button onclick = "delBook('+objects['data'][i]['id']+')" class= "btn btn-danger">Delete</button></td>';
                trHTML +='</tr>';
            }
            document.querySelector('#myTable').innerHTML = trHTML;
        }
    }
    xhttp.send();
}

getData()

function delBook(id){
    console.log("Delete : "+id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE","http://localhost:3000/book",true)
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify({"id" : id}))
    alert("DELETE SUCCESS")
    getData()
}


