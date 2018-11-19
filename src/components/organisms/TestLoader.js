import React from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";
import Grid from "@material-ui/core/Grid";
import translate from "utils/translate";
import PageTitle from "PageTitle";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import { padding } from "polished";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #fafafac7;
`;

const getData = percent => [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];

const generateColor = value => {
  if (value > 80) return "#33ab9f";
  if ((value > 30) & (value < 80)) return "orange";
  return "red";
};

const TestLoader = props => (
  <Grid
    container
    justify="center"
    alignContent="center"
    alignItems="center"
    style={{ height: "70vh", padding: "1%" }}
  >
    <svg viewBox="0 0 400 400" width="100%" height="100%">
      <VictoryPie
        standalone={false}
        animate={{ duration: 500 }}
        width={400}
        height={400}
        data={getData(props.percentage)}
        innerRadius={120}
        cornerRadius={25}
        labels={() => null}
        style={{
          data: {
            fill: d => {
              const color = generateColor(d.y);
              return d.x === 1 ? color : "transparent";
            },
          },
        }}
      />
      <VictoryAnimation duration={1000} data={props}>
        {newProps => (
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={200}
            y={200}
            text={`${newProps.percentage.toString().substring(0, 5)}%`}
            style={{ fontSize: 45 }}
          />
        )}
      </VictoryAnimation>
    </svg>
  </Grid>
);

export default TestLoader;
