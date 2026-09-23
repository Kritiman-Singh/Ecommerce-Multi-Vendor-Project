import { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Button,
  CircularProgress,
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
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../../util/uploadToCloudnary";
import {
  createAdminProduct,
  fetchAdminCategories,
  type AdminCategory,
} from "./adminCatalogApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("Zentro");
  const [color, setColor] = useState("");
  const [mrpPrice, setMrpPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [sizes, setSizes] = useState("M,L,XL");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchAdminCategories().then(setCategories).catch(() => {});
  }, []);

  const addImageUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setImageUrl("");
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadToCloudinary(file);
        if (url) setImages((prev) => [...prev, url]);
      }
    } catch {
      setMessage({ type: "error", text: "Image upload failed. Try a direct URL instead." });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !mrpPrice || !sellingPrice || !category3.trim() || images.length === 0) {
      setMessage({
        type: "error",
        text: "Title, MRP, selling price, leaf category and at least 1 image are required.",
      });
      return;
    }
    setSaving(true);
    try {
      await createAdminProduct({
        title: title.trim(),
        description: description.trim(),
        brand: brand.trim() || "Zentro",
        color: color.trim(),
        mrpPrice: Number(mrpPrice),
        sellingPrice: Number(sellingPrice),
        sizes,
        images,
        category: category1.trim() || category2.trim() || category3.trim(),
        category2: category2.trim() || category3.trim(),
        category3: category3.trim(),
      });
      setMessage({ type: "success", text: "Product created — visible to customers now." });
      setTimeout(() => navigate("/admin/products"), 1200);
    } catch (e: any) {
      setMessage({
        type: "error",
        text: e?.response?.data?.error || "Could not create product",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <p className="text-[11px] tracking-[0.35em] uppercase text-gold-soft">Catalog</p>
        <h1 className="mt-2 font-display text-3xl luxury-gradient-text">Add Product</h1>
        <p className="mt-2 text-sm text-muted">
          Step 2 — products are sold as <span className="text-gold-soft">Zentro Store</span> and appear
          on the storefront instantly under the leaf category.
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-card p-6 grid gap-4 md:grid-cols-2">
        <TextField fullWidth label="Product name" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Banarasi Silk Saree" />
        <TextField fullWidth label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid gap-4">
          <TextField fullWidth label="Color" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Maroon" />
          <TextField fullWidth label="Sizes (comma separated)" value={sizes} onChange={(e) => setSizes(e.target.value)} />
        </div>
        <TextField
          fullWidth
          label="MRP (₹)"
          type="number"
          value={mrpPrice}
          onChange={(e) => setMrpPrice(e.target.value)}
        />
        <TextField
          fullWidth
          label="Selling price (₹)"
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          helperText="Discount % is calculated automatically"
        />
        <TextField fullWidth label="Level 1 category" value={category1} onChange={(e) => setCategory1(e.target.value)} placeholder="women" />
        <TextField fullWidth label="Level 2 category" value={category2} onChange={(e) => setCategory2(e.target.value)} placeholder="women_saree" />
        <Autocomplete
          freeSolo
          fullWidth
          options={categories.map((c) => c.categoryId)}
          value={category3}
          onChange={(_, v) => setCategory3(v ?? "")}
          onInputChange={(_, v) => setCategory3(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Leaf category (required)"
              placeholder="laptops"
              helperText="Select a created category or type a new id — e.g. laptops"
            />
          )}
        />
      </div>

      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="font-display text-xl text-cream mb-1">Product images ({images.length})</h2>
        <p className="text-xs text-muted mb-4">Upload files or paste image URLs. First image is the cover.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            disabled={uploading}
            sx={{ borderColor: "rgba(var(--line))", color: "rgb(var(--gold-soft))" }}
          >
            {uploading ? <CircularProgress size={20} /> : "Upload images"}
            <input type="file" hidden multiple accept="image/*" onChange={(e) => handleFiles(e.target.files)} />
          </Button>
          <div className="flex flex-1 gap-2">
            <TextField
              fullWidth
              size="small"
              label="Paste image URL and add"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addImageUrl()}
            />
            <Button variant="contained" onClick={addImageUrl} startIcon={<AddLinkIcon />}>
              Add
            </Button>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
            {images.map((img, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-line">
                <img src={img} alt={`product-${i}`} className="h-24 w-full object-cover" />
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] tracking-widest text-gold-soft">
                    COVER
                  </span>
                )}
                <button
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 rounded-full bg-ink/70 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <CloseIcon sx={{ fontSize: 16, color: "#e8c96a" }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <Button variant="contained" size="large" onClick={handleSubmit} disabled={saving} sx={{ px: 5, py: 1.4 }}>
          {saving ? <CircularProgress size={24} /> : "Publish Product"}
        </Button>
      </div>

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

export default AddProduct;
