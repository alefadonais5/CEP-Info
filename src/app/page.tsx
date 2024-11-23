
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
  const [addresses, setAddresses] = useState<Address[] | null >(null); 

  const [textValue, setTextValue] = useState("");


  async function HandleGetAddress() {
    setLoading(true);
    
    try {
      const result = await getAdress(textValue);

      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }
      
      const newAdress: Address = {
        id: self.crypto.randomUUID(),
        consultedAt: new Date(),
        ...result,
      };

      const newAddresses = [newAdress].concat(addresses ? addresses : []);
      setAddresses(newAddresses);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  function handleRemoveAddress(id: string) {
    const confirmRemoval = window.confirm("Tem certeza de que deseja remover este endereço?");
    if (confirmRemoval) {
      // Adiciona uma classe para animação de remoção
      const row = document.getElementById(id);
      if (row) {
        row.classList.add("opacity-0", "translate-x-[-10px]");
        setTimeout(() => {
          setAddresses((prev) => prev?.filter((address) => address.id !== id) || null);
        }, 300); // Aguarda o fim da animação
      }
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] text-[#F0F4EF] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center p-6 rounded-lg shadow-xl bg-[#1B263B]">
        <h1 className="text-2xl font-semibold mb-4">Consulta de Endereços</h1>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <label className="text-lg">CEP</label>
          <input
            onChange={(e) => setTextValue(e.target.value)}
            className="rounded-lg shadow-lg px-4 p-3 bg-[#0D1B2A] text-[#F0F4EF] placeholder-[#F0F4EF]"
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
            <td>{address.logradouro || "xxx"}</td>
            <td>{address.bairro || "xxx"}</td>
            <td>{address.localidade || "xxx"}</td>
            <td>{address.uf || "xxx"}</td>
            <td>{address.cep || "xxx"}</td>
            <td>{formatDate(address.consultedAt)}</td>
            <td>
              <button className="bg-red-600 p-0.5 flex justify-items-center"><MdOutlineDelete size={24}/></button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
