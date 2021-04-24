import React, { useState, ReactNode, CSSProperties } from "react";
import Bar from "./Bar";
import { useInterval, usePrevious } from "./hooks";

export interface BarChartProps {
  data: Record<string, number[]>;
  timeline: string[];
  labels: Record<string, ReactNode>;
  colors: Record<string, string>;
  timeout: number;
  delay: number;
  timelineStyle: CSSProperties;
  textBoxStyle: CSSProperties;
  barStyle: CSSProperties;
  width: [number, number, number];
}

const sortAxis = (index: number, data: Record<string, number[]>) => {
  let toSort = Object.keys(data).map((name) => {
    return {
      name,
      val: data[name][index],
    };
  });

  toSort = toSort.sort((a, b) => {
    return b.val - a.val;
  });

  const maxVal = Math.max.apply(
    Math,
    toSort.map((item) => item.val)
  );
  const rank = toSort.reduce((acc, item, idx) => {
    return {
      ...acc,
      [item.name]: idx,
    };
  }, {}) as Record<string, number>;

  return {
    rank,
    maxVal,
  };
};

const BarChart = (props: BarChartProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { rank, maxVal } = sortAxis(currentIndex, props.data);
  const currentBarStyles = Object.keys(props.data).map((name) => {
    const barHeight = `calc(${props.barStyle.height} + ${props.barStyle.marginTop})`;

    return {
      ...props.barStyle,
      marginTop: `calc(${rank[name]} * ${barHeight})`,
      width: `${(100 * props.data[name][currentIndex]) / maxVal}%`,
      backgroundColor: props.colors[name],
    };
  });
  const prevBarStyles = usePrevious(currentBarStyles);

  const { clear } = useInterval(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex === props.timeline.length) {
      clear();
    } else {
      setCurrentIndex(nextIndex);
    }
  }, props.timeout + props.delay);

  return (
    <div className="container">
      <div className="timeline">{props.timeline[currentIndex]}</div>
      <div className="barChart">
        {Object.keys(props.data).map((name, index) => {
          return (
            <Bar
              key={name}
              name={name}
              value={props.data[name][currentIndex]}
              label={props.labels[name]}
              currentStyle={currentBarStyles[index]}
              prevStyle={
                prevBarStyles ? prevBarStyles[index] : currentBarStyles[index]
              }
              timeout={props.timeout}
              width={props.width}
              textBoxStyle={props.textBoxStyle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
