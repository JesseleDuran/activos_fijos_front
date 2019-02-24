import React, { Component } from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChopeddText from "../atoms/ChoppedText";

const Text = styled.span`
    margin: 0;
`;

const Dot = styled.span`
    font-weight: 800;
    font-size: 18;
    margin: 5px;
`;

class ActivoItem extends Component {

    onSelect = () => {
        const { onSelect, data, isSelected } = this.props;
        onSelect ? onSelect(!isSelected, data) : null;
    };

    render = () => {
        const {
            data,
            style,
            isSelected,
        } = this.props;
        return (
            <Grid
                container
                style={style}
                alignItems="center"
                title={data.modelo}
            >
                <Checkbox
                    type="checkbox"
                    checked={isSelected}
                    onClick={this.onSelect}
                />
                <Typography>
                    <Text>
                        <ChopeddText text={data.n_activo} length={30}/>
                    </Text>
                    <Dot>·</Dot>
                    <Text>
                        <ChopeddText text={data.modelo} length={30}/>
                    </Text>
                    <Dot>·</Dot>
                    <Text>
                        {data.marca}
                    </Text>
                    <Dot>·</Dot>
                    <Text>
                        <ChopeddText text={data.descripcion} length={30}/>
                    </Text>
                </Typography>
            </Grid>
        );
    };
}

export default ActivoItem;
