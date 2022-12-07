import IconModel from './../icons/IconModel'
import iconOptions from './../icons/IconOptions';

function averageRange(array) {
    if (Array.isArray(array)) {
      let sum = array.reduce((acc, next) => acc += next, 0);
      return sum / array.length
    }
  }

 function calification(array) {
    const iconFullStarOptions = iconOptions.iconStarFull;

    const iconEmptyStarOptions = iconOptions.iconStarEmpty;
    let starsQuantity = averageRange(array);

    let stars = [];
    let fullStar = <IconModel options={iconFullStarOptions} />;
    let emptyStar = <IconModel options={iconEmptyStarOptions} />
    for (let i = 0; i < starsQuantity; i++) {
        stars.push(fullStar);
    }
    for (let i = stars.length; i < 5; i++) {
        stars.push(emptyStar)
    }
    return stars;
}
function calculateYesNo(array) {
    if (Array.isArray(array)) {
      let sum = array.reduce((acc, next) => (next === true) ? acc += 1 : 0, 0);
      if (sum > (array.length * 0.6)) {
        return true
      }
      return false
    }
  }
export {
    calification,
    calculateYesNo,
    averageRange
}