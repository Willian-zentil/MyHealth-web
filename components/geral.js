
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

    console.log(name, masculino, feminino, datNasc)
    if(email && name && datNasc && (masculino || feminino)){
        if(password != repeatPassword){
            document.querySelector(".disclaimer").classList.add("active")
        }else if(password != '' && password === repeatPassword){
            document.querySelector(".disclaimer").classList.remove("active")
            document.querySelector(".btn-verde").removeAttribute("disabled")
        }
    }
    
}

document.querySelectorAll('.cadastro-user input').forEach(element => {
    element.addEventListener('keyup', ()=>{
        validaCampo()
    })
});

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
  
function createVacina(){

    let dose = document.querySelector(".container-label input:checked");
    let vacina = document.getElementById("vacina")
    let dataVacina = document.querySelector("#datavc")
    let dataProxVacina = document.querySelector("#dataNext")
    //let comprovante = document.getElementById("file-ip-1-preview").value

    firebase.auth().onAuthStateChanged((user)=>{
        if(user) {
            const vacinas = firebase.firestore().collection('vacina');

            try{
                if(dose && vacina && dataVacina && dataProxVacina){
                    vacinas.doc(user.id).set({
                        NextVacina: dataProxVacina.value, date: dataVacina.value, name: vacina.value, dose: dose.value, userId: user.uid
                    })
        
                    alert("cadastro realizado com sucesso")
                    loadingShow()
                    setTimeout(() => {
                        window.location.href = "/templates/vacinas.html"
                    }, 2000);
                } else if(dose && vacina && dataVacina){
                    vacinas.doc(user.id).set({
                        date: dataVacina.value, name: vacina.value, dose: dose.value, userId: user.uid
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

function saveVacina(){
    loadingShow()

    let dose = document.querySelector(".container-label input:checked");
    let vacina = document.getElementById("vacina")
    let dataVacina = document.querySelector("#datavc")
    let dataProxVacina = document.querySelector("#dataNext")

    let id = localStorage.getItem("vacinaId");

    firebase.firestore().collection('vacina').doc(id).update({NextVacina: dataProxVacina.value, date: dataVacina.value, name: vacina.value, dose: dose.value}).then(()=>{
        loadingHide
        window.location.href = "/templates/vacinas.html"
    }).catch(error => {
        loadingHide
        alert("Erro ao excluir")
        console.log(error)
    })
}