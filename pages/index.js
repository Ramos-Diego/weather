import Head from 'next/head'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { handleSubmit, register, errors } = useForm()
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState(0)


const apiKey = process.env.WEATHER_KEY
console.log(apiKey)

  const getWeather = async () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then(({ name, main }) => {
        setCity(name)
        setTemperature(main.temp - 273.15)
      })
      .catch((err) => console.log(err))
  }

  const onSubmit = values => console.log(values)

  return (
    <>
      <Head>
        <title>Weather</title>
      </Head>

      <div>
        <p>City: {city}</p>
        <div>Temperature: {temperature}C</div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
        name="city"
        ref={register({required: true})}
        />
        <button>Submit</button>
        </form>
        <button onClick={() => getWeather()}>Weather</button>
      </div>
    </>
  )
}
