import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import Carousel from "./components/carousel";

gsap.registerPlugin(CSSPlugin);

function App() {
  return <Carousel />;
}

export default App;
