'use client'

import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { assetPath } from '@/lib/asset-path'

const DEFAULT_VOLUME = 0.4

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = DEFAULT_VOLUME
    audio.muted = false

    const tryPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        setNeedsGesture(false)
      } catch {
        setIsPlaying(false)
        setNeedsGesture(true)
      }
    }

    tryPlay()
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

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
        setNeedsGesture(false)
      } catch {
        setNeedsGesture(true)
      }
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    setIsMuted((current) => !current)
  }

  const volumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2
  const VolumeIcon = volumeIcon

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/88 px-3 py-2 text-slate-900 shadow-[0_14px_40px_rgba(31,41,55,0.16)] backdrop-blur-md sm:bottom-6 sm:right-6">
      <audio
        ref={audioRef}
        src={assetPath('/audio/background.mp3')}
        loop
        preload="auto"
        onCanPlay={() => setIsReady(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlay}
        className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-white shadow-[0_8px_18px_rgba(249,115,22,0.28)] transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'หยุดเพลง' : needsGesture ? 'เปิดเพลง' : 'เล่นเพลง'}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>

      <button
        type="button"
        onClick={toggleMute}
        className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-white text-slate-700 transition hover:border-orange-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
      >
        <VolumeIcon className="h-4 w-4" />
      </button>

      <label className="hidden items-center gap-2 sm:flex" title="ปรับระดับเสียงเพลง">
        <span className="sr-only">ระดับเสียงเพลง</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(event) => {
            const nextVolume = Number(event.target.value)
            setVolume(nextVolume)
            setIsMuted(nextVolume === 0)
          }}
          className="h-1.5 w-24 cursor-pointer accent-orange-500"
          aria-label="ปรับระดับเสียงเพลง"
        />
      </label>

      {needsGesture && !isPlaying ? (
        <span className="hidden pr-1 text-xs font-medium text-slate-500 md:inline">กดเพื่อเปิดเพลง</span>
      ) : null}
      {!isReady ? <span className="sr-only">กำลังโหลดเพลง</span> : null}
    </div>
  )
}
