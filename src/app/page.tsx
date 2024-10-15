import { Imagem } from "./components/image";
import { ListItems } from "./components/listitems";
import { MyButton } from "./components/my-button";
import { Paragraph } from "./components/paragraph";
import { Square } from "./components/square";
import { Title } from "./components/title";

export default function Home() {
  return (
    <div>
      <Title/>
      <Square />
      <MyButton />
      <ListItems />
      <Imagem />
      <Paragraph />
      <Headers />
    </div>
  );
}
