const addButton = document.getElementById("add-button");
const searchButton = document.getElementById("search-button");
const attButton = document.getElementById("att-button");

function register(values){
    
    //recebo os valores do formulario e envio para o back-end
    
    fetch("http://localhost:8080/api/jobs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    }).catch(error => {
        console.log(error);
    })
    
}

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const nameJob = document.querySelector("#name-job").value;
    const descJob = document.querySelector("#desc-job").value;
    const empresaJob = document.querySelector("#empresa-job").value;
    const linkJob = document.querySelector("#link-job").value;
    const empAnunJob = document.querySelector("#emp-anun-job").value;
    const linkAnunJob = document.querySelector("#link-anun-job").value;
    
    const valores = {
        jobName: nameJob,
        descricao: descJob,
        empresa: empresaJob,
        link: linkJob,
        empAnun: empAnunJob,
        linkAnun: linkAnunJob
    }
    register(valores);
})

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    //faz a busca de acordo com o escolhido no option[value]
    console.log("clicou no searchButton");
})

attButton.addEventListener('click', () => {
    //atualiza todos os cards
    console.log("clicou no attButton");
})