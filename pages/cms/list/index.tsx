import React, { useState, useMemo } from 'react';
import {
    Box,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Stack,
    Tooltip,
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Select,
} from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useRouter } from 'next/router';
import { listQuery, useDeleteListMutation } from '@/customHooks/query/cms.query.hooks';
import Swal from 'sweetalert2';

// ✅ Define Product Interface
interface Product {
    _id: string;
    name: string;
    category: string;
    description: string;
    price: number;
}

export default function List() {
    const router = useRouter();
    const { data, isPending, refetch } = listQuery();
    const { mutate } = useDeleteListMutation();

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [modalCategory, setModalCategory] = useState('');

    const handleDelete = async (productId: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00bcd4',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            mutate(productId, {
                onSuccess: () => refetch(),
                onError: (error) => console.error("Error:", error),
            });
        }
    };

    const handleAddToCart = (product: Product) => {
        const cart: (Product & { quantity: number })[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = cart.find((item) => item._id === product._id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        Swal.fire({
            title: product.name,
            text: 'Successfully added to cart!',
            icon: 'success',
            timer: 1800,
            timerProgressBar: true,
            showConfirmButton: false,
            background: '#1e2a38',
            color: '#fff',
            position: 'top-end',
            toast: true,
            showClass: {
                popup: 'swal2-show animate__animated animate__fadeInRight',
            },
            hideClass: {
                popup: 'swal2-hide animate__animated animate__fadeOutRight',
            },
        });
    };

    const categories = useMemo(() => {
        if (!data?.product) return [];
        const allCategories = data.product.map((item: Product) => item.category);
        return Array.from(new Set(allCategories));
    }, [data]);

    const filteredProducts = useMemo(() => {
        if (!data?.product) return [];
        return data.product.filter((item: Product) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? item.category === selectedCategory : true)
        );
    }, [data, searchTerm, selectedCategory]);

    return (
        <Box sx={{ minHeight: '100vh', background: "linear-gradient(to right, #141E30, #243B55)", px: 2 }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid >
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
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h5" fontWeight="bold">
                                    Product List
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<ShoppingBagIcon />}
                                    onClick={() => router.push('/cms/addToCart')}
                                    sx={{
                                        background: 'linear-gradient(135deg, #00bcd4, #2196f3)',
                                        color: '#fff',
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                        px: 3,
                                        py: 1.5,
                                        textTransform: 'none',
                                        boxShadow: '0 6px 20px rgba(0, 188, 212, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #00acc1, #1976d2)',
                                            boxShadow: '0 8px 24px rgba(0, 188, 212, 0.4)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    View Cart
                                </Button>
                            </Box>

                            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    sx={{
                                        width: 280,
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: 1,
                                        input: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: '#fff' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Box display="flex" gap={2} alignItems="center">
                                    <Button
                                        onClick={() => {
                                            setModalCategory(selectedCategory);
                                            setCategoryModalOpen(true);
                                        }}
                                        variant="contained"
                                        sx={{
                                            background: 'linear-gradient(135deg, #00bcd4, #2196f3)',
                                            color: '#fff',
                                            borderRadius: '12px',
                                            fontWeight: 'bold',
                                            px: 3,
                                            py: 1.2,
                                            textTransform: 'none',
                                            boxShadow: '0 6px 20px rgba(0, 188, 212, 0.3)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #00acc1, #1976d2)',
                                                boxShadow: '0 8px 24px rgba(0, 188, 212, 0.4)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Filter by Category
                                    </Button>
                                    {selectedCategory && (
                                        <Button
                                            onClick={() => setSelectedCategory('')}
                                            size="small"
                                            sx={{
                                                color: '#fff',
                                                textTransform: 'none',
                                                background: 'linear-gradient(135deg, red , #2196f3)',
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                px: 2,
                                            }}
                                        >
                                            Clear Filter
                                        </Button>
                                    )}
                                </Box>
                            </Box>

                            {isPending ? (
                                <Box display="flex" flexDirection="column" alignItems="center" py={8}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <CircularProgress size={60} thickness={5} sx={{ color: '#00bcd4' }} />
                                    </motion.div>
                                    <Typography mt={3} variant="subtitle1" color="gray">
                                        Loading products...
                                    </Typography>
                                </Box>
                            ) : (
                                <TableContainer
                                    sx={{
                                        maxHeight: 480,
                                        overflowY: 'auto',
                                        borderRadius: 2,
                                        mt: 1,
                                        '&::-webkit-scrollbar': {
                                            width: '6px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                            borderRadius: '4px',
                                        },
                                    }}
                                >
                                    <Table stickyHeader size="small">
                                        <TableHead>
                                            <TableRow>
                                                {['Name', 'Category', 'Description', 'Price', 'Actions'].map((header) => (
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
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((item: Product) => (
                                                    <TableRow key={item._id} hover>
                                                        <TableCell sx={{ color: '#fff' }}>{item.name}</TableCell>
                                                        <TableCell sx={{ color: '#fff' }}>{item.category}</TableCell>
                                                        <TableCell sx={{ color: '#fff' }}>{item.description}</TableCell>
                                                        <TableCell sx={{ color: '#fff' }}>${item.price}</TableCell>
                                                        <TableCell align="center">
                                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                                <Tooltip title="Edit">
                                                                    <IconButton
                                                                        onClick={() => router.push(`/cms/details/${item._id}`)}
                                                                        sx={{
                                                                            color: '#00bcd4',
                                                                            '&:hover': {
                                                                                backgroundColor: 'rgba(0,188,212,0.2)',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Delete">
                                                                    <IconButton
                                                                        onClick={() => handleDelete(item._id)}
                                                                        sx={{
                                                                            color: '#f44336',
                                                                            '&:hover': {
                                                                                backgroundColor: 'rgba(244,67,54,0.2)',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Add to Cart">
                                                                    <IconButton
                                                                        onClick={() => handleAddToCart(item)}
                                                                        sx={{
                                                                            color: '#4caf50',
                                                                            '&:hover': {
                                                                                backgroundColor: 'rgba(76,175,80,0.2)',
                                                                            },
                                                                        }}
                                                                    >
                                                                        <ShoppingBagIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" sx={{ color: '#ccc', py: 4 }}>
                                                        No matching products found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Category Filter Modal */}
            <Dialog
                open={categoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
                        color: '#fff',
                        minWidth: 320,
                        px: 2,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Select Category</DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        value={modalCategory}
                        onChange={(e) => setModalCategory(e.target.value)}
                        displayEmpty
                        sx={{
                            mt: 2,
                            color: '#fff',
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#fff',
                            },
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            borderRadius: 2,
                        }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSelectedCategory(modalCategory);
                            setCategoryModalOpen(false);
                        }}
                        sx={{
                            background: 'linear-gradient(135deg, #00bcd4, #2196f3)',
                            color: '#fff',
                            textTransform: 'none',
                            borderRadius: 3,
                            fontWeight: 'bold',
                            px: 4,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00acc1, #1976d2)',
                            },
                        }}
                    >
                        Apply Filter
                    </Button>
                    <Button
                        onClick={() => setCategoryModalOpen(false)}
                        sx={{
                            textTransform: 'none',
                            color: '#ccc',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.08)',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
