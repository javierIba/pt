import { Card } from 'react-bootstrap';

export default function DisplayInformationCard(props){


    return (
        <Card bg='info' border="secondary">
            <h5 className='text-center'>{props.title}</h5>
            <h5 className='text-center'>{props.content}</h5>
        </Card>
    )

}