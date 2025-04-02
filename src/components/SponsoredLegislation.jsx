import React from "react";
import "./SponsoredLegislation.css";
export default function SponsoredLegislation({ sponsored, onSelectedBill }) {
  return (
    <div>
      <h3>sponsored</h3>
      {sponsored.map((sponsoredBill) => (
        <div className="bills">
          <h2 key={sponsoredBill.type}>{sponsoredBill.type}</h2>
          <h3 key={sponsoredBill.number}>{sponsoredBill.number}</h3>
          <button
            onClick={() =>
              onSelectedBill(sponsoredBill.type, sponsoredBill.number)
            }
          >
            get answers
          </button>
        </div>
      ))}
    </div>
  );
}
