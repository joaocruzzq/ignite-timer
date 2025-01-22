import { HandPalm, Play } from "phosphor-react";

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";

import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { differenceInSeconds } from "date-fns"

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
   startDate: Date
   interruptedDate?: Date
   finishedDate?: Date
}

export function Home() {
   const [cycles, setCycles] = useState<Cycle[]>([])
   const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

   const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0
      }
   })

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

   useEffect(() => {
      let interval: number

      if (activeCycle) {
         interval = setInterval(() => {
            const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

            if (secondsDifference >= totalSeconds) {
               setCycles(state => state.map(cycle => {
                  if (cycle.id === activeCycleId) {
                     return {...cycle, finishedDate: new Date()}
                  }
         
                  else {
                     return cycle
                  }
               }))

               setAmountSecondsPassed(totalSeconds)

               clearInterval(interval)
            }

            else {
               setAmountSecondsPassed(secondsDifference)
            }
         }, 1000)
      }

      return () => {
         clearInterval(interval)
      }
   }, [activeCycle, totalSeconds, activeCycleId])

   function handleCreateNewCycle(data: NewCycleFormData) {
      const newCycle: Cycle = {
         id: String(new Date().getTime()),
         task: data.task,
         minutesAmount: data.minutesAmount,
         startDate: new Date()
      }

      setCycles((state) =>[...state, newCycle])
      setActiveCycleId(newCycle.id)
      setAmountSecondsPassed(0)
      
      reset()
   }

   function handleInterruptCycle() {
      setCycles(state => state.map(cycle => {
         if (cycle.id === activeCycleId) {
            return {...cycle, interruptedDate: new Date()}
         }

         else {
            return cycle
         }
      }))

      setActiveCycleId(null)
   }

   const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

   const minutesAmount = Math.floor(currentSeconds / 60)
   const secondsAmount = currentSeconds % 60

   const minutes = String(minutesAmount).padStart(2, '0')
   const seconds = String(secondsAmount).padStart(2, '0')

   useEffect(() => {
      if (activeCycle) {
         document.title = `Ignite Timer • ${minutes}:${seconds}`
      }
   }, [minutes, seconds, activeCycle])

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
                  disabled={!!activeCycle}
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
                  disabled={!!activeCycle}
                  step={5}
                  min={5}
                  max={60}
                  {...register('minutesAmount', {valueAsNumber: true})}
               />

               <span>minutos.</span>
            </FormContainer>

            <CountdownContainer>
               <span>{minutes[0]}</span>
               <span>{minutes[1]}</span>
               <Separator>:</Separator>
               <span>{seconds[0]}</span>
               <span>{seconds[1]}</span>
            </CountdownContainer>

            {
               activeCycle ? (
                  <StopCountdownButton type="button" onClick={handleInterruptCycle} >
                     <HandPalm size={24} />
                     Interromper
                  </StopCountdownButton>
               ) : (
                  <StartCountdownButton type="submit" disabled={isSubmitDisabled} >
                     <Play size={24} />
                     Começar
                  </StartCountdownButton>
               )
            }
         </form>
      </HomeContainer>
   )
}