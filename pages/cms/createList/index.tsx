import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useCreateListMutation } from "@/customHooks/query/cms.query.hooks";

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

const CreateList: React.FC = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateListMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/cms/list");
      },
      onError: () => {
        toast.error("Failed to create product");
      },
    });
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
      <Grid>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              padding: 6,
              backdropFilter: "blur(10px)",
              color: "#fff",
              width: "500px",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              sx={{ mb: 4 }}
            >
              Create Product
            </Typography>

            <TextField
              {...register("name")}
              label="Product Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
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
              label="Price"
              type="number"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
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
              label="Description"
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
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
              label="Category"
              fullWidth
              error={!!errors.category}
              helperText={errors.category?.message}
              margin="normal"
              InputLabelProps={{ style: { color: "#fff" } }}
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
                mt: 3,
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
                "Create Product"
              )}
            </Button>
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default CreateList;
