import { Imagem } from "./components/image";
import { ListItems } from "./components/listitems";
import { MyButton } from "./components/my-button";
import { Paragraph } from "./components/paragraph";
import { Square } from "./components/square";
import { Title } from "./components/title";

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
    </div>
  );
}
