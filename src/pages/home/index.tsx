import { Play } from "phosphor-react";

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

import { useForm } from "react-hook-form"

export function Home() {
   const { register, handleSubmit, watch } = useForm()

   function handleCreateNewCycle(data: any) {
      console.log(data)
   }

   const task = watch('task')

   const isSubmitDisabled = !task

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            <FormContainer>
               <label htmlFor="task">Vou trabalhar em</label>
               <TaskInput
                  id="task"
                  type="text"
                  list="task-suggestions"
                  placeholder="Dê um nome para o seu projeto"
                  {...register('task')}
               />

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
                  {...register('minutesAmount', {valueAsNumber: true})}
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

            <StartCountdownButton type="submit" disabled={isSubmitDisabled} >
               <Play size={24} />
               Começar
            </StartCountdownButton>
         </form>
      </HomeContainer>
   )
}