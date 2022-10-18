import Layer from "./Layer";

function Object({ path, scale, position, step = 30, idx = 0 }) {
  const info = [
    {
      position: [-20, -4, step * 2],
      path: path + "0" + ((idx + 0) % 6) + ".png",
      args: [scale, scale],
    },
    {
      position: [-20, -4, step],
      path: path + "0" + ((idx + 1) % 6) + ".png",
      args: [scale, scale],
    },
    {
      position: [-20, -4, 0],
      path: path + "0" + ((idx + 2) % 6) + ".png",
      args: [scale, scale],
    },
    {
      position: [-20, -4, -step],
      path: path + "0" + ((idx + 3) % 6) + ".png",
      args: [scale, scale],
    },
    {
      position: [-20, -4, -step * 2],
      path: path + "0" + ((idx + 4) % 6) + ".png",
      args: [scale, scale],
    },
    {
      position: [-20, -4, -step * 3],
      path: path + "0" + ((idx + 5) % 6) + ".png",
      args: [scale, scale],
    },
  ];

  return (
    <group position={position}>
      <Layer {...info[0]} />
      <Layer {...info[1]} />
      <Layer {...info[2]} />
      <Layer {...info[3]} />
      <Layer {...info[4]} />
      <Layer {...info[5]} />
    </group>
  );
}

export default Object;
