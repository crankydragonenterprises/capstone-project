import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer } from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemFromCart  } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;