import styled from 'styled-components'

export const LayoutContainer = styled.div`
   max-width: 74rem;
   height: calc(100vh - 10rem);

   padding: 2.5rem;
   margin: 5rem auto;

   border-radius: 8px;
   background: ${props => props.theme['gray-800']};

   display: flex;
   flex-direction: column;

   @media(max-width: 768px) {
      max-width: 85dvw;
   }
`