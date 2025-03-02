import React from "react";

export default function Members({ members }) {
  return (
    <div>
      {members.map((member) => (
        <div key={member.bioguideId}>
          <h3>{member.name}</h3>
          <p>ID: {member.bioguideId}</p>
          <p>District: {member.district}</p>
        </div>
      ))}
    </div>
  );
}
