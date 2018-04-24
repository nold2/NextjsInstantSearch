import React, {Component} from "react";
import {
  Card, CardBody,
  CardTitle, Row, Col
} from "reactstrap";
import {Highlight} from "react-instantsearch/dom";
import Link from "next/link";
import StarRatingComponent from "react-star-rating-component";


export default class HitResultComponent extends Component {
  render() {
    const {hit} = this.props;
    const {slug, ratingValue, totalReviews} = hit;
    const slugAdress = `/vendors/${slug}`;
    return (
      <Card>
        <Link href={`${slugAdress}`}>
          <CardBody>
            <CardTitle><Highlight attribute="name" hit={hit}/></CardTitle>
            <Row>
              <Col>
                <StarRatingComponent name="small-rating" starCount={5} value={ratingValue} editing={false}/>
              </Col>
              <Col>
                {totalReviews} Reviews
              </Col>
            </Row>
          </CardBody>
        </Link>
      </Card>
    );
  }
}
