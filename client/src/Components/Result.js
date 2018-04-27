import React from "react";

import { 
	Card,
	CardBody,
	CardTitle,
	CardText,
	Button
} from 'reactstrap';

const Result = props => (
	<Card>
		<CardBody>
			<CardTitle><a href={props.url}>{props.headline}</a></CardTitle>
			<CardText><a href={props.url}>View Comments</a></CardText>
		</CardBody>
		<Button onClick={e => props.onClick(props.id, props.button, e)}>{props.button}</Button>
	</Card>
);

export default Result;
