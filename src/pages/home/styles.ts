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

const BaseCountdownButton = styled.button`
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

   &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
   }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
   background: ${props => props.theme["green-500"]};
   
   &:not(:disabled):hover {
      background: ${props => props.theme["green-700"]};
   }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
   background: ${props => props.theme["red-500"]};
   
   &:not(:disabled):hover {
      background: ${props => props.theme["red-700"]};
   }
`