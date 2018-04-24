import React from "react";
import HitResultComponent from "./HitResultComponent";

function Results(props) {
  const {hits} = props;

  return (
    <div style={{marginTop: "10px"}}>
      {
        hits.map(hit => <HitResultComponent key={hit.objectID} hit={hit}/>)
      }
    </div>
  );
}

export default Results;
