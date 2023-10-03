const addButton = document.getElementById("add-button");
const searchButton = document.getElementById("search-button");
const attButton = document.getElementById("att-button");

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

    const valores = {
        jobName: nameJob,
        descricao: descJob,
        empresa: empresaJob,
        link: linkJob,
        empAnun: empAnunJob,
        linkAnun: linkAnunJob,
    };
    register(valores);
});

function putInHtml(dados) {
    const contentShowSection = document.getElementById("content-show-section");
    console.log(dados);
    let newHtml = "";
    for(let i = 1; i < dados.length; i++){
        newHtml += `
        <div class="content-cards-jobs">
            <h3>${dados[i].jobName}</h3>
            <p>${dados[i].descricao}</p>
            <p>${dados[i].empresa}</p>
            <p>${dados[i].link}</p>
            <p>${dados[i].empAnunJob}</p>
            <p>${dados[i].linkAnunJob}</p>
            <p>dia</p>
            <p>hora</p>
        </div>`;
    }

    contentShowSection.innerHTML = newHtml;
}

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

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    //faz a busca de acordo com o escolhido no option[value]
    console.log("clicou no searchButton");
});
