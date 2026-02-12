// On ajoute 'className' dans les arguments
function Stars({ note, className }) {
  const n = Number(note) || 0;
  const etoiles = [1, 2, 3, 4, 5];

  return (
    /* On combine la classe interne et la classe reçue */
    <div className={`stars-container ${className}`}>
      {etoiles.map((i) => (
        <span key={i} className={i <= n ? "star-active" : "star-inactive"}>
          ★
        </span>
      ))}
      <span className="note-number">{n}</span>
    </div>
  );
}
