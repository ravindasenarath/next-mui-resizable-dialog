import MouseIcon from '@mui/icons-material/Mouse';
import { Tooltip } from '@mui/material';
import ResizableModal from './ResizableModal';
import { useState } from 'react';

const Application = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModalClick = () => {
        setModalOpen(false);
    }

    const handleOpenModalClick = () => {
        setModalOpen(true);
    }

    return (
        <div className="flex flex-row h-full w-full" id='ui'>
            <div className="w-24">
                <button onClick={handleOpenModalClick}>
                    <Tooltip title="Click to open modal">
                        <MouseIcon />
                    </Tooltip>
                </button>
            </div>
            <div className="h-full w-full bg-sky-500/50">
                <ResizableModal
                    onClose={handleCloseModalClick}
                    status={modalOpen}
                    title='Resizable Modal'
                    >
                    <p>Resizable and Draggable dialog box</p>
                </ResizableModal>
            </div>
        </div>
    );
}

export default Application;