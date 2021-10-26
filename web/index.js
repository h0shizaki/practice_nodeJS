
function loadData(){
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
                trHTML +='</tr>';
            }
            document.querySelector('#myTable').innerHTML = trHTML;
        }
    }
    xhttp.send();
}

loadData()
