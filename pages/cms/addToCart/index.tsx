import React, { useEffect, useState } from 'react';
import {
    Box, Grid, Paper, Typography, IconButton, CircularProgress, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Button, Stack, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { motion } from 'framer-motion';

// Define a proper type for cart items
type CartItem = {
    _id: string;
    name: string;
    quantity: number;
    price: number;
};

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
            setCart(savedCart);
            setLoading(false);
        }, 400);
        return () => clearTimeout(timeout);
    }, []);

    const handleOpenModal = (id: string) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleConfirmRemove = () => {
        if (selectedId) {
            const updatedCart = cart.filter(item => item._id !== selectedId);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        setOpen(false);
        setSelectedId(null);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Box sx={{ minHeight: '100vh', background: "linear-gradient(to right, #141E30, #243B55)" }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12} md={11} lg={10}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Paper
                            elevation={6}
                            sx={{
                                borderRadius: 4,
                                p: 3,
                                background: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(12px)',
                                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                                color: '#fff',
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom marginBottom={5}>
                                Your Cart
                            </Typography>

                            {loading ? (
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={8}>
                                    <CircularProgress sx={{ color: '#00bcd4' }} />
                                    <Typography mt={2}>Loading cart...</Typography>
                                </Box>
                            ) : cart.length === 0 ? (
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant="h6" color="gray">
                                        No cart items
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <TableContainer
                                        sx={{
                                            maxHeight: 480,
                                            overflowY: 'auto',
                                            borderRadius: 2,
                                            mt: 1,
                                            maxWidth: '100%',
                                            '&::-webkit-scrollbar': {
                                                width: '6px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                borderRadius: '4px',
                                            },
                                        }}
                                    >
                                        <Table stickyHeader size="small" sx={{ minWidth: 750 }}>
                                            <TableHead>
                                                <TableRow>
                                                    {['Name', 'Quantity', 'Price', 'Total', 'Actions'].map((header) => (
                                                        <TableCell
                                                            key={header}
                                                            align={header === 'Actions' ? 'center' : 'left'}
                                                            sx={{
                                                                color: '#fff',
                                                                fontWeight: 'bold',
                                                                backgroundColor: '#1e2a38',
                                                                position: 'sticky',
                                                                top: 0,
                                                                zIndex: 2,
                                                            }}
                                                        >
                                                            {header}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cart.map((item: CartItem) => (
                                                    <TableRow key={item._id} hover>
                                                        <TableCell sx={{ color: '#fff' }}>{item.name}</TableCell>
                                                        <TableCell sx={{ color: '#fff' }}>{item.quantity}</TableCell>
                                                        <TableCell sx={{ color: '#fff' }}>${item.price}</TableCell>
                                                        <TableCell sx={{ color: '#fff' }}>
                                                            ${(item.quantity * item.price).toFixed(2)}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                onClick={() => handleOpenModal(item._id)}
                                                                sx={{
                                                                    color: '#f44336',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(244,67,54,0.2)',
                                                                    },
                                                                }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
                                        <Typography variant="h6" fontWeight="bold">
                                            Total: ${total.toFixed(2)}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<ShoppingCartCheckoutIcon />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #00bcd4, #2196f3)',
                                                color: '#fff',
                                                borderRadius: '12px',
                                                fontWeight: 'bold',
                                                px: 4,
                                                py: 1.5,
                                                textTransform: 'none',
                                                boxShadow: '0 6px 20px rgba(0, 188, 212, 0.3)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #00acc1, #1976d2)',
                                                    boxShadow: '0 8px 24px rgba(0, 188, 212, 0.4)',
                                                    transform: 'translateY(-2px)',
                                                },
                                            }}
                                            onClick={() => alert('Checkout coming soon!')}
                                        >
                                            Checkout
                                        </Button>
                                    </Stack>
                                </>
                            )}
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Delete Confirmation Modal */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1e2a38',
                        color: '#fff',
                        borderRadius: 3,
                        px: 2
                    }
                }}
            >
                <DialogTitle fontWeight="bold">Remove Item</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#ccc' }}>
                        Are you sure you want to remove this item from your cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} sx={{ color: '#90caf9' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmRemove} sx={{ color: '#f44336' }} autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
