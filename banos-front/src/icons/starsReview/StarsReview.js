import './starReview.css'
import { useState } from 'react'
import IconModel from '../../icons/IconModel'
import iconOptions from '../../icons/IconOptions';
export default function StarsReview(props) {
    const [starNumber, setStarNumber] = useState(1);

    function starHandle(starValue) {
        let starValueMin = 1;
        let starValueMax = 5;
        if (starValue > starValueMin && starValue < starValueMax) {
            props.handleStars(starValue);
        }
    }
    return (<>
        <div>
            <p className="clasificacion">
                <input id="radio1" type="radio" name="estrellas" value="5" onClick={(e) => starHandle(e.target.value)} />
                <label htmlFor="radio1">★</label>
                <input id="radio2" type="radio" name="estrellas" value="4" onClick={(e) => starHandle(e.target.value)} />
                <label htmlFor="radio2">★</label>
                <input id="radio3" type="radio" name="estrellas" value="3" onClick={(e) => starHandle(e.target.value)} />
                <label htmlFor="radio3">★</label>
                <input id="radio4" type="radio" name="estrellas" value="2" onClick={(e) => starHandle(e.target.value)} />
                <label htmlFor="radio4">★</label>
                <input id="radio5" type="radio" name="estrellas" value="1" onClick={(e) => starHandle(e.target.value)} />
                <label htmlFor="radio5">★</label>
            </p>
        </div>
    </>)
}