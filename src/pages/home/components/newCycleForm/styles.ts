import styled from "styled-components"

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

   @media(max-width: 768px) {
      display: grid;

      grid-template-areas:
      'label taskinput taskinput'
      'label minutesinput span';

      grid-template-columns: auto 1fr auto;

      label {
         white-space: nowrap;
      }
   }
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

   @media(max-width: 768px) {
      grid-area: taskinput;
   }
`

export const MinutesAmountInput = styled(BaseInput)`
   width: 4rem;

   @media(max-width: 768px) {
      grid-area: minutesinput;
   }
`