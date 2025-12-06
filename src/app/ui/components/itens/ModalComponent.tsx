import { Box, Fade, Modal, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void;
    content: React.ReactNode;
}

const colors = {
    primaryBlue: '#1e3a8a',
    accentYellow: '#fcd34d',
};

export default function ModalComponent({ open, handleClose, content }: ModalComponentProps) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'relative',
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: '0 20px 60px rgba(30, 58, 138, 0.3)',
                        p: 0,
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        outline: 'none',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '10px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: colors.primaryBlue,
                            borderRadius: '10px',
                            '&:hover': {
                                background: colors.accentYellow,
                            },
                        },
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: colors.primaryBlue,
                            bgcolor: 'rgba(252, 211, 77, 0.1)',
                            zIndex: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: colors.accentYellow,
                                transform: 'rotate(90deg)',
                            },
                        }}
                    >
                        <Close />
                    </IconButton>

                    {/* Content */}
                    <Box sx={{ p: 2 }}>
                        {content}
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}