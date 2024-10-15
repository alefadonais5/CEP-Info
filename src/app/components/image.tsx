import Image from 'next/image';

export function Imagem() {
  return (
    <div>
      <Image 
        src="https://ibb.co/FqSY8rn" 
        alt="Descrição da imagem real" 
        className="w-full h-auto rounded-lg shadow-md"/>
    </div>
  );
}

  