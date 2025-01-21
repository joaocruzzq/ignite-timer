import { Play } from "phosphor-react";

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
   return (
      <HomeContainer>
         <form action="">
            <FormContainer>
               <label htmlFor="task">Vou trabalhar em</label>
               <TaskInput type="text" list="task-suggestions" id="task" placeholder="Dê um nome para o seu projeto" />

               <datalist id="task-suggestions">
                  <option value="Projeto Ignite Timer" />
               </datalist>

               <label htmlFor="minutesAmount">durante</label>
               <MinutesAmountInput
                  type="number"
                  id="minutesAmount"
                  placeholder="00"
                  step={5}
                  min={5}
                  max={90}
               />

               <span>minutos.</span>
            </FormContainer>

            <CountdownContainer>
               <span>0</span>
               <span>0</span>
               <Separator>:</Separator>
               <span>0</span>
               <span>0</span>
            </CountdownContainer>

            <StartCountdownButton type="submit" disabled >
               <Play size={24} />
               Começar
            </StartCountdownButton>
         </form>
      </HomeContainer>
   )
}