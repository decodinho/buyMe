function Stars({ note }) {
  const n = Number(note) || 0; // Sécurité : transforme en nombre
  const totalStars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: 'inline-block', marginRight: '5px' }}>
      {totalStars.map((i) => (
        <span key={i} style={{ color: i <= n ? "#FFD700" : "#ccc" }}>
          ★
        </span>
      ))}
    </div>
  );
}


