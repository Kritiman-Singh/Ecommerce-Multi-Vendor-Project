import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  createAdminCategory,
  fetchAdminCategories,
  type AdminCategory,
} from "./adminCatalogApi";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const Categories = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [level, setLevel] = useState(3);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setCategories(await fetchAdminCategories());
    } catch {
      setMessage({ type: "error", text: "Could not load categories. Is the backend running?" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleNameChange = (value: string) => {
    setName(value);
    setCategoryId(slugify(value));
  };

  const handleCreate = async () => {
    if (!categoryId.trim()) {
      setMessage({ type: "error", text: "Category id is required" });
      return;
    }
    setSaving(true);
    try {
      await createAdminCategory({
        name: name.trim() || categoryId.replace(/_/g, " "),
        categoryId: categoryId.trim(),
        level,
        parentCategoryId: parentCategoryId.trim() || undefined,
      });
      setMessage({ type: "success", text: `Category "${categoryId}" created` });
      setName("");
      setCategoryId("");
      setParentCategoryId("");
      load();
    } catch (e: any) {
      setMessage({
        type: "error",
        text: e?.response?.data?.error || "Could not create category",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] tracking-[0.35em] uppercase text-gold-soft">Catalog</p>
        <h1 className="mt-2 font-display text-3xl luxury-gradient-text">Categories</h1>
        <p className="mt-2 text-sm text-muted">
          Step 1 — create the category first (e.g. <span className="text-gold-soft">men_sherwanis</span>),
          then add products inside it.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="font-display text-xl text-cream mb-5">Create category</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            fullWidth
            label="Display name"
            placeholder="Men Sherwanis"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          <TextField
            fullWidth
            label="Category id (used in URLs)"
            placeholder="men_sherwanis"
            value={categoryId}
            onChange={(e) => setCategoryId(slugify(e.target.value))}
            helperText="Auto-generated from the name. Lowercase with underscores."
          />
          <TextField
            fullWidth
            select
            label="Level"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            helperText="1 = top (Men), 2 = mid, 3 = leaf (products live here)"
          >
            <MenuItem value={1}>1 — Top level</MenuItem>
            <MenuItem value={2}>2 — Mid level</MenuItem>
            <MenuItem value={3}>3 — Leaf (product category)</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Parent category id (optional)"
            placeholder="men_topwear"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            helperText="Only for level 2 and 3"
          />
        </div>
        <div className="mt-5">
          <Button variant="contained" onClick={handleCreate} disabled={saving} sx={{ px: 4 }}>
            {saving ? <CircularProgress size={22} /> : "Create Category"}
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Category Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Parent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id ?? cat.categoryId}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell className="text-gold-soft">{cat.categoryId}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>{cat.level}</TableCell>
                  <TableCell>{cat.parentCategory?.categoryId ?? "—"}</TableCell>
                </TableRow>
              ))
            )}
            {!loading && categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No categories yet — create your first one above.
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

export default Categories;
