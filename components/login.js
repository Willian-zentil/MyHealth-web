function login() {
    let email = ""
    let password = ""
    

    if(document.getElementById("email").value) email = document.getElementById("email").value
    if(document.getElementById("password").value) password = document.getElementById("password").value

    firebase.auth().signInWithEmailAndPassword(email, password).then(response =>{
        loadingShow()
        document.querySelector(".disclaimer").classList.remove("active")
        window.location.href = "/templates/vacinas.html"
    }).catch(error => {
        console.log(error)
        document.querySelector(".disclaimer").classList.add("active")
    })
}

function resetPassword(){
    loadingShow()

    firebase.auth().sendPasswordResetEmail(document.getElementById("email").value).then(()=>{
        alert("Email enviado com sucesso!")
        loadingHide()
        window.location.href = "/templates/login.html"
    }).catch(error => {
        loadingHide()
        alert("Email incorreto")
    })
}