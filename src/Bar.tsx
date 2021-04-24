import React, { CSSProperties, ReactNode } from "react";
import { Transition } from "react-transition-group";

export interface BarProps {
  name: string;
  label: ReactNode;
  value: number;
  timeout: number;
  width: [number, number, number];
  prevStyle: CSSProperties;
  currentStyle: CSSProperties;
  textBoxStyle: CSSProperties;
}

type TransitionStateType = "entering" | "entered" | "exiting";

const Bar = (props: BarProps) => {
  const barDefaultStyle = {
    transition: `all ${props.timeout}ms ease-in-out`,
    ...props.prevStyle,
  };
  const posDefaultStyle = {
    transition: `all ${props.timeout}ms ease-in-out`,
    marginTop: props.prevStyle.marginTop,
  };
  const barTransitionStyls = {
    entering: props.prevStyle,
    entered: props.currentStyle,
    exiting: props.currentStyle,
  };
  const posTransitionStyles = {
    entering: { marginTop: props.prevStyle.marginTop },
    entered: { marginTop: props.currentStyle.marginTop },
    exiting: { marginTop: props.currentStyle.marginTop },
  };

  return (
    <div className="barContainer">
      <Transition in timeout={props.timeout}>
        {(state: TransitionStateType) => (
          <>
            <div
              style={{
                ...posDefaultStyle,
                ...posTransitionStyles[state],
                width: `${props.width[0]}%`,
              }}
            >
              {props.label}
            </div>
            <div style={{ width: `${props.width[1]}%` }}>
              <div
                className="bar"
                style={{
                  ...barDefaultStyle,
                  ...barTransitionStyls[state],
                }}
              />
            </div>
            <div
              style={{
                ...posDefaultStyle,
                ...posTransitionStyles[state],
                width: `${props.width[2]}%`,
              }}
            >
              <div style={props.textBoxStyle}>{props.value}</div>
            </div>
          </>
        )}
      </Transition>
    </div>
  );
};

export default Bar;
