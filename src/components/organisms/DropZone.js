import React from "react";
import Dropzone from "react-dropzone";
import Grid from "@material-ui/core/Grid";
import Button from "Button";
import PrimaryButton from "PrimaryButton";
import translate from "utils/translate";
import styled from "styled-components";
import { DotLoader } from "react-spinners";

const DropZoneBox = styled.div`
  width: 100%;
  background: #f9fbfd;
  border: 2px solid
    ${props =>
      props.uploadState === UploadStateEnum.error ? "#FF6F74" : "#16B497"};
  border-style: dashed;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const dropZoneStyle = {
  with: "100%",
  border: "none",
  padding: "10px",
};

const CenterParagraph = styled.p`
  width: 100%;
  text-align: center;
  margin: 0.5em;
`;

const CenterErrorParagraph = styled(CenterParagraph)`
  color: #ff6f74;
`;

export const UploadStateEnum = Object.freeze({
  waiting: 0,
  uploading: 1,
  error: 2,
  success: 3,
});

const DropZoneEmpty = () => (
  <Grid container justify="center">
    <CenterParagraph>
      {translate("loadFilePage.dropzone.placeholder1")}
    </CenterParagraph>
    <CenterParagraph>{translate("or")}</CenterParagraph>
    <PrimaryButton>{translate("selectFile")}</PrimaryButton>
    <CenterParagraph>
      {translate("loadFilePage.dropzone.placeholder2")}
    </CenterParagraph>
  </Grid>
);

const DropZoneUploading = () => (
  <div>
    <DotLoader color="#16B497" loading />
  </div>
);

const DropZoneError = () => (
  <DropZoneState
    img="img/csv_icon.png"
    paragraph={translate("loadFilePage.dropzone.error")}
    error
  />
);
const DropZoneSuccess = () => (
  <DropZoneState
    img="img/csv_icon.png"
    paragraph={translate("loadFilePage.dropzone.success")}
  />
);

const DropZoneState = ({ img, paragraph, error }) => (
  <Grid container justify="center">
    <img src={img} />

    {error ? (
      <CenterErrorParagraph>{paragraph}</CenterErrorParagraph>
    ) : (
      <CenterParagraph>{paragraph}</CenterParagraph>
    )}
  </Grid>
);

const DropZoneContent = ({ uploadState }) => {
  switch (uploadState) {
    case UploadStateEnum.success:
      return <DropZoneSuccess />;
    case UploadStateEnum.uploading:
      return <DropZoneUploading />;
    case UploadStateEnum.error:
      return <DropZoneError />;
    case UploadStateEnum.waiting:
      return <DropZoneEmpty />;
    default:
      return <DropZoneEmpty />;
  }
};

export const TIME_ON_SUCCESS = 10000; // 10s

class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [], uploadState: UploadStateEnum.waiting };
  }

  onDrop = files => {
    this.props.onFileUploaded(files[0], this.onUploadState);
    this.setState({
      files,
    });
  };

  onUploadState = uploadState => {
    this.setState({ uploadState });
    if (uploadState > 1)
      setTimeout(
        () => this.onUploadState(UploadStateEnum.waiting),
        TIME_ON_SUCCESS,
      );
  };

  render() {
    const { uploadState, files } = this.state;
    return (
      <Grid container className="dropzone" style={{ padding: "2%" }}>
        <DropZoneBox multiple={false} uploadState={uploadState}>
          <Dropzone onDrop={this.onDrop} style={dropZoneStyle}>
            <DropZoneContent files={files} uploadState={uploadState} />
          </Dropzone>
        </DropZoneBox>
      </Grid>
    );
  }
}

export default DropZone;
