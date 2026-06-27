'use client'

import { Music2, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { assetPath } from '@/lib/asset-path'

const DEFAULT_VOLUME = 0.4
const COLLAPSE_DELAY = 4200
const STORAGE_KEY = 'dew-background-music'
const tracks = [
  '/audio/funk-af-everet-almond.mp3',
  '/audio/ready-for-freddy-tracktribe.mp3',
  '/audio/hip-bone-quincas-moreira.mp3'
]

type StoredMusicState = {
  trackIndex: number
  currentTime: number
  volume: number
  muted: boolean
  userPaused: boolean
}

const randomTrackIndex = () => Math.floor(Math.random() * tracks.length)

const getNextRandomTrackIndex = (current: number) => {
  if (tracks.length <= 1) return 0
  let next = randomTrackIndex()
  while (next === current) next = randomTrackIndex()
  return next
}

const readStoredState = (): StoredMusicState | null => {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredMusicState) : null
  } catch {
    return null
  }
}

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const collapseTimerRef = useRef<number | null>(null)
  const userPausedRef = useRef(false)
  const restoredTimeRef = useRef(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)

  const saveState = (overrides: Partial<StoredMusicState> = {}) => {
    const audio = audioRef.current
    const nextState: StoredMusicState = {
      trackIndex,
      currentTime: audio?.currentTime ?? 0,
      volume,
      muted: isMuted,
      userPaused: userPausedRef.current,
      ...overrides
    }

    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
    } catch {
      // Ignore storage failures; controls should still work normally.
    }
  }

  const clearCollapseTimer = () => {
    if (!collapseTimerRef.current) return
    window.clearTimeout(collapseTimerRef.current)
    collapseTimerRef.current = null
  }

  const scheduleCollapse = () => {
    clearCollapseTimer()
    collapseTimerRef.current = window.setTimeout(() => setIsExpanded(false), COLLAPSE_DELAY)
  }

  const attemptPlay = async ({ userInitiated = false } = {}) => {
    const audio = audioRef.current
    if (!audio) return false
    if (userPausedRef.current && !userInitiated) return false

    try {
      await audio.play()
      userPausedRef.current = false
      setIsPlaying(true)
      setNeedsGesture(false)
      saveState({ userPaused: false, currentTime: audio.currentTime })
      return true
    } catch {
      setIsPlaying(false)
      setNeedsGesture(true)
      return false
    }
  }

  useEffect(() => {
    const stored = readStoredState()
    const initialTrackIndex = stored?.trackIndex != null ? stored.trackIndex : randomTrackIndex()
    const safeTrackIndex = initialTrackIndex >= 0 && initialTrackIndex < tracks.length ? initialTrackIndex : randomTrackIndex()

    setTrackIndex(safeTrackIndex)
    setVolume(stored?.volume ?? DEFAULT_VOLUME)
    setIsMuted(stored?.muted ?? false)
    userPausedRef.current = false
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    audio.volume = volume
    audio.muted = isMuted

    if (!userPausedRef.current) {
      attemptPlay()
    }

    const unlockAudio = () => {
      attemptPlay().then((played) => {
        if (!played) return
        window.removeEventListener('pointerdown', unlockAudio)
        window.removeEventListener('keydown', unlockAudio)
        window.removeEventListener('scroll', unlockAudio)
      })
    }

    window.addEventListener('pointerdown', unlockAudio, { once: false })
    window.addEventListener('mousemove', unlockAudio, { once: false, passive: true })
    window.addEventListener('wheel', unlockAudio, { once: false, passive: true })
    window.addEventListener('touchstart', unlockAudio, { once: false, passive: true })
    window.addEventListener('keydown', unlockAudio, { once: false })
    window.addEventListener('scroll', unlockAudio, { once: false, passive: true })

    return () => {
      clearCollapseTimer()
      saveState()
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('mousemove', unlockAudio)
      window.removeEventListener('wheel', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
      window.removeEventListener('scroll', unlockAudio)
    }
  }, [trackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    saveState({ volume })
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = isMuted
    saveState({ muted: isMuted })
  }, [isMuted])

  useEffect(() => {
    const timer = window.setInterval(() => saveState(), 1200)
    return () => window.clearInterval(timer)
  })

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
      await attemptPlay({ userInitiated: true })
    } else {
      userPausedRef.current = true
      audio.pause()
      setIsPlaying(false)
      saveState({ userPaused: true, currentTime: audio.currentTime })
    }
  }

  const toggleMute = () => {
    expandPlayer()
    setIsMuted((current) => !current)
  }

  const playNextTrack = () => {
    const nextTrackIndex = getNextRandomTrackIndex(trackIndex)
    restoredTimeRef.current = false
    setTrackIndex(nextTrackIndex)
    saveState({ trackIndex: nextTrackIndex, currentTime: 0, userPaused: false })
  }

  const onVolumeChange = (nextVolume: number) => {
    expandPlayer()
    setVolume(nextVolume)
    setIsMuted(nextVolume === 0)
  }

  const restoreTime = () => {
    if (restoredTimeRef.current) return
    const audio = audioRef.current
    const stored = readStoredState()
    if (!audio || !stored || stored.trackIndex !== trackIndex || !stored.currentTime) return

    audio.currentTime = Math.max(0, stored.currentTime - 0.4)
    restoredTimeRef.current = true
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
        onLoadedMetadata={restoreTime}
        onCanPlay={() => setHasAudio(true)}
        onError={() => setHasAudio(false)}
        onEnded={playNextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        className={`flex items-center gap-1.5 rounded-full border border-border bg-surface/92 p-1.5 text-text shadow-soft backdrop-blur-md transition-all duration-200 ${
          isExpanded ? 'w-[188px]' : 'w-11'
        }`}
      >
        <button
          type="button"
          onClick={toggleExpanded}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-orange/30 bg-surface text-text shadow-soft transition hover:bg-orange/10 focus:outline-none focus:ring-2 focus:ring-orange/30"
          aria-label={isExpanded ? 'ย่อแผงเพลง' : 'เปิดแผงเพลง'}
          title={isExpanded ? 'ย่อแผงเพลง' : needsGesture ? 'เปิดเพลง' : 'เพลงพื้นหลัง'}
        >
          <Music2 className="h-4 w-4 stroke-[2.4]" />
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
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-orange/20 bg-orange/10 text-orange transition hover:bg-orange/15 focus:outline-none focus:ring-2 focus:ring-orange/25"
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            title={isPlaying ? 'หยุดเพลง' : 'เล่นเพลง'}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-surface text-muted transition hover:border-orange/30 hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange/25"
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
              className="h-1.5 w-16 cursor-pointer accent-[var(--orange)]"
              aria-label="ปรับระดับเสียงเพลง"
              tabIndex={isExpanded ? 0 : -1}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
