import React from 'react'
import { StyledButton } from './Button.Styled';

const ButtonComponent = ({btnText,}) => {

    const handleClick = () => {

    }
    return (
        <StyledButton className='add-btn' onClick={handleClick}>{btnText}</StyledButton>
    )
}

export default ButtonComponent;
