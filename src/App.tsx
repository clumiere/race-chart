import React from "react";
import BarChart from "./BarChart";
import './App.css';

const randomColor = () => {
  return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255})`;
};

const len = 20;
const data = ["apple", "banana", "orange"].reduce(
  (res, item) => ({
    ...res,
    ...{
      [item]: Array(len)
        .fill(0)
        .map((_) => Math.floor(len * Math.random())),
    },
  }),
  {}
);

const keys = Object.keys(data);
const colors = keys.reduce(
  (res, item) => ({
    ...res,
    ...{ [item]: randomColor() },
  }),
  {}
);

const labels = keys.reduce((res, item, idx) => {
  return {
    ...res,
    ...{
      [item]: (
        <div style={{ textAlign: "center" }}>
          <div>{item}</div>
        </div>
      ),
    },
  };
}, {});

const timeline = Array(20)
  .fill(0)
  .map((itm, idx) => String(idx + 1));

function App() {
  return (
    <div className="App">
      <BarChart 
        data={data} 
        timeline={timeline}
        labels={labels}
        colors={colors}
        timeout={400}
        delay={100}
        timelineStyle={{
          textAlign: "center",
          fontSize: "50px",
          color: "rgb(148, 148, 148)",
          marginBottom: "100px"
        }}
        textBoxStyle={{
          textAlign: "right",
          color: "rgb(133, 131, 131)",
          fontSize: "30px",
        }}
        barStyle={{
          height: "60px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
        width={[15, 75, 10]}
      />
    </div>
  );
}

export default App;
