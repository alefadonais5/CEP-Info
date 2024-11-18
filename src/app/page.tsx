//alerta quando clicar para remover um item
// fazer uma verificação caso coloque cep inválido

"use client";
import { useEffect, useState } from "react";
import { getAdress } from "../../get-adress";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MdOutlineDelete } from "react-icons/md";

type Address = {
  id: string;
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  localidade: string; // Cidade
  logradouro: string;
  uf: string;
  consultedAt: Date;
};

const initialAddresses: Address[] = [
  {
    id: self.crypto.randomUUID(),
    bairro: "Centro",
    cep: "01001-000",
    complemento: "Apto 101",
    ddd: "11",
    localidade: "São Paulo",
    logradouro: "Praça da Sé",
    uf: "SP",
    consultedAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    bairro: "Copacabana",
    cep: "22041-001",
    complemento: "Bloco B, Ap 502",
    ddd: "21",
    localidade: "Rio de Janeiro",
    logradouro: "Avenida Atlântica",
    uf: "RJ",
    consultedAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    bairro: "Savassi",
    cep: "30140-071",
    complemento: "Loja 3",
    ddd: "31",
    localidade: "Belo Horizonte",
    logradouro: "Rua Pernambuco",
    uf: "MG",
    consultedAt: new Date(),
  },
  {
    id: self.crypto.randomUUID(),
    bairro: "Meireles",
    cep: "60160-230",
    complemento: "Casa 10",
    ddd: "85",
    localidade: "Fortaleza",
    logradouro: "Rua Silva Jatahy",
    uf: "CE",
    consultedAt: new Date(),
  },
];

function formatDate(date: Date) {
  const result = formatDistanceToNow(new Date(date), {
    includeSeconds: true,
    locale: ptBR,
  });
  return result;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[] | null >(null); //como defino um tipo para um estado

  const [textValue, setTextValue] = useState("");

  // async function handleGetAddress() {
    
  // }

  
  async function HandleGetAddress() {
    setLoading(true);
    
    try {
      const result = await getAdress(textValue);
      //console.log(result);
      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }
      
      const newAdress: Address = {
        id: self.crypto.randomUUID(),
        consultedAt: new Date(),
        ...result,
      };
      //console.log(newAdress);
      
      //Adiciona o novo endereço na primeira posição do array
      // const newAddresses = [result, ...initialAddresses]
      const newAddresses = [newAdress].concat(addresses ? addresses : []);
      setAddresses(newAddresses);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }
  
  function handleDeleteAddress(id:string){
    if (!addresses) return;
    const filtereAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(filtereAddresses)
    console.log(filtereAddresses);
  }

  useEffect(() => {
    const result = localStorage.getItem("@addresses");

    if (result !== null){
      setAddresses(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    if(addresses === null) return;

    localStorage.setItem("@addresses", JSON.stringify(addresses));
  }, [addresses]);


  return (
    <div className=" flex flex-col items-center">
      <h1>Página Home</h1>

      <div className="flex flex-col gap-2">
        {String(loading)}
        <label>CEP</label>
        <input
          onChange={(e) => setTextValue(e.target.value)}
          className="rounded-lg shadow-lg px-4 p-3"
          placeholder="Digite um CEP válido"
        />

        <button
          onClick={HandleGetAddress}
          disabled={textValue === ""}
          className={`${
            loading && "opacity-30"
          } w-fit px-3 py-2  bg-blue-700 text-white rounded-lg`}
        >
          {loading ? "Carregando..." : "Obter endereço"}
        </button>
        {/* <button onClick={() => getAdress("55825000")} className="px-3 py-2 rounded-lg bg-primary text-white">Obter endereço</button> */}
      </div>
      <table className="table-auto [&>*>*>*]:border-2">
        <thead>
          <tr className="auto [&>*]:px-4 [&>*]:py-2">
            <th>Logradouro</th>
            <th>Bairro</th>
            <th>Localidade</th>
            <th>UF</th>
            <th>CEP</th>
            <th>Consultado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        {addresses?.map((address) => (
          <tr key={address.id} className="[&>*]:px-4 [&>*]:py-2">
            <td>{address.logradouro}</td>
            <td>{address.bairro}</td>
            <td>{address.localidade}</td>
            <td>{address.uf}</td>
            <td>{address.cep}</td>
            <td>{formatDate(address.consultedAt)}</td>
            <td>
              <button onClick={() => handleDeleteAddress(address.id)} className="bg-red-300 p-0.5 flex items-center"><MdOutlineDelete size={24}/></button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
