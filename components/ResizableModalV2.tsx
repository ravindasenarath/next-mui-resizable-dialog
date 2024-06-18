import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import { ReactNode, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Draggable, { ControlPosition } from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CropDinIcon from "@mui/icons-material/CropDin";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import "react-resizable/css/styles.css";
import { Rnd } from "react-rnd";

type DraggablePaperType = PaperProps & {
  defaultPosition?: ControlPosition;
};

const DraggablePaperComponent = (props: DraggablePaperType) => {
  const nodeRef = useRef(null);
  return (
    <Rnd>
      <Paper
        {...props}
        style={{
          margin: 0,
          maxHeight: "100%",
          maxWidth: "100%",
          height: "100%",
          width: "100%",
        }}
        ref={nodeRef}
      />
    </Rnd>
  );
};

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type DraggableDialogType = Overwrite<
  DialogProps,
  { PaperProps?: DraggablePaperType }
>;

const DraggableDialog = (props: DraggableDialogType) => {
  return <Dialog {...props} />;
};

const DialogWrapper = styled(DraggableDialog)(({ theme }) => ({
  position: "absolute",
}));

const Title = styled(DialogTitle)(({ theme }) => ({
  cursor: "move",
  backgroundColor: "#007db9",
  padding: 5,
  borderRadius: "10px 10px 0px 0px",
  boxShadow: "0 0 4px #000000b3",
}));

const TitleContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: 0,
}));

const DialogControlIcons = styled("div")(({ theme }) => ({
  marginLeft: "auto",
  color: "white",
}));

const ControlButton = styled(Button)(({ theme }) => ({
  color: "white",
  minWidth: 30,
}));

const ModalTitle = styled("span")(({ theme }) => ({
  fontWeight: 700,
  fontSize: "16px !important",
  color: "white",
  paddingTop: 5,
  paddingLeft: 10,
}));

type MapModalType = {
  status: boolean;
  title: string;
  defaultPosition?: ControlPosition;
  onClose: () => void;
  children: ReactNode;
};

const ResizableModal = ({
  status,
  onClose,
  title,
  defaultPosition,
  children,
}: MapModalType) => {
  const [height, setHeight] = useState(554);
  const [width, setWidth] = useState(1043);
  const [isFullscreen, setIsFullsreen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("dialogRef", dialogRef);
  }, [dialogRef]);

  const handleClose = (reason: string) => {
    if (reason === "backdropClick") return;
    onClose();
  };

  const handleCloseCick = () => {
    onClose();
  };

  const handleFullscreenClick = () => {
    setIsFullsreen(!isFullscreen);
    if (dialogRef.current?.offsetWidth) {
      setWidth(dialogRef.current?.offsetWidth);
    }
    if (dialogRef.current?.offsetHeight) {
      setWidth(dialogRef.current?.offsetHeight);
    }
  };

  const getResizableBoxHeight = (movementY: number) => {
    if (dialogRef == null || dialogRef.current == null) return;
    return isFullscreen ? dialogRef.current.offsetHeight : height + movementY;
  };

  const getResizableBoxWidth = (movementX: number) => {
    if (dialogRef == null || dialogRef.current == null) return;
    return isFullscreen ? dialogRef.current.offsetWidth : height + movementX;
  };

  const onResizableBoxResize = (event: any) => {
    // console.log('h: ', event.movementX, ' w:', event.movementX);
    setHeight(height + event.movementY);
    setWidth(width + event.movementX);
    // const h = isFullscreen ? dialogRef.current?.offsetWidth : getResizableBoxHeight(event.movementY as number)
    // if(h){
    //     setHeight(h)
    // }
    // const w = isFullscreen ? dialogRef.current?.offsetHeight : getResizableBoxWidth(event.movementX as number)
    // if(w){
    //     setWidth(w);
    // }
  };

  if (!status) {
    return null;
  }

  return (
    <>
      <Rnd>
        <Paper
          style={{
            margin: 0,
            maxHeight: "100%",
            maxWidth: "100%",
            height: "100%",
            width: "100%",
          }}
        >
          <Title id="draggable-dialog-title">
            <TitleContent>
              <ModalTitle>{title}</ModalTitle>
              <DialogControlIcons>
                <ControlButton title="Minimize" size="small">
                  <MinimizeIcon />
                </ControlButton>
                <ControlButton
                  title="Full Screen"
                  size="small"
                  onClick={handleFullscreenClick}
                >
                  {isFullscreen ? <FilterNoneIcon /> : <CropDinIcon />}
                </ControlButton>
                <ControlButton
                  title="Close"
                  size="small"
                  onClick={handleCloseCick}
                >
                  <CloseIcon />
                </ControlButton>
              </DialogControlIcons>
            </TitleContent>
          </Title>
          <DialogContent>{children}</DialogContent>
        </Paper>
      </Rnd>
    </>
  );
};

export default ResizableModal;
