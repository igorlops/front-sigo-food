import { Box, Fade, Modal} from "@mui/material";
import React from "react";

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void
    content: React.ReactNode
}

export default function ModalComponent({open, handleClose, content}:ModalComponentProps) {
    const style = {
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
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