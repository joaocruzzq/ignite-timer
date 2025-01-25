import { HandPalm, Play } from "phosphor-react";

import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";

import { Countdown } from "./components/countdown";
import { NewCycleForm } from "./components/newCycleForm";

import { FormProvider, useForm } from "react-hook-form"

import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useContext } from "react";
import { CyclesContext } from "../../contexts/cyclesContext";

const newCycleFormValidationSchema = zod.object({
   task: zod.string().min(1, 'Insforme a tarefa.'),
   minutesAmount: zod.number()
   .min(5, 'O ciclo precisa ser de no mínimo 05 minutos.')
   .max(60, 'O intervalo precisa ser de no máximo 60 minutos.')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
   const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

   const newCycleForm = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
         task: '',
         minutesAmount: 0
      }
   })

   const { handleSubmit, watch, /* reset */ } = newCycleForm

   const task = watch('task')

   const isSubmitDisabled = !task

   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(createNewCycle)} action="">
            <FormProvider {...newCycleForm}>
               <NewCycleForm />
            </FormProvider>

            <Countdown />

            {
               activeCycle ? (
                  <StopCountdownButton type="button" onClick={interruptCurrentCycle} >
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