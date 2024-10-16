async function getAdress(cep: string){
    console.log(cep);

    const url = `https://viacep.com.br/ws/${cep}/json/`

    //console.log(url);

    try {
        const response = await fetch(url);
        //console.log(response);

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Ocorreu um erro inesperado.")
    }

    

}

getAdress("55825000");
console.log("Restante do código...")