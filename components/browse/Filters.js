import React from "react";
import {
  Card, CardTitle, CardBody,
} from "reactstrap";


function Filters(props) {
  const {items, refine, field} = props;
  const sortedItems = items.sort((i1, i2) => i1.label.localeCompare(i2.label));
  const facetLabel = sortedItems.map(item => {
    const selectedClassName = item.isRefined;
    const itemClassName = `ais-refinement-list--item ${selectedClassName}`;
    return (
      <main className={itemClassName} key={item.label} style={{marginTop: 10}}>
        <section
          className="ais-refinement-list--label"
          style={{marginLeft: 10}}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          <input
            type="checkbox"
            className="ais-refinement-list--checkbox"
            checked={item.isRefined}
          />
          <label style={{marginLeft: 5}}>
            {item.label}
          </label>
        </section>
      </main>
    );
  });

  return (
    <Card style={{borderLeft: 0, borderRight:0, borderRadius: 0}}>
      <CardBody className="aisdemo-filter" style={{marginBottom: 20, marginTop: 20}}>
        <CardTitle className="aisdemo-filter-title" style={{marginLeft: 10}}>{field}</CardTitle>
        {facetLabel}
      </CardBody>
    </Card>
  );
}

export default Filters;


