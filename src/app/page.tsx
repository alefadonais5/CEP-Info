"use client";
import { getAdress } from "../../get-adress";
import { useState } from "react";


type AvatarPropos = {
  size: number;
  // name?: string; //parâmetros opcional "?"
}
// function Avatar(props: AvatarPropos) {
//   const {name, size} = props;
function Avatar({size}: AvatarPropos) { //Propriedade pode ter uma valor padrão "size=100"
  console.log(size);
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
  console.log(children);
  return <div className="p-3 border border-black rounded-lg">{children}</div>
}



export default function Home() {
  const [adress, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  // let adress = "Rua teste";

  async function HandleGetAddress(){
    setLoading(true);
    try {
      const result = await getAdress("52051000");
      setAddress(result.logradouro);
      // adress = result;

      console.log(result.logradouro);
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
        <button onClick={HandleGetAddress} className={`${loading && 'opacity-30'} w-fit px-3 py-2 rounded-lg bg-primary text-white`}>
          {loading ? "Carregando..." : "Obter endereço"}        
        </button>
        {/* <button onClick={() => getAdress("55825000")} className="px-3 py-2 rounded-lg bg-primary text-white">Obter endereço</button> */}
      </div>
    </div>
  );
}
