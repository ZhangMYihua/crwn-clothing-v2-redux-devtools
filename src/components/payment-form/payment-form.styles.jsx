import styled, { css } from 'styled-components'
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
    height 300px;
`;

export const FormContainer = styled.form`
    min-width: 500px;
    height: 100px;
`;

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;

    ${({ isLoading }) => isLoading && css`

      background-color: #ddd;

      &:hover {
        cursor: not-allowed;
      }
    `}
`;