export type ApiResponse = {
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

export const fetchNasaData = async (setApiResults: any) => {
  const count = 10
  const apiKey = import.meta.env.VITE_NASA_API_KEY
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    setApiResults(data)
  } catch (error) {
    console.log(error)
  }
}
