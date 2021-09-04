import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const Cardc = ({ name, model, starcl, hydrat, pass, manf }) => {
  return (
    <Card className="cardc">
      <CardBody>
        <CardTitle tag="h6" className="title">
          {name}
        </CardTitle>
        <CardSubtitle tag="h5" className="mb-2 text-muted">
          {model}
        </CardSubtitle>
        <CardText>{starcl}</CardText>
        <CardText>{hydrat}</CardText>
        <CardText>{pass}</CardText>
        <CardText>{manf}</CardText>
      </CardBody>
    </Card>
  );
};

export default Cardc;
