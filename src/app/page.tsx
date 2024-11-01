"use client";
import { getAdress } from "../../get-adress";
import { useState } from "react";

type Address = {
  id: string;
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  localidade: string; // Cidade
  logradouro: string;
  uf: string;
};;

const initialAddresses: Address [] = [
  {
    id: "1",
    bairro: "Centro",
    cep: "01001-000",
    complemento: "Apto 101",
    ddd: "11",
    localidade: "São Paulo",
    logradouro: "Praça da Sé",
    uf: "SP",
  },
  {
    id: "2",
    bairro: "Copacabana",
    cep: "22041-001",
    complemento: "Bloco B, Ap 502",
    ddd: "21",
    localidade: "Rio de Janeiro",
    logradouro: "Avenida Atlântica",
    uf: "RJ",
  },
  {
    id: "3",
    bairro: "Savassi",
    cep: "30140-071",
    complemento: "Loja 3",
    ddd: "31",
    localidade: "Belo Horizonte",
    logradouro: "Rua Pernambuco",
    uf: "MG",
  },
  {
    id: "4",
    bairro: "Meireles",
    cep: "60160-230",
    complemento: "Casa 10",
    ddd: "85",
    localidade: "Fortaleza",
    logradouro: "Rua Silva Jatahy",
    uf: "CE",
  },
];

// const nomes: string[] = [
//   "Augusto César",
//   "Douglas Henrique",
//   "Leandro Carvalho",
//   "Claudio José",
//   "Davi Araújo",
//   "Augusto César",
//   "Douglas Henrique",
//   "Leandro Carvalho",
//   "Claudio José",
//   "Davi Araújo",
// ];

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
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const[addresses, setAddresses] = useState<Address[]>(initialAddresses) //como defino um tipo para um estado


  const [textValue, setTextValue] = useState("");

  // let adress = "Rua teste";

  async function HandleGetAddress() {
    setLoading(true);
  
    try {
      const result = await getAdress(textValue);
  
      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }
      
      //Adiciona o novo endereço na primeira posição do array
      const newAddresses = [result, ...initialAddresses]
      setAddresses(newAddresses)

    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
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
        <span>Endereço: {}</span>
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

          {/* {nomes.map((nome, index) => (
             <li key= {index} >{nome}</li>
          ))} */}

        </ul>

        <ul>
          {addresses.map((adress) =>(
            <li key={adress.id}>{adress.localidade}</li>
          ))}
        </ul>
      
    </div>
  );
}
