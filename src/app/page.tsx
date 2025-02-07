
"use client";
import {useState } from "react";
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
    if (addresses === null) return;

    const filteredAddresses = addresses.filter(
      (endereco) => endereco.id !== id
    );

    setAddresses(filteredAddresses);
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
              <button className="bg-red-600 p-0.5 flex justify-items-center" onClick={() => handleRemoveAddress(address.id)}><MdOutlineDelete size={24}/></button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
