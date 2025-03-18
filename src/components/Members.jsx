import React from "react";

export default function Members({ members, onSelectedMember }) {
  return (
    <div>
      {members.map((member) => (
        <div key={member.bioguideId}>
          <h3>{member.name}</h3>
          <p>ID: {member.bioguideId}</p>
          <p>District: {member.district}</p>
          <button onClick={() => onSelectedMember(member.bioguideId)}>
            get legislation
          </button>
        </div>
      ))}
    </div>
  );
}
