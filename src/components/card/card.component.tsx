import './card.styles.css';
import { Monster } from '../../App';

type CardPros = {
    monster: Monster
}

const Card = ({ monster}: CardPros) => {
    const { id, name, email } = monster;
    return (
    <div className='card-container' key={id}>
        <img
            alt={`monster ${name}`}
            src={`https://robohash.org/${id}?set=set2&size=180x180`} />
        <h2>{name}</h2>
        <p>{email}</p>
    </div>)

}

export default Card;