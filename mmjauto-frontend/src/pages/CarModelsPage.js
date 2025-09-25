const carModels = [
  { id: 1, name: "X5", brand: "BMW", year: 2022 },
  { id: 2, name: "A4", brand: "Audi", year: 2021 },
];

function CarModelsPage() {
  return (
    <div>
      <h1>Car Models</h1>
      <ul>
        {carModels.map((model) => (
          <li key={model.id}>{model.brand} {model.name} ({model.year})</li>
        ))}
      </ul>
    </div>
  );
}

export default CarModelsPage;
