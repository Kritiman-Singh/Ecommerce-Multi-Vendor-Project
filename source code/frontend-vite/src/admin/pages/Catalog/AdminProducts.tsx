import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteAdminProduct, fetchAdminProducts } from "./adminCatalogApi";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setProducts(await fetchAdminProducts());
    } catch {
      setMessage({ type: "error", text: "Could not load products. Is the backend running?" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Delete "${title}"? Customers will no longer see it.`)) return;
    try {
      await deleteAdminProduct(id);
      setMessage({ type: "success", text: "Product deleted" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setMessage({ type: "error", text: "Could not delete product" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.35em] uppercase text-gold-soft">Catalog</p>
          <h1 className="mt-2 font-display text-3xl luxury-gradient-text">All Products</h1>
          <p className="mt-2 text-sm text-muted">{products.length} products live on the storefront</p>
        </div>
        <Button variant="contained" onClick={() => navigate("/admin/add-product")} sx={{ px: 4 }}>
          + Add Product
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Selling</TableCell>
              <TableCell>Off</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.title} className="h-14 w-14 rounded-lg object-cover border border-line" />
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{p.title}</TableCell>
                  <TableCell className="text-gold-soft">{p.category?.categoryId}</TableCell>
                  <TableCell>₹{p.mrpPrice}</TableCell>
                  <TableCell>₹{p.sellingPrice}</TableCell>
                  <TableCell>{p.discountPercent}%</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => handleDelete(p.id, p.title)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
            {!loading && products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No products yet — click “Add Product” to publish your first one.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={!!message}
        autoHideDuration={5000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={message?.type || "success"} variant="filled" onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminProducts;
