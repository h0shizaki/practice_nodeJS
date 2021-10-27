function postData(data){
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:3000/book",true)
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(data);

    alert("BOOK ADDED")
}

const submit = document.querySelector('#submit')


submit.addEventListener('click' , ()=>{
    console.log('test')
    let bName = document.querySelector('#bName').value
    let bAuthor = document.querySelector('#bAuthor').value
    let data = JSON.stringify({"name": bName , "author": bAuthor });

    console.log(data)

    postData(data);
    
    document.querySelector('#bName').value = '';
    document.querySelector('#bAuthor').value = '';
})