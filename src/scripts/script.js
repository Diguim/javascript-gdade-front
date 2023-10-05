const addButton = document.getElementById("add-button");
const searchButton = document.getElementById("search-button");
const attButton = document.getElementById("att-button");


/**
 * Envia para o back-end o JSON do formulário contidos no parametro
 * @param {*} values 
 */
function register(values) {
    //recebo os valores do formulario e envio para o back-end
    fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).catch((error) => {
        console.log(error);
    });
}

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const nameJob = document.querySelector("#name-job").value;
    const descJob = document.querySelector("#desc-job").value;
    const empresaJob = document.querySelector("#empresa-job").value;
    const linkJob = document.querySelector("#link-job").value;
    const empAnunJob = document.querySelector("#emp-anun-job").value;
    const linkAnunJob = document.querySelector("#link-anun-job").value;
    const dataEHora = new Date();

   
    const valores = {
        
        jobName: nameJob,
        descricao: descJob,
        empresa: empresaJob,
        link: linkJob,
        empAnun: empAnunJob,
        linkAnun: linkAnunJob,
        data: dataEHora.toLocaleDateString(),
        hora: dataEHora.toLocaleTimeString(),

        activeStatus: true,
        statusDescription: ["Send"],
        lastUpdatedDay: dataEHora.toLocaleDateString(),
        lastUpdatedTime: dataEHora.toLocaleTimeString(),
    };
    
    register(valores);
   
    
    document.getElementById("form-register").reset();
});


/**
 * transforma os dados recebidos em blocos HTML e os insere na página
 * @param {*} dados 
 */
function putInHtml(dados) {
    const contentShowSection = document.getElementById("content-show-section");
    console.log(dados);
    let newHtml = "";
    for(let i = 0; i < dados.length; i++){

        if(dados[i].id_job != 1){

            newHtml += `
            <div class="content-cards-jobs">
            <p class="id-destaque"> <span>#${dados[i].id_job}</span> </p>
            <h3>${dados[i].jobName}</h3>
            <p><span class="span-destaque">Descrição:</span> ${dados[i].descricao}</p>
            <p> <span class="span-destaque">Empresa:</span> ${dados[i].empresa}</p>
            <p> <span class="span-destaque"><a href="${dados[i].link}" target="_blank">Link da empresa</a></span></p>
            <p> <span class="span-destaque">Anunciante:</span> ${dados[i].empAnun}</p>
            <p> <span class="span-destaque"><a href="${dados[i].linkAnun}" target="_blank">Link do anúncio</a></span></p>
            <p> <span class="span-destaque">${dados[i].data}</span></p>
            <p> <span class="span-destaque">${dados[i].hora}</span></p>
            </div>`;
        }
    }
    contentShowSection.innerHTML = newHtml;


    //fazer um map ou mesmo um foreach tirando o dados.id_job != 1
}

/**
 * Busca no back-end todo o conteudo do banco para que possa enviar para a função PUTINHTML
 */
function attList() {
    fetch("http://localhost:8080/api/jobs")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            putInHtml(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
attButton.addEventListener("click", () => {
    attList();
});


function searchItems(typeSearch, dataSearch){

    fetch('http://localhost:8080/api/searchjobs?' + new URLSearchParams({ 
        typeSearch: typeSearch,
        dataSearch: dataSearch
    })).then((res) => res.json())
    .then((data) => {
        putInHtml(data)
    }).catch(error => console.log(error));

}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    const selectSearch = document.getElementById("select-search").value;
    const searchInput = document.getElementById("search-input").value;

    searchItems(selectSearch, searchInput);

    console.log("clicou no searchButton");
});
