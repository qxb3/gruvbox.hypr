import { exec, interval } from 'astal'
import { GObject, property, register } from 'astal/gobject'

@register()
export default class Weather extends GObject.Object {
  declare private WEATHER_API_URL: string

  @property(Object) declare location: Location
  @property(Object) declare weather: WeatherData

  public get_location() {
    if (this.location)
      return this.location
  }

  public get_weather() {
    if (this.weather)
      return this.weather
  }

  private _get_location() {
    const locResponse: IpApiResponse = JSON.parse(exec('curl http://ip-api.com/json'))
    if (locResponse.status === 'fail')
      throw Error('Failed to fetch location')

    if (locResponse.status === 'success') {
      this.location = {
        country: locResponse.country,
        regionName: locResponse.regionName,
        city: locResponse.city,
        timezone: locResponse.timezone,
        latitude: locResponse.lat,
        longitude: locResponse.lon
      }
    }
  }

  private _get_weather() {
    const weatherResponse: WeatherApiResult = JSON.parse(
      exec(`curl https://api.open-meteo.com/v1/forecast?latitude=${this.location.latitude}&longitude=${this.location.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_80m&timeformat=unixtime&timezone=auto&forecast_days=1`)
    )

    this.weather = {
      current: {
        time: weatherResponse.current.time,
        temperature: weatherResponse.current.temperature_2m,
        humidity: weatherResponse.current.relative_humidity_2m,
        precipitation: weatherResponse.current.precipitation,
        weatherCode: weatherResponse.current.weather_code,
        windSpeed: weatherResponse.current.wind_speed_10m
      },
      hourly: weatherResponse.hourly.time.map((time, i) => ({
        time,
        temperature: weatherResponse.hourly.temperature_2m[i],
        humidity: weatherResponse.hourly.relative_humidity_2m[i],
        weatherCode: weatherResponse.hourly.weather_code[i],
        windSpeed: weatherResponse.hourly.wind_speed_80m[i]
      }))
    }
  }

  constructor() {
    super()

    this._get_location()
    this._get_weather()

    interval(600000, () => {
      this._get_location()
      this._get_weather()
    })
  }

  static get_default() {
    return new Weather()
  }
}

export type Location = {
  country: string
  regionName: string
  city: string
  timezone: string
  latitude: number
  longitude: number
}

type IpApiResponse = {
  status: 'success' | 'fail'
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export type WeatherData = {
  current: {
    time: number
    temperature: number
    humidity: number
    precipitation: number
    weatherCode: number
    windSpeed: number
  }
  hourly: {
    time: number
    temperature: number
    humidity: number
    weatherCode: number
    windSpeed: number
  }[]
}

type WeatherApiResult = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    precipitation: string
    weather_code: string
    wind_speed_10m: string
  }
  current: {
    time: number
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
  }
  hourly_units: {
    time: string
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    weather_code: string
    wind_speed_80m: string
  }
  hourly: {
    time: number[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    apparent_temperature: number[]
    weather_code: number[]
    wind_speed_80m: number[]
  }
}

export enum WeatherCode {
  CLEAR_SKY                 = 0,
  CLOUDY                    = 1  | 2 | 3,
  FOGGY                     = 45 | 48,
  DRIZZLE                   = 51 | 53 | 55,
  FREEZING_DRIZZLE          = 56 | 57,
  RAIN                      = 61 | 63 | 65,
  FREEZING_RAIN             = 66 | 67,
  SNOW                      = 71 | 73 | 75,
  SNOW_GRAINS               = 77,
  RAIN_SHOWERS              = 80 | 81 | 82,
  SNOW_SHOWERS              = 85 | 86,
  THUNDERSTORM              = 95,
  THUNDERSTORM_HEAVY_HAIL   = 96 | 99,
}
