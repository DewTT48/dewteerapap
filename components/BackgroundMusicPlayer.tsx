'use client'

import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { assetPath } from '@/lib/asset-path'

const DEFAULT_VOLUME = 0.4
const tracks = [
  '/audio/funk-af-everet-almond.mp3',
  '/audio/ready-for-freddy-tracktribe.mp3',
  '/audio/hip-bone-quincas-moreira.mp3'
]

export default function BackgroundMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)

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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isPlaying) return

    audio.load()
    audio.play().catch(() => setNeedsGesture(true))
  }, [trackIndex, isPlaying])

  if (!hasAudio) return null

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

  const playNextTrack = () => {
    setTrackIndex((current) => (current + 1) % tracks.length)
  }

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <div className="group fixed bottom-3 right-3 z-50 flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-white/90 p-1.5 text-slate-900 shadow-[0_10px_28px_rgba(31,41,55,0.14)] backdrop-blur-md sm:bottom-5 sm:right-5">
      <audio
        ref={audioRef}
        src={assetPath(tracks[trackIndex])}
        preload="auto"
        onCanPlay={() => setHasAudio(true)}
        onError={() => setHasAudio(false)}
        onEnded={playNextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlay}
        className="grid h-8 w-8 place-items-center rounded-full bg-orange-500 text-white shadow-[0_7px_16px_rgba(249,115,22,0.24)] transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'หยุดเพลง' : needsGesture ? 'เปิดเพลง' : 'เล่นเพลง'}
      >
        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="ml-0.5 h-3.5 w-3.5" />}
      </button>

      <button
        type="button"
        onClick={toggleMute}
        className="grid h-8 w-8 place-items-center rounded-full border border-stone-200 bg-white text-slate-700 transition hover:border-orange-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-200"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
      >
        <VolumeIcon className="h-3.5 w-3.5" />
      </button>

      <label className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-200 group-hover:w-20 group-hover:opacity-100 group-focus-within:w-20 group-focus-within:opacity-100" title="ปรับระดับเสียงเพลง">
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
          className="h-1.5 w-20 cursor-pointer accent-orange-500"
          aria-label="ปรับระดับเสียงเพลง"
        />
      </label>

      {needsGesture && !isPlaying ? <span className="sr-only">กดเพื่อเปิดเพลง</span> : null}
    </div>
  )
}
