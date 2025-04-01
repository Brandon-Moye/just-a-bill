import React from "react";

export default function SponsoredLegislation({ sponsored }) {
  return (
    <div>
      <h3>sponsored</h3>
      {sponsored.map((sponsoredBill) => (
        <h3 key={sponsoredBill.number}>{sponsoredBill.title}</h3>
      ))}
    </div>
  );
}
