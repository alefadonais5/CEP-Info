"use client";
import { useState } from "react";
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
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>(initialAddresses); //como defino um tipo para um estado

  const [textValue, setTextValue] = useState("");

  async function HandleGetAddress() {
    setLoading(true);

    try {
      const result = await getAdress(textValue);
      console.log(result);
      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }

      const newAdress: Address = {
        id: self.crypto.randomUUID(),
        consultedAt: new Date(),
        ...result,
      };
      console.log(newAdress);

      //Adiciona o novo endereço na primeira posição do array
      // const newAddresses = [result, ...initialAddresses]
      const newAddresses = [newAdress, ...addresses];
      setAddresses(newAddresses);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteAddress(id: string){
    const filteredAddresses = addresses.filter((address) => address.id !== id);

    setAddresses(filteredAddresses);
  }

  return (
    <body className="bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] text-[#F0F4EF] min-h-screen flex items-center justify-center">
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
              loading && "opacity-50"
            } w-full px-4 py-2 bg-[#16DB93] text-[#F0F4EF] rounded-lg hover:bg-[#12A875] transition-all duration-200`}
          >
            {loading ? "Carregando..." : "Obter endereço"}
          </button>
        </div>

        <table className="table-fixed mt-8 w-auto text-center bg-[#1B263B] text-[#F0F4EF] rounded-lg shadow-lg">
          <thead>
            <tr className="[&>*]:px-4 [&>*]:py-2 bg-[#0D1B2A]">
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
            {addresses.map((address) => (
              <tr key={address.id} className="[&>*]:px-4 [&>*]:py-2">
                <td>{address.logradouro}</td>
                <td>{address.bairro}</td>
                <td>{address.localidade}</td>
                <td>{address.uf}</td>
                <td>{address.cep}</td>
                <td>{formatDate(address.consultedAt)}</td>
                <td>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="bg-red-500 p-1 rounded-full text-white hover:bg-red-700 transition-all duration-200"
                  >
                    <MdOutlineDelete size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </body>
  );
}
