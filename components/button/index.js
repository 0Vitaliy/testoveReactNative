import React from 'react';

import styled from "styled-components/native";


export const Button = ({children, color, onPress}) => {
    return (
        <ButtonWrapper onPress={onPress} color={color}>
            <TextBtn>{children}</TextBtn>
        </ButtonWrapper>
    );
}

Button.defaultProps = {
    color: '#272727'
}

const TextBtn = styled.Text` 
   flex;1;
   text-align:center;
   color:#FFF; 
   font:700 16px/53px  sans-serif; 
`;

const ButtonWrapper = styled.TouchableOpacity`
   margin-top:10px;
   flex;1;
   height:53px;  
   background:${props => props.color}; 
`;
