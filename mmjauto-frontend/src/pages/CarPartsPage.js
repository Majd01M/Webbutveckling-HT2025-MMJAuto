const carParts = [
  { id: 1, name: "Air Filter", category: "Engine", price: 50 },
  { id: 2, name: "Brake Pads", category: "Brakes", price: 70 },
];

function CarPartsPage() {
  return (
    <div>
      <h1>Car Parts</h1>
      <ul>
        {carParts.map((part) => (
          <li key={part.id}>{part.name} - {part.category} - ${part.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default CarPartsPage;
