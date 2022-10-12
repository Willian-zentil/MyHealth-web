window.onload = function() {
    try{
        firebase.auth().onAuthStateChanged(async (user)=>{
            //console.log(user.uid)
            const doc = await firebase.firestore().collection(`vacina`).get()
            //console.log('doc', doc.docs)

            let div = ''
            let keyId = ''

            if(doc.docs){
                doc.docs.map(doc => {
                    keyId = doc._delegate._document.key.path.segments[6]
                    //console.log(keyId)

                    if(doc._delegate._document.data.value.mapValue.fields.userId.stringValue == user.uid){
                        //console.log(doc._delegate._document.data.value.mapValue.fields.name.stringValue)
                        div += `<div class="card">
                            <a id="${keyId}">
                                <h4>${doc._delegate._document.data.value.mapValue.fields.name.stringValue}</h4>
                                <span>${doc._delegate._document.data.value.mapValue.fields.dose.stringValue}</span>
                                <p>${doc._delegate._document.data.value.mapValue.fields.NextVacina.stringValue}</p>
                                <img src="../assets/images/rotulo.jfif">
                                <em class="${doc._delegate._document.data.value.mapValue.fields.NextVacina.stringValue? 'hasnot' : 'has'}">Não há próxima dose</em>
                                <em class="${doc._delegate._document.data.value.mapValue.fields.NextVacina.stringValue? 'has' : 'hasnot'}">Próxima dose em ${doc._delegate._document.data.value.mapValue.fields.NextVacina.stringValue}</em>
                            </a>
                        </div>`;
                    }
                })
            }

            let container = document.querySelector(".list-cards")
            container.innerHTML = div

            document.querySelectorAll('.card').forEach(element => {
                element.addEventListener('click', ()=>{
                    selectedVacina(element.children[0].attributes[0].nodeValue)
                })
            });
        })
    }catch(error){
        console.log(error)
        alert(Erro)
    }

    //document.querySelector(".list-cards").innerHTML = box
};


function selectedVacina(id){
    localStorage.setItem("vacinaId", id);
    window.location.href = "/templates/interno-vacina.html"
}