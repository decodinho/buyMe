function stars({ note }) {
  // On s'assure que la note est un nombre, sinon 0
  const n = Number(note) || 0;
  
  return (
    <div className="rating-display">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span 
          key={starIndex} 
          style={{ color: starIndex <= n ? "#FFD700" : "#ccc", fontSize: "1.2rem" }}
        >
          ★
        </span>
      ))}
      <span className="note-text">({n}/5)</span>
    </div>
  );
}

