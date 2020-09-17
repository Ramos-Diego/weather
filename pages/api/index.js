// Weather proxy API to avoid exposing my API key

const apiKey = process.env.WEATHER_KEY

export default async (req, res) => {
  const {
    query: { city },
  } = req
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then(
      ({
        cod,
        name,
        main: { temp },
        sys: { country },
        weather,
      }) => {
        if (cod !== '404') {
          res.status(200).json({
            city: name,
            country,
            description: weather[0].description,
            temperature: Math.floor(temp - 273.15),
            success: true
          })
        } else {
          res.status(404).json({ success: false })
        }
      }
    )
    .catch((err) => console.log(err))
}

// externalResolver is an explicit flag that tells the server that this route is being handled by an external resolver like express or connect. Enabling this option disables warnings for unresolved requests.
export const config = {
  api: {
    externalResolver: true,
  },
}
