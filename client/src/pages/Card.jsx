import { useAuth } from "../store/auth";

export const ProductCard = () => {
  const { cards } = useAuth();
  console.log(cards);

  return (
    <section className="section-cards">
      <div className="container">
        <h1 className="main-heading">Glasses Cards</h1>
      </div>

      <div className="container grid grid-three-cols">
        {cards && cards.length > 0 ? (
          cards.map((curElem, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src="/images/shades.jpg" alt="designer" width="200" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>Stock:{curElem.Stock}</p>
                    <p>Rs{curElem.Market_Price}</p>
                  </div>
                  <h2>{curElem.Name}</h2>
                  <p>Pieces Sold:{curElem.Pieces_sold}</p>
                  <p>Color:{curElem.Color}</p>
                  <p>Feature:{curElem.Feature}</p>
                  <p>Material:{curElem.Material}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </section>
  );
};
