import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTint, FaWind, FaSyncAlt } from 'react-icons/fa'
import './WeatherWidget.css'

const DEFAULT_LOCATION = 'Chennai'
const WEATHER_API = `https://wttr.in/${DEFAULT_LOCATION}?format=j1`
const POLL_INTERVAL = 10 * 60 * 1000 // 10 minutes
const CLOCK_TICK = 1000 // 1 second

function formatDate(date) {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

export function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [now, setNow] = useState(new Date())
  const mountedRef = useRef(true)

  const fetchWeather = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)

    try {
      const response = await fetch(WEATHER_API)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      const current = data.current_condition[0]
      const area = data.nearest_area[0]

      setWeather({
        temp: current.temp_C,
        feels: current.FeelsLikeC,
        desc: current.weatherDesc[0].value,
        humidity: current.humidity,
        wind: current.windspeedKmph,
        windDir: current.winddir16Point,
        code: current.weatherCode,
        iconUrl: current.weatherIconUrl[0].value,
        location: `${area.areaName[0].value}, ${area.region[0].value}`,
      })
    } catch (err) {
      if (!silent) setError('Weather unavailable')
      // Keep last known weather if we have it
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    mountedRef.current = true
    fetchWeather()
    return () => { mountedRef.current = false }
  }, [fetchWeather])

  // Poll for weather updates
  useEffect(() => {
    const interval = setInterval(() => fetchWeather(true), POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchWeather])

  // Clock tick
  useEffect(() => {
    const tick = setInterval(() => {
      setNow(new Date())
    }, CLOCK_TICK)
    return () => clearInterval(tick)
  }, [])

  function handleRefresh() {
    fetchWeather()
  }

  function getWeatherEmoji(code) {
    const codeNum = Number(code)
    if (codeNum === 113) return '☀️'
    if (codeNum >= 116 && codeNum <= 119) return '⛅'
    if (codeNum >= 122 && codeNum <= 143) return '☁️'
    if (codeNum >= 176 && codeNum <= 200) return '🌧️'
    if (codeNum >= 227 && codeNum <= 230) return '🌨️'
    if (codeNum >= 248 && codeNum <= 260) return '🌫️'
    if (codeNum >= 263 && codeNum <= 266) return '🌦️'
    if (codeNum >= 281 && codeNum <= 284) return '🌧️'
    if (codeNum >= 293 && codeNum <= 302) return '🌧️'
    if (codeNum >= 305 && codeNum <= 314) return '🌧️'
    if (codeNum >= 317 && codeNum <= 350) return '🌧️'
    if (codeNum >= 353 && codeNum <= 365) return '🌧️'
    if (codeNum >= 368 && codeNum <= 377) return '🌨️'
    if (codeNum >= 386 && codeNum <= 392) return '⛈️'
    return '🌡️'
  }

  return (
    <motion.div
      className={`weather-widget ${loading && !weather ? 'weather-widget--loading' : ''}`}
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Date & Time */}
      <motion.div
        className="weather-datetime"
        key={now.getTime()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="weather-time">{formatTime(now)}</span>
        <span className="weather-date">{formatDate(now)}</span>
      </motion.div>

      <div className="weather-divider" />

      {/* Weather Info */}
      <AnimatePresence mode="wait">
        {error && !weather ? (
          <motion.span
            key="error"
            className="weather-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.span>
        ) : weather ? (
          <motion.div
            key={`${weather.temp}-${weather.desc}`}
            className="weather-info"
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="weather-icon"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 8 }}
            >
              <img src={weather.iconUrl} alt={weather.desc} />
            </motion.div>

            <div className="weather-temp-block">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span className="weather-temp">{weather.temp}°</span>
                <span className="weather-desc">{weather.desc}</span>
              </div>
              <div className="weather-details">
                <span className="weather-detail-item">
                  <FaTint /> {weather.humidity}%
                </span>
                <span className="weather-detail-item">
                  <FaWind /> {weather.wind} km/h
                </span>
                <span className="weather-detail-item">
                  {getWeatherEmoji(weather.code)} {weather.feels}°
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="weather-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
          >
            <span className="weather-temp">--°</span>
            <span className="weather-desc">Loading...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refresh button */}
      <motion.button
        className="weather-refresh-btn"
        type="button"
        onClick={handleRefresh}
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        aria-label="Refresh weather"
        title="Refresh weather"
      >
        <FaSyncAlt />
      </motion.button>
    </motion.div>
  )
}