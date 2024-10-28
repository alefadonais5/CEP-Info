"use client";
import { getAdress } from "../../get-adress";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface Address {
  id: String,
  bairro: String,
  cep: Number,
  complemento: String,
  ddd: Number,
  logradouro: String,
  estado: String,
  uf: String,
  gia: String,
  ibge: String,
  localidade: String,
  siafi: Number,
  regiao: String
  unidade: String,
};

const addresses: Address [] = [];

addresses.push({
  id: uuidv4(),
  bairro: "Centro",
  cep: 111223345,
  complemento: "Apto 101",
  ddd: 11,
  logradouro: "Rua Exemplo",
  estado: "São Paulo",
  uf: "SP",
  gia: "1234",
  ibge: "1234567",
  localidade: "São Paulo",
  siafi: 1234,
  regiao: "Sudeste",
  unidade: "SP"
});

addresses.push({
  id: uuidv4(),
  bairro: "Copacabana",
  cep: 22070001,
  complemento: "Prédio Azul",
  ddd: 21,
  logradouro: "Avenida Atlântica",
  estado: "Rio de Janeiro",
  uf: "RJ",
  gia: "5678",
  ibge: "1234568",
  localidade: "Rio de Janeiro",
  siafi: 5678,
  regiao: "Sudeste",
  unidade: "RJ"
});

addresses.push({
  id: uuidv4(),
  bairro: "Savassi",
  cep: 30150001,
  complemento: "Casa 2",
  ddd: 31,
  logradouro: "Rua Pernambuco",
  estado: "Minas Gerais",
  uf: "MG",
  gia: "9101",
  ibge: "1234569",
  localidade: "Belo Horizonte",
  siafi: 9101,
  regiao: "Sudeste",
  unidade: "MG"
});

addresses.push({
  id: uuidv4(),
  bairro: "Jardim Paulista",
  cep: 1267895,
  complemento: "",
  ddd: 11,
  logradouro: "Rua Haddock Lobo",
  estado: "São Paulo",
  uf: "SP",
  gia: "1121",
  ibge: "1234570",
  localidade: "São Paulo",
  siafi: 1121,
  regiao: "Sudeste",
  unidade: "SP"
});

addresses.push({
  id: uuidv4(),
  bairro: "Vila Mariana",
  cep: 2398753,
  complemento: "Apto 502",
  ddd: 11,
  logradouro: "Rua Domingos de Moraes",
  estado: "São Paulo",
  uf: "SP",
  gia: "3141",
  ibge: "1234571",
  localidade: "São Paulo",
  siafi: 3141,
  regiao: "Sudeste",
  unidade: "SP"
});



const nomes: string[] = [
  "Augusto César",
  "Douglas Henrique",
  "Leandro Carvalho",
  "Claudio José",
  "Davi Araújo",
  "Augusto César",
  "Douglas Henrique",
  "Leandro Carvalho",
  "Claudio José",
  "Davi Araújo",
];

type AvatarPropos = {
  size: number;
  // name?: string; //parâmetros opcional "?"
}
// function Avatar(props: AvatarPropos) {
//   const {name, size} = props;
function Avatar({size}: AvatarPropos) { //Propriedade pode ter uma valor padrão "size=100"
  // console.log(size);
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={size}
      height={size}
    />
  );
}

type CardProps = {
  children: React.ReactNode;
}

function Card({children}: CardProps) {
  // console.log(children);
  return <div className="p-3 border border-black rounded-lg">{children}</div>
}



export default function Home() {
  const [adress, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const [textValue, setTextValue] = useState("");

  // let adress = "Rua teste";

  async function HandleGetAddress(){

    setLoading(true);

    try {
      const result = await getAdress(textValue);
      setAddress(result.logradouro);
      // adress = result;

      console.log(result);
    } catch (error){
      console.log

    }finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <h1>Página Home</h1>
      <Card>
        <Avatar size={50}/>
      </Card>
      

      <Card>
        <span>Teste</span>
        <span>Teste</span>
      </Card>
      <div className="flex flex-col gap-2">
        {String(loading)}
        <span>Endereço: {adress}</span>
        <input 
        onChange={(e) => setTextValue(e.target.value)}
        className="rounded-lg shadow-lg" 
        placeholder="Digite um CEP válido">
        </input>
        <button disabled={textValue ===""} onClick={HandleGetAddress} className={`${loading && 'opacity-30'} w-fit px-3 py-2 rounded-lg bg-primary text-white`}>
          {loading ? "Carregando..." : "Obter endereço"}        
        </button>
        {/* <button onClick={() => getAdress("55825000")} className="px-3 py-2 rounded-lg bg-primary text-white">Obter endereço</button> */}
      </div>

        <ul>
          {/* {nomes.map((nome) => {
             return <li>{nome}</li>
          })}; */}

          {nomes.map((nome, index) => (
             <li key= {index} >{nome}</li>
          ))}

        </ul>

        <ul>
          {addresses.map((adress) =>(
            <li key={adress.id}>{adress.logradouro}</li>
          ))}
        </ul>
      
    </div>
  );
}
