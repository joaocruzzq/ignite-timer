import { Play } from "phosphor-react";

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

import { useState } from "react";
import { useForm } from "react-hook-form"

import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Insforme a tarefa.'),
   minutesAmount: zod.number()
   .min(5, 'O ciclo precisa ser de no mínimo 05 minutos.')
   .max(60, 'O intervalo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
   id: string
   task: string
   minutesAmount: number
}

export function Home() {
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

   const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0
      }
   })

   function handleCreateNewCycle(data: NewCycleFormData) {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount
      }

      setCycles((state) =>[...state, newCycle])
      setActiveCycleId(newCycle.id)
      
      reset()
   }

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

   console.log(activeCycle)

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
                  max={60}
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