"use client";
import { useState } from "react";
import { getAdress } from "../../get-adress";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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

  return (
    <div className="">
      <h1>Página Home</h1>

      <div className="flex flex-col gap-2">
        {String(loading)}
        <label>CEP</label>
        <input
          onChange={(e) => setTextValue(e.target.value)}
          className="rounded-lg shadow-lg"
          placeholder="Digite um CEP válido"
        />

        <button
          onClick={HandleGetAddress}
          disabled={textValue === ""}
          className={`${
            loading && "opacity-30"
          } w-fit px-3 py-2 rounded-lg bg-primary text-white`}
        >
          {loading ? "Carregando..." : "Obter endereço"}
        </button>
        {/* <button onClick={() => getAdress("55825000")} className="px-3 py-2 rounded-lg bg-primary text-white">Obter endereço</button> */}
      </div>

      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            {address.logradouro}, {formatDate(address.consultedAt)}
          </li>
        ))}
      </ul>
    </div>
  );
}
