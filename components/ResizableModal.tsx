
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Paper, { PaperProps } from '@mui/material/Paper';
import { ReactNode, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropDinIcon from '@mui/icons-material/CropDin';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import "react-resizable/css/styles.css";

const DialogWrapper = styled(Dialog)(({ theme }) => ({
    // top: -150,
    // left: 1419,
    position: 'absolute'
}))

const Title = styled(DialogTitle)(({ theme }) => ({
    cursor: 'move',
    backgroundColor: '#007db9',
    padding: 5,
    borderRadius: '10px 10px 0px 0px',
    boxShadow: '0 0 4px #000000b3',
}))

const TitleContent = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    padding: 0
}))

const DialogControlIcons = styled('div')(({ theme }) => ({
    marginLeft: "auto",
    color: 'white'
}))

const ControlButton = styled(Button)(({ theme }) => ({
    color: 'white',
    minWidth: 30
}))

const ModalTitle = styled('span')(({ theme }) => ({
    fontWeight: 700,
    fontSize: '16px !important',
    color: 'white',
    paddingTop: 5,
    paddingLeft: 10
}))

type MapModalType = {
    status: boolean,
    title: string,
    onClose: () => void,
    children: ReactNode
}

const PaperComponent = (props: PaperProps) => {
    const nodeRef = useRef(null);
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            nodeRef={nodeRef}
            bounds="parent"
        >
            <Paper {...props} ref={nodeRef}/>
        </Draggable>
    );
}


const ResizableModal = ({ status, onClose, title,  children }: MapModalType) => {
    const [height, setHeight] = useState(554);
    const [width, setWidth] = useState(1043);
    const [isFullscreen, setIsFullsreen] = useState(false);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log('dialogRef', dialogRef)
    }, [dialogRef]);

    const handleClose = (reason: string) => {
        if (reason === 'backdropClick') return;
        onClose();
    };

    const handleCloseCick = () => {
        onClose();
    }

    const handleFullscreenClick = () => {
        setIsFullsreen(!isFullscreen);
        if(dialogRef.current?.offsetWidth){
            setWidth(dialogRef.current?.offsetWidth);
        }
        if(dialogRef.current?.offsetHeight){
            setWidth(dialogRef.current?.offsetHeight);
        }
    }

    const getResizableBoxHeight = (movementY: number) => {
        if(dialogRef == null || dialogRef.current == null) return;
        return isFullscreen ? dialogRef.current.offsetHeight : height + movementY;
    }

    const getResizableBoxWidth = (movementX: number) => {
        if(dialogRef == null || dialogRef.current == null) return;
        return isFullscreen ? dialogRef.current.offsetWidth : height + movementX;
    }

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
    }

    return (
        <>
            <DialogWrapper
                open={status}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                hideBackdrop={true}
                transitionDuration={0}
                maxWidth={false}
                fullScreen={isFullscreen}
                // container={() => document.getElementById('ui')}
                // style={{position: 'absolute'}}
                // BackdropProps={{ style: { position: 'absolute' } }}
                ref={(node) => {
                    dialogRef.current = node;
                    // Do your work requiring the node here, but make sure node isn't null.
                    console.log("ref function", node);
                  }}
            >
                <ResizableBox 
                    height={height}
                    width={width}
                    // resizeHandles={['e', 's', 'se']}
                    onResize={onResizableBoxResize}>
                    <>
                        <Title id="draggable-dialog-title">
                            <TitleContent>
                                <ModalTitle>{title}</ModalTitle>
                                <DialogControlIcons>
                                    <ControlButton title="Minimize" size="small">
                                        <MinimizeIcon/>
                                    </ControlButton>
                                    <ControlButton title="Full Screen" size="small" onClick={handleFullscreenClick}>
                                        {isFullscreen ? <FilterNoneIcon/> :  <CropDinIcon/>}
                                    </ControlButton>
                                    <ControlButton title="Close" size="small" onClick={handleCloseCick}>
                                        <CloseIcon/>
                                    </ControlButton>
                                </DialogControlIcons>
                            </TitleContent>
                        </Title>
                        <DialogContent>
                            <DialogContentText>
                                {children}
                            </DialogContentText>
                        </DialogContent>
                    </>
                </ResizableBox>
            </DialogWrapper>
        </>
    )
}

export default ResizableModal;