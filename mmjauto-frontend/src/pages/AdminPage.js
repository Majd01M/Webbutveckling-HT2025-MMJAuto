import { useState, useEffect } from "react";
import {
  getCarParts,
  getCarModels,
  createCarPart,
  updateCarPart,
  deleteCarPart,
  createCarModel,
  updateCarModel,
  deleteCarModel,
} from "../services/api";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function AdminPage() {
  const [parts, setParts] = useState([]);
  const [models, setModels] = useState([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formType, setFormType] = useState(""); // "part" or "model"
  const [form, setForm] = useState({});

  const fetchData = async () => {
    setParts(await getCarParts());
    setModels(await getCarModels());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (type, item = null) => {
    setFormType(type);
    setEditItem(item);
    setForm(
      item || (type === "part"
        ? { name: "", category: "", price: "", stock: "", image: "" }
        : { brand: "", name: "", year: "", image: "" })
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (formType === "part") {
      editItem ? await updateCarPart(editItem._id, form) : await createCarPart(form);
    } else {
      editItem ? await updateCarModel(editItem._id, form) : await createCarModel(form);
    }
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (type, id) => {
    if (window.confirm("Are you sure?")) {
      type === "part" ? await deleteCarPart(id) : await deleteCarModel(id);
      fetchData();
    }
  };

  const cardImageStyle = { width: "100%", height: 120, objectFit: "cover", borderRadius: 4, marginTop: 6 };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        🔧 Admin Dashboard
      </Typography>

      {/* Car Parts */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Manage Car Parts</Typography>
      <Button variant="contained" color="success" sx={{ mb: 1 }} onClick={() => handleOpen("part")}>Add Part</Button>
      <Grid container spacing={1}>
        {parts.map((part) => (
          <Grid item xs={6} sm={4} md={3} key={part._id}>
            <Card sx={{ p: 1 }}>
              <CardContent sx={{ p: 1 }}>
                <Typography variant="subtitle2">{part.name}</Typography>
                <Typography variant="caption" display="block"> Category: {part.category}</Typography>
                <Typography variant="caption">Price: ${part.price}</Typography>
                {part.image && <img src={part.image} alt={part.name} style={cardImageStyle} />}
                <Button variant="outlined" color="primary" size="small" sx={{ mr: 0.5, mt: 1 }} onClick={() => handleOpen("part", part)}>Edit</Button>
                <Button variant="outlined" color="error" size="small" sx={{ mt: 1 }} onClick={() => handleDelete("part", part._id)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Car Models */}
      <Typography variant="subtitle1" sx={{ mt: 3 }}>Manage Car Models</Typography>
      <Button variant="contained" color="success" sx={{ mb: 1 }} onClick={() => handleOpen("model")}>Add Model</Button>
      <Grid container spacing={1}>
        {models.map((model) => (
          <Grid item xs={6} sm={4} md={3} key={model._id}>
            <Card sx={{ p: 1 }}>
              <CardContent sx={{ p: 1 }}>
                <Typography variant="subtitle2">{model.brand} {model.name}</Typography>
                <Typography variant="caption">Year: {model.year}</Typography>
                {model.image && <img src={model.image} alt={model.name} style={cardImageStyle} />}
                <Button variant="outlined" color="primary" size="small" sx={{ mr: 0.5, mt: 1 }} onClick={() => handleOpen("model", model)}>Edit</Button>
                <Button variant="outlined" color="error" size="small" sx={{ mt: 1 }} onClick={() => handleDelete("model", model._id)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>{editItem ? "Edit" : "Add"} {formType === "part" ? "Car Part" : "Car Model"}</DialogTitle>
        <DialogContent>
          {formType === "part" ? (
            <>
              <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth margin="dense" />
              <TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth margin="dense" />
              <TextField label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} fullWidth margin="dense" />
              <TextField label="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} fullWidth margin="dense" />
            </>
          ) : (
            <>
              <TextField label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} fullWidth margin="dense" />
              <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth margin="dense" />
              <TextField label="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} fullWidth margin="dense" />
            </>
          )}

          <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }} size="small">
            Upload Image
            <input type="file" hidden onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setForm({ ...form, image: reader.result });
                reader.readAsDataURL(file);
              }
            }} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} size="small">Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave} size="small">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}