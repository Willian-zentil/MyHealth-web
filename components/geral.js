
const body = document.querySelector('body')

document.querySelectorAll('.cadastro-user input').forEach(element => {
    element.addEventListener('keyup', ()=>{
        validaCampo()
    })
});

if(body.classList.contains('newvacina')){
    document.getElementById("unica").addEventListener("change", ()=>{
        document.getElementById("dataNext").value = null
        document.getElementById("dataNext").setAttribute('disabled', '');
    })
    
    document.getElementById("unica").addEventListener("focusout", ()=>{
        document.querySelectorAll(".gender input:not(#unica)").forEach(element => { 
            setTimeout(() => {
                if(element.checked){
                    document.getElementById("dataNext").removeAttribute('disabled', '');
                }
            }, 200);
        }) 
    })
}



function lettersOnly(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
        ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) &&
        (charCode < 97 || charCode > 122) && (carCode != 32)) {
        return false;
    }
    return true;
}

function loadingShow(){
    document.querySelector(".loading").classList.add("active")
    document.querySelector(".loading-gif").classList.add("active")
}

function loadingHide(){
    document.querySelector(".loading").classList.remove("active")
    document.querySelector(".loading-gif").classList.remove("active")
}

function validaCampo(){
    let password = document.getElementById("password").value
    let repeatPassword = document.getElementById("repeatPassword").value
    let email = document.getElementById("email").value
    let name = document.getElementById("name").value
    let masculino = document.getElementById("masculino").value
    let feminino = document.getElementById("feminino").value
    let datNasc = document.getElementById("data").value

    if(email && name && datNasc && (masculino || feminino)){
        if(password != repeatPassword){
            document.querySelector(".disclaimer").classList.add("active")
        }else if(password != '' && password === repeatPassword){
            document.querySelector(".disclaimer").classList.remove("active")
            document.querySelector(".btn-verde").removeAttribute("disabled")
        }
    }
    
}

function search(e){
    let title = ''
    let searchTxt = e.value.toLowerCase()

    document.querySelectorAll(".card h4").forEach(item => {
        title = item.textContent.toLowerCase()

        if(!title.includes(searchTxt)){
            item.parentElement.parentElement.classList.add("hide")
            item.parentElement.parentElement.classList.remove("show")
        }else {
            item.parentElement.parentElement.classList.remove("hide")
            item.parentElement.parentElement.classList.add("show")
        }
    });
}

function newUser() {
    loadingShow()

    firebase.auth().createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value).then(()=>{
        loadingHide()
        window.location.href = "/templates/vacinas.html"
    }).catch(error=>{
        loadingHide()
        alert(getErrorMessage(error))
    })
}

function getErrorMessage(error){
    return error.message
}

function logout(){
    //document.querySelector(".logout")
    firebase.auth().signOut().then(()=>{
        loadingShow()
        window.location.href = "/templates/login.html"
    }).catch((error)=>{
        getErrorMessage(error)
    })
}

function showPreview(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
  }
  
async function createVacina(){

    let dose = document.querySelector(".container-label input:checked");
    let vacina = document.getElementById("vacina")
    let dataVacina = document.querySelector("#datavc")
    let dataProxVacina = document.querySelector("#dataNext")
    let file = document.getElementById("file-ip-1").files[0]

    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(file.name)

    await fileRef.put(file)
    const fileUrl = await fileRef.getDownloadURL()
    
    firebase.auth().onAuthStateChanged((user)=>{
        if(user) {
            const vacinas = firebase.firestore().collection('vacina');

            try{
                if(dose.value && vacina.value && dataVacina.value && dataProxVacina.value){
                    vacinas.doc(user.id).set({
                        NextVacina: dataProxVacina.value, date: dataVacina.value, name: vacina.value, dose: dose.value, userId: user.uid, urlFoto: fileUrl
                    })
        
                    alert("cadastro realizado com sucesso")
                    loadingShow()
                    setTimeout(() => {
                        window.location.href = "/templates/vacinas.html"
                    }, 2000);
                } else if(dose.value && dose.classList.contains('unica') &&vacina.value && dataVacina.value){
                    vacinas.doc(user.id).set({
                        date: dataVacina.value, name: vacina.value, dose: dose.value, userId: user.uid, urlFoto: fileUrl
                    })
    
                    alert("cadastro realizado com sucesso")

                    loadingShow()
                    setTimeout(() => {
                        window.location.href = "/templates/vacinas.html"
                    }, 2000);
                }else {
                    alert("Preencha todos campos")
                }
            }catch(error){
                console.log(error)
                alert("Preencha todos campos")
            }
        }
    })
}

function removeVacina(){
    document.querySelector(".popup").style.display = "flex"
    document.querySelector(".loading").classList.add("active")

    document.querySelector(".btn-yes").addEventListener('click', ()=>{
        let id = localStorage.getItem("vacinaId");
        firebase.firestore().collection('vacina').doc(id).delete().then(()=>{
            loadingHide
            window.location.href = "/templates/vacinas.html"
        }).catch(error => {
            loadingHide
            alert("Erro ao excluir")
            console.log(error)
        })
    })
    document.querySelector(".btn-no").addEventListener('click', ()=>{
        hidepopUp()
    })
}

function hidepopUp(){
    document.querySelector(".popup").style.display = "none"
    document.querySelector(".loading").classList.remove("active")
}

async function saveVacina(){
    loadingShow()

    let dose = document.querySelector(".container-label input:checked");
    let vacina = document.getElementById("vacina")
    let dataVacina = document.querySelector("#datavc")
    let dataProxVacina = document.querySelector("#dataNext")

    let id = localStorage.getItem("vacinaId");

    let file = document.getElementById("file-ip-1").files[0]

    const storageRef = firebase.storage().ref()

    if(file){
        const fileRef = storageRef.child(file.name)

        await fileRef.put(file)
        const fileUrl = await fileRef.getDownloadURL()

        firebase.firestore().collection('vacina').doc(id).update({NextVacina: dataProxVacina.value, date: dataVacina.value, name: vacina.value, dose: dose.value, urlFoto: fileUrl}).then(()=>{
            loadingHide
            window.location.href = "/templates/vacinas.html"
        }).catch(error => {
            loadingHide
            alert("Erro ao excluir")
            console.log(error)
        })
    }else {
        firebase.firestore().collection('vacina').doc(id).update({NextVacina: dataProxVacina.value, date: dataVacina.value, name: vacina.value, dose: dose.value}).then(()=>{
            loadingHide
            window.location.href = "/templates/vacinas.html"
        }).catch(error => {
            loadingHide
            alert("Erro ao excluir")
            console.log(error)
        })
    }
}