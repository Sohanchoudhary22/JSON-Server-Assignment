let name = document.getElementById("name");
let email = document.getElementById("email");
let photo = document.getElementById("photo");
let btn = document.getElementById("btn");
let cont = document.getElementById("cont");
let state = false;
let currentid = null;
let arr = [];
async function postData(){
    let obj = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        photo: document.getElementById("photo").value,
    };

    try{
        let res = await axios.post("http://localhost:3000/user",obj);
        alert("submitted");
    } catch (error){
        console.log(error);
    }
}

async function getData(){
    try{
        let res = await axios.get("http://localhost:3000/user");
        console.log(res.data)
        arr = res.data;
        displayData(arr);
    } catch (error){
        console.log(error);
    }
}

getData();

// <============delete=====================>
    async function deleteData(id){
        try{
            let res = await axios.delete(`http://localhost:3000/user/${id}`)
            getData();
        } catch (error){
            console.log(error);
        }
    }

function displayData(data) {
    cont.innerHtml= ""
    data.map((ele) =>{
        
        let div = document.createElement("div");
        let name= document.createElement("name");
        name.innerText = ele.name;
        let email = document.createElement("email");
        email.innerText = ele.email;
        let photo = document.createElement("img");
        photo.src = ele.photo;
        let btn = document.createElement("button");
        btn.innerText = "edit";
        btn.addEventListener("click", () =>{
            getDataforEdit(ele);
        });
        let del = document.createElement("button");
        del.innerText = "delete";

        del.addEventListener("click",() =>{
             deleteData(ele.id);
             alert("deleted");
        });

        div.append(photo,name,email,btn,del);
        cont.append(div);
    });
   
}
displayData(arr);

// <================edit==================>
    function getDataforEdit(data) {
        let obj = {
            name: document.getElementById("name").value = data.name,
            email: document.getElementById("email").value = data.email,
            photo: document.getElementById("photo").value = data.photo,
        };
        btn.innerText = "update";
        state = true;
        currentid = data.id;
    }



// <==============update=====================>
    async function updatedata(){
        let updateobj = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            photo: document.getElementById("photo").value,
        };
        try{
            let res = await axios.patch(`http://localhost:3000/user/${currentid}`,updateobj);
            alert("updated");
            state = false;
        } catch (error) {
            console.log(error);
        }
    }
    btn.addEventListener("click", () =>{
        if (state===true){
            updatedata();
        } else {
            postData();
        }
    });        