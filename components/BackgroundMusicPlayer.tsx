'use client'

import { Music2, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { assetPath } from '@/lib/asset-path'

const DEFAULT_VOLUME = 0.4
const COLLAPSE_DELAY = 4200
const tracks = [
  '/audio/funk-af-everet-almond.mp3',
  '/audio/ready-for-freddy-tracktribe.mp3',
  '/audio/hip-bone-quincas-moreira.mp3'
]

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const collapseTimerRef = useRef<number | null>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)

  const clearCollapseTimer = () => {
    if (!collapseTimerRef.current) return
    window.clearTimeout(collapseTimerRef.current)
    collapseTimerRef.current = null
  }

  const scheduleCollapse = () => {
    clearCollapseTimer()
    collapseTimerRef.current = window.setTimeout(() => setIsExpanded(false), COLLAPSE_DELAY)
  }

  const attemptPlay = async () => {
    const audio = audioRef.current
    if (!audio) return false

    try {
      await audio.play()
      setIsPlaying(true)
      setNeedsGesture(false)
      return true
    } catch {
      setIsPlaying(false)
      setNeedsGesture(true)
      return false
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = DEFAULT_VOLUME
    audio.muted = false
    attemptPlay()

    const unlockAudio = () => {
      attemptPlay().then((played) => {
        if (!played) return
        window.removeEventListener('pointerdown', unlockAudio)
        window.removeEventListener('keydown', unlockAudio)
        window.removeEventListener('scroll', unlockAudio)
      })
    }

    window.addEventListener('pointerdown', unlockAudio, { once: false })
    window.addEventListener('keydown', unlockAudio, { once: false })
    window.addEventListener('scroll', unlockAudio, { once: false, passive: true })

    return () => {
      clearCollapseTimer()
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('scroll', unlockAudio)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPlaying) return

    audio.load()
    audio.play().catch(() => setNeedsGesture(true))
  }, [trackIndex, isPlaying])

  if (!hasAudio) return null

  const expandPlayer = () => {
    setIsExpanded(true)
    scheduleCollapse()
  }

  const toggleExpanded = () => {
    setIsExpanded((current) => {
      const next = !current
      if (next) scheduleCollapse()
      else clearCollapseTimer()
      return next
    })
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    expandPlayer()

    if (audio.paused) {
      await attemptPlay()
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    expandPlayer()
    setIsMuted((current) => !current)
  }

  const playNextTrack = () => {
    setTrackIndex((current) => (current + 1) % tracks.length)
  }

  const onVolumeChange = (nextVolume: number) => {
    expandPlayer()
    setVolume(nextVolume)
    setIsMuted(nextVolume === 0)
  }

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <div
      className="fixed bottom-3 right-3 z-50 flex items-center justify-end sm:bottom-5 sm:right-5"
      onMouseEnter={clearCollapseTimer}
      onMouseLeave={() => {
        if (isExpanded) scheduleCollapse()
      }}
      onFocus={expandPlayer}
    >
      <audio
        ref={audioRef}
        src={assetPath(tracks[trackIndex])}
        autoPlay
        preload="auto"
        onCanPlay={() => setHasAudio(true)}
        onError={() => setHasAudio(false)}
        onEnded={playNextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        className={`flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/92 p-1.5 text-slate-900 shadow-[0_10px_28px_rgba(31,41,55,0.14)] backdrop-blur-md transition-all duration-200 ${
          isExpanded ? 'w-[188px]' : 'w-11'
        }`}
      >
        <button
          type="button"
          onClick={toggleExpanded}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-500 text-white shadow-[0_7px_16px_rgba(249,115,22,0.24)] transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          aria-label={isExpanded ? 'ย่อแผงเพลง' : 'เปิดแผงเพลง'}
          title={isExpanded ? 'ย่อแผงเพลง' : needsGesture ? 'เปิดเพลง' : 'เพลงพื้นหลัง'}
        >
          <Music2 className="h-4 w-4" />
        </button>

        <div
          className={`flex items-center gap-1.5 overflow-hidden transition-all duration-200 ${
            isExpanded ? 'w-[136px] opacity-100' : 'w-0 opacity-0'
          }`}
          aria-hidden={!isExpanded}
        >
          <button
            type="button"
            onClick={togglePlay}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-orange-100 bg-orange-50 text-orange-600 transition hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200"
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            title={isPlaying ? 'หยุดเพลง' : 'เล่นเพลง'}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-orange-600" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-stone-200 bg-white text-slate-700 transition hover:border-orange-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
            aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
            title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
          >
            <VolumeIcon className="h-3.5 w-3.5" />
          </button>

          <label className="flex w-16 shrink-0 items-center" title="ปรับระดับเสียงเพลง">
            <span className="sr-only">ระดับเสียงเพลง</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(event) => onVolumeChange(Number(event.target.value))}
              className="h-1.5 w-16 cursor-pointer accent-orange-500"
              aria-label="ปรับระดับเสียงเพลง"
              tabIndex={isExpanded ? 0 : -1}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
