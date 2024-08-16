import React from "react";

function Room({ params }: { params: { room: string } }) {
  return <div>Room {params.room}</div>;
}

export default Room;
