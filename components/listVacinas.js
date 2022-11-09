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
                    let item = doc._delegate._document.data.value.mapValue.fields;
                    keyId = doc._delegate._document.key.path.segments[6]

                    if(item.userId.stringValue == user.uid){
                        div += `<div class="card">
                            <a id="${keyId}">
                                <h4>${item.name.stringValue}</h4>
                                <span>${item.dose.stringValue}</span>
                                <p>${item.NextVacina?item.NextVacina.stringValue : ''}</p>
                                <img src="${item.urlFoto ? item.urlFoto.stringValue : '../assets/images/rotulo.jfif'}">
                                <em class="${item.NextVacina == undefined || item.NextVacina.stringValue == '' ? 'has' : 'hasnot'}">Não há próxima dose</em>
                                <em class="${item.NextVacina != undefined && item.NextVacina.stringValue != '' ? 'has' : 'hasnot'}">Próxima dose em ${item.NextVacina?item.NextVacina.stringValue:''}</em>
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
};


function selectedVacina(id){
    localStorage.setItem("vacinaId", id);
    window.location.href = "/templates/interno-vacina.html"
}