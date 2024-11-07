import Image from 'next/image';

export function Imagem() {
  return (
    <div>
      <Image 
        src="https://ibb.co/FqSY8rn" 
        alt="Imagem" 
        className="w-full h-auto rounded-lg shadow-md"/>
    </div>
  );
}

// type AvatarPropos = {
//   size: number;
//   // name?: string; //parâmetros opcional "?"
// }

// function Avatar({size}: AvatarPropos) { //Propriedade pode ter uma valor padrão "size=100"
//   // console.log(size);
//   return (
//     <Image
//       className="avatar"
//       src="https://i.imgur.com/1bX5QH6.jpg"
//       alt="Lin Lanying"
//       width={size}
//       height={size}
//     />
//   );
// }

// type CardProps = {
//   children: React.ReactNode;
// }

// function Card({children}: CardProps) {
//   // console.log(children);
//   return <div className="p-3 border border-black rounded-lg">{children}</div>
// }

// export function  Image{
//   return (
//     <><Card>
//       <Avatar size={50} />
//     </Card><Card>
//         <span>Teste</span>
//         <span>Teste</span>
//       </Card></>
//   )

// };