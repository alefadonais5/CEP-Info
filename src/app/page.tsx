import { Imagem } from "./components/image";
import { Listitems } from "./components/listitems";
import { MyButton } from "./components/my-button";
import { Square } from "./components/square";
import { Title } from "./components/title";

export default function Home() {
  return (
    <div>
      <Title/>
      <Square />
      <MyButton />
      <Listitems />
      <Imagem />
    </div>
  );
}
