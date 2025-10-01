import { useEffect, useState } from "react";
import { getCarModels } from "../services/api";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function CarModelsPage() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getCarModels();
      setModels(data);
      setLoading(false);
    };
    fetchModels();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Car Models
      </Typography>

      <Grid container spacing={3}>
        {models.map((model) => (
          <Grid item xs={12} sm={6} md={4} key={model._id}>
            <Card sx={{ boxShadow: 3 }}>
              {/* ✅ Display image */}
              {model.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={model.image}
                  alt={model.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{model.brand} {model.name}</Typography>
                <Typography color="text.secondary">Year: {model.year}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
