window.onload = async function() {
    let id = localStorage.getItem("vacinaId");

    const doc = await firebase.firestore().doc(`vacina/${id}`).get()

    document.querySelector(`.container-label input[value='${doc.data().dose}']`).checked = true //.value = doc.data().dose;
    document.getElementById("vacina").value = doc.data().name;
    document.querySelector("#datavc").value = doc.data().date
    document.querySelector("#dataNext").value = doc.data().NextVacina
}