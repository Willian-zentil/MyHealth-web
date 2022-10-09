
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