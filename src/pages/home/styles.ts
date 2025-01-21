import styled from "styled-components";

export const HomeContainer = styled.main`
   display: flex;
   flex-direction: column;

   flex: 1;

   align-items: center;
   justify-content: center;

   form {
      display: flex;
      flex-direction: column;

      gap: 3.5rem;
      align-items: center;
   }
`

export const FormContainer = styled.div`
   width: 100%;
   display: flex;

   align-items: center;
   justify-content: center;

   gap: 0.5rem;
   color: ${props => props.theme["gray-100"]};

   flex-wrap: wrap;
   font-weight: bold;
   font-size: 1.125rem;
`

const BaseInput = styled.input`
   height: 2.5rem;
   padding: 0 0.5rem;

   border: 0;
   border-bottom: 2px solid ${props => props.theme["gray-500"]};

   font-weight: bold;
   font-size: 1.125rem;

   background: transparent;
   color: ${props => props.theme["gray-100"]};

   &:focus {
      box-shadow: none;
      border-color: ${props => props.theme["green-500"]};
   }

   &::placeholder {
      text-align: center;
      color: ${props => props.theme["gray-500"]};
   }
`

export const TaskInput = styled(BaseInput)`
   flex: 1;

   &::-webkit-calendar-picker-indicator {
      display: none !important;
   }
`

export const MinutesAmountInput = styled(BaseInput)`
   width: 4rem;
`

export const CountdownContainer = styled.div`
   display: flex;
   gap: 1rem;

   font-size: 10rem;
   line-height: 8rem;

   font-family: 'Roboto Mono', monospace;
   color: ${props => props.theme["gray-100"]};
   
   span {
      background: ${props => props.theme["gray-700"]};

      padding: 2rem 1rem;
      border-radius: 8px;
      font-weight: bold;
   }
`

export const Separator = styled.div`
   display: flex;
   padding: 2rem 0;

   width: 4rem;
   overflow: hidden;

   font-weight: bold;

   justify-content: center;

   color: ${props => props.theme["green-500"]};
`

export const StartCountdownButton = styled.button`
   width: 100%;

   gap: 0.5rem;
   padding: 1rem;
   
   border: 0;
   border-radius: 8px;

   display: flex;

   align-items: center;
   justify-content: center;

   cursor: pointer;
   font-weight: bold;

   color: ${props => props.theme["gray-100"]};
   background: ${props => props.theme["green-500"]};

   &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
   }
   
   &:not(:disabled):hover {
      background: ${props => props.theme["green-700"]};
   }
`