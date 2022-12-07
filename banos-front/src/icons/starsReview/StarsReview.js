import './starReview.css'
import { useState } from 'react'
import IconModel from '../../icons/IconModel'
import iconOptions from '../../icons/IconOptions';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    // 0.5: 'Useless',
    1: 'Malo',
    // 1.5: 'Poor',
    2: 'Regular',
    // 2.5: 'Ok',
    3: 'Bueno',
    // 3.5: 'Good',
    4: 'Muy bueno',
    // 4.5: 'Excellent',
    5: 'Excelente',
  };
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
export default function StarsReview(props) {
    let value = props.value;

   
    const [hover, setHover] = useState(-1);
    return (<>
        <Rating 
            name="hover-feedback"
            value={value}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
                // setValue(newValue);
                props.handleStars(newValue);;
            }}
            onChangeActive={(event, newHover) => {
                setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      
    </>)
}