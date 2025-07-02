import { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  editQuery,
  useUpdateListMutation,
} from "@/customHooks/query/cms.query.hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface FormInputs {
  name: string;
  price: number;
  description: string;
  category: string;
  
}
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

const UpdateList: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { mutate, isPending } = useUpdateListMutation();
  const { data, isError } = editQuery(slug as string);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (slug && typeof slug === "string" && data) {
      setValue("name", data.product.name);
      setValue("price", data.product.price);
      setValue("description", data.product.description);
      setValue("category", data.product.category);
    }
  }, [data, slug, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    if (!slug || typeof slug !== "string") {
      toast.error("Invalid product ID");
      return;
    }

    mutate(
      { payload: formData, id: slug },
      {
        onSuccess: () => {
          toast.success("Product updated successfully!");
          router.push("/cms/list");
        },
        onError: () => {
          toast.error("Failed to update product");
        },
      }
    );
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141E30, #243B55)",
        padding: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            padding: 5,
            backdropFilter: "blur(10px)",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            Update Product
          </Typography>

          <TextField
            {...register("name")}
            label="Product Name"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" }, shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
              },
              input: { color: "#fff" },
            }}
          />

          <TextField
            {...register("price")}
            label="Product Price"
            type="number"
            fullWidth
            error={!!errors.price}
            helperText={errors.price?.message}
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" }, shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
              },
              input: { color: "#fff" },
            }}
          />

          <TextField
            {...register("description")}
            label="Product Description"
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" }, shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
              },
              input: { color: "#fff" },
            }}
          />

          <TextField
            {...register("category")}
            label="Product Category"
            fullWidth
            error={!!errors.category}
            helperText={errors.category?.message}
            margin="normal"
            InputLabelProps={{ style: { color: "#fff" }, shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#00bcd4" },
                "&.Mui-focused fieldset": { borderColor: "#00bcd4" },
              },
              input: { color: "#fff" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              p: 1.5,
              fontWeight: "bold",
              background: "#00bcd4",
              "&:hover": { background: "#008ba3" },
            }}
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Update Product"
            )}
          </Button>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default UpdateList;
