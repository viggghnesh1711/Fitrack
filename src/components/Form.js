"use client"
import { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function FitnessForm() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [fitnessGoal, setFitnessGoal] = useState('')

  const handleHeightChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setHeight(value)
    }
  }

  const handleWeightChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setWeight(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()  // Prevent default form submission
    const response = await fetch('/api/updateuserdetails',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify( {height, weight, fitnessGoal})
    })
    console.log('Form submitted:')
  }

  useEffect(()=>{
    const fetchdata = async()=>{
        const response = await fetch('/api/username');
        if(response.ok){
            const data = await response.json()
            setHeight(data.height)
            setWeight(data.weight)
            console.log(data.goal)
            setFitnessGoal(data.goal)
        } 
    }
    fetchdata()
  },[])

  return (
    <Card className="w-full max-w-md mx-auto mt-10 bg-stone-800 border-none">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-stone-400">Height (cm)</Label>
            <Input
              id="height"
              type="text"
              value={height}
              onChange={handleHeightChange}  // Event handler fixed
              placeholder="Enter your height"
                className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight " className="text-stone-400">Weight (kg)</Label>
            <Input
              id="weight"
              type="text"
              value={weight}
              onChange={handleWeightChange}  // Event handler fixed
              placeholder="Enter your weight"
                className="w-full px-4 py-3 rounded-lg bg-stone-700 text-stone-100 border border-stone-600 focus:ring-2 focus:ring-stone-500 focus:outline-none placeholder-stone-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fitness-goal" className="text-stone-400">Fitness Goal</Label>
            <Select onValueChange={setFitnessGoal} defaultValue={fitnessGoal} className='border-none'>
              <SelectTrigger id="fitness-goal" className='border-none bg-stone-700'>
                <SelectValue placeholder="Select your fitness goal"  className='border-none'/>
              </SelectTrigger>
              <SelectContent className='border-none bg-stone-700'>
                <SelectItem value="Gain weigh">Gain Weight</SelectItem>
                <SelectItem value="Lose weight">Lose Weight</SelectItem>
                <SelectItem value="Maintain weight">Maintain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-stone-400 text-stone-900"

          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
