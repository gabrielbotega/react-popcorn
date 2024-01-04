export function DetailsInfoSection({ plot, actors, director }) {
  return (
    <>
      <p>
        <em>{plot}</em>
      </p>
      <p>Starring {actors}</p>
      <p>Directed by {director}</p>
    </>
  );
}
