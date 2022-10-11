firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.href = "../templates/index.html"
    }
})