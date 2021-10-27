
const string_url = window.location.href;
const url = new URL(string_url)
const id = url.searchParams.get('id')
console.log(id)
loadBook(id)

function loadBook(id){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:3000/book/"+id,true)
    xhttp.send()
    xhttp.onreadystatechange = ()=> {
        if(xhttp.status === 200 && xhttp.readyState === 4){
            let objects = JSON.parse(xhttp.responseText)

            console.log(objects)
            document.querySelector('#bName').value = objects['data']['name'];
            document.querySelector('#bAuthor').value = objects['data']['author'];
        }
    }
   
}

function putData(data){
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT" ,"http://localhost:3000/book")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(data);

    alert("Book Edited");
    window.location.href = 'index.html'
}

const submit = document.querySelector('#edit');

submit.addEventListener('click' , ()=> {
    let bName = document.querySelector('#bName').value
    let bAuthor = document.querySelector('#bAuthor').value
    let data = JSON.stringify({"id": id,"name": bName , "author": bAuthor });

    console.log(data)

    putData(data);
})


