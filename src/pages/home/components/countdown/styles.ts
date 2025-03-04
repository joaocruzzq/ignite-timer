import styled from "styled-components";

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

   @media(max-width: 768px) {
      display: grid;
      
      grid-template-areas:
      'span span' 'span span';

      width: 100%;

      span {
         display: flex;

         font-size: 12rem;
         padding: 2rem 0 3rem;

         align-items: center;
         justify-content: center;
      }
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

   @media(max-width: 768px) {
      display: none;
   }
`