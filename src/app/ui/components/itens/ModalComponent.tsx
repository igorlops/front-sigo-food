import { Box, Fade, Modal} from "@mui/material";
import React from "react";

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void
    content: React.ReactNode
}

export default function ModalComponent({open, handleClose, content}:ModalComponentProps) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        p: 4,
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open}>
                <Box sx={style}>
                    {content}
                </Box>
            </Fade>
        </Modal>
    )
}