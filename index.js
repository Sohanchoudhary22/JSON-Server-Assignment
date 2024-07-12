let name = document.getElementById("name");
let email = document.getElementById("email");
let course = document.getElementById("course");
let mobile = document.getElementById("mobile");
let photo = document.getElementById("photo");
let btn = document.getElementById("btn");
let cont = document.getElementById("cont");
let form= document.getElementById("form")
let state = false;
let currentid = null;
let arr = [];
async function postData(){
    let obj = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        mobile: document.getElementById("mobile").value,
        photo: document.getElementById("photo").value,
    };

    try{
        let res = await axios.post("http://localhost:3000/user",obj);
        alert("submitted");
        getData()
        form.reset();
        // console.log(res);
    } catch (error){
        console.log(error);
    }
}

async function getData(){
    try{
        let res = await axios.get("http://localhost:3000/user");
        console.log(res.data)
        arr = res.data;
        displayData();
    } catch (error){
        console.log(error);
    }
}




function displayData() {
    cont.innerHtml= ""
    arr.map((ele) =>{
        
        let div = document.createElement("div");
        let name= document.createElement("name");
        name.innerText = ele.name;
        let email = document.createElement("email");
        email.innerText = ele.email;
        let course = document.createElement("course");
         course.innerText = ele.course;
        let mobile = document.createElement("mobile");
        mobile.innerText = ele.mobile;
        let photo = document.createElement("img");
        photo.src = ele.photo;
        let div1=document.createElement("div1")
        let btn = document.createElement("button");
        btn.innerText = "edit";

        btn.style.padding="5px 25px"
        btn.style.backgroundColor="limegreen"
        btn.style.color="white"
        btn.addEventListener("click", () =>{
            getDataforEdit(ele);
        });
        let del = document.createElement("button");
        del.innerText = "delete";

        del.style.backgroundColor="firebrick"
        del.style.color="white"
        del.addEventListener("click",() =>{
             deleteData(ele.id);
            
        });
       div1.append(btn,del)
        div.append(photo,name,email,course,mobile,div1);
        cont.append(div);
    });
   
}

// <============delete=====================>
    async function deleteData(id){
        try{
            let res = await axios.delete(`http://localhost:3000/user/${id}`)
            alert("deleted");
            getData();
                } catch (error){
            console.log(error);
        }
    }

// displayData(arr);

// <================edit==================>
    function getDataforEdit(data) {
        let obj = {
            name: document.getElementById("name").value = data.name,
            email: document.getElementById("email").value = data.email,
            course: document.getElementById("course").value = data.course,
            mobile: document.getElementById("mobile").value = data.mobile,
            photo: document.getElementById("photo").value = data.photo
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
            course: document.getElementById("course").value,
            mobile: document.getElementById("mobile").value,
            photo: document.getElementById("photo").value,
        };
        try{
            let res = await axios.patch(`http://localhost:3000/user/${currentid}`,updateobj);
            alert("updated");
            getData()
            state = false;
            form.reset()
        } catch (error) {
            console.log(error);
        }
    }
    btn.addEventListener("click", (e) =>{
        e.preventDefault()
        if (state===true){
            updatedata();
        } else {
            postData();
        }
    });        
    getData();