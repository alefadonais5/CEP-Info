import { MyButton } from "./components/my-button";
import { Square } from "./components/square";
import { Title } from "./components/title";

export default function Home() {
  return (
    <div>
      <Title/>
      <Square />
      <MyButton />
    </div>
  );
}
