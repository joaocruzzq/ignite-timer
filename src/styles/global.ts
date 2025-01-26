import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }


   :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${props => props.theme["green-500"]};
   }

   body {
      -webkit-font-smoothing: antialiased;
      
      color: ${props => props.theme["gray-300"]};
      background: ${props => props.theme["gray-900"]};
   }

   body, input, textarea, button {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1rem;
   }

   @media(max-width: 768px) {
      html {
         font-size: 84.5%;
      }
   }

   @media(min-width: 769px) {
      ::-webkit-scrollbar {
         width: 12px;
      }
      
      ::-webkit-scrollbar-thumb {
         border-radius: 10px;
         background-color: ${props => props.theme["gray-900"]};
      }
   }
`