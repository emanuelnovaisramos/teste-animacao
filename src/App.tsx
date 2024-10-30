import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./App.scss";

function App() {
  const [centerIndex, setCenterIndex] = useState(0)
  const [animation, setAnimation] = useState(false);
  const [selectItem, setSelectItem] = useState<any>(null)
  const itens = [
    { name: "Camisa 1", src: "/image-1.png", probality: 20 },
    { name: "Camisa 2", src: "/image-2.png", probality: 20 },
    { name: "Camisa 3", src: "/image-3.png", probality: 20 },
    { name: "Camisa 4", src: "/image-4.png", probality: 20 },
    { name: "Camisa 5", src: "/image-5.png", probality: 20 },
  ];

  const drawItem = (itens) => {
    const totalProbabilidade = itens.reduce(
      (acc, item) => acc + item.probality,
      0
    );
    const random = Math.random() * totalProbabilidade;

    let acumulador = 0;
    for (const item of itens) {
      acumulador += item.probality;
      if (random < acumulador) {
        return item;
      }
    }
  };

  const handleClickDrawItem = () => {
    setAnimation(true);
    const item = drawItem(itens)
    console.log(item)
    setSelectItem(item)
    setTimeout(() =>{
      setAnimation(false)
    }, 5000)
  };

  const handleStopAnimation = () => {
    setAnimation(false);
  };


  
  const springs = itens.map((_, index) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSpring({
      from: { left: '0', scale: 1, zIndex: 3 },
      to: async (next) => {
        while (animation) {
          await next({ left: '0', scale: 1, zIndex: 3, config: { duration: 0 } });
          await next({ left: '-450px', scale: 1, config: { duration: 600 } });
          await next({ scale: 0.8, zIndex: -1, config: { duration: 300 } });
          await next({ left: '0px', zIndex: -1, config: { duration: 600 } });
          await next({ left: '300px', zIndex: -1, config: { duration: 600 } });
          await next({ scale: 1, zIndex: 1, config: { duration: 300 } });
          await next({ left: '0px', zIndex: 1, config: { duration: 600 } });
        }
      },
      delay: index * 600,
    })
  );
  

  return (
    <div className="container">
      <div className="container-itens">
        <img
          className={`center ${!animation ? "animation" : ""}`}
          src="/box.png"
          alt="Box"
        />
        {itens.map((item, index) => {
          const spring = springs[index];
          return (
            <animated.img
              key={index}
              src={item.src}
              className={`item item-${index + 1}`}
              alt={item.name}
              style={{
                position: "absolute",
                ...spring,
              }}
            />
          );
        })}
      </div>
      <button className="button" style={{ marginTop: "50px" }} onClick={handleClickDrawItem}>
        Sortear
      </button>
      <button className="button" style={{ marginTop: "50px" }} onClick={handleStopAnimation}>
        Parar
      </button>
      <p>{}</p>
    </div>
  );
}

export default App;
