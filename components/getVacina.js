window.onload = async function() {
    let id = localStorage.getItem("vacinaId");

    const doc = await firebase.firestore().doc(`vacina/${id}`).get()

    document.querySelector(`.container-label input[value='${doc.data().dose}']`).checked = true //.value = doc.data().dose;
    document.getElementById("vacina").value = doc.data().name;
    document.querySelector("#datavc").value = doc.data().date
    document.querySelector("#dataNext").value = doc.data().NextVacina
    document.querySelector("#file-ip-1-preview").src = doc.data().urlFoto

    document.getElementById("unica").addEventListener("change", ()=>{
        document.getElementById("dataNext").value = null
        document.getElementById("dataNext").setAttribute('disabled', '')
    })

    if(document.getElementById("unica").checked){
        document.getElementById("dataNext").setAttribute('disabled', '')
        document.getElementById("unica").focus()
    }

    document.querySelectorAll(".container-label input").forEach(element => {
        element.addEventListener("change", ()=>{

            setTimeout(() => {
                loadingShow() 
            }, 150);
            
            document.querySelectorAll(".gender input:not(#unica)").forEach(element => { 
    
                setTimeout(() => {
                    if(element.checked){
                        document.getElementById("dataNext").removeAttribute('disabled', '');
                    }
                    loadingHide()
                }, 500);
            }) 
        })
    });
}