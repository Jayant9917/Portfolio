"use client"

import { useCallback, useRef, useState } from "react"
import type { SoundAsset, UseSoundOptions, UseSoundReturn } from "@/lib/sound-types"

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {}
): UseSoundReturn {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    soundEnabled = true,
    onPlay,
    onEnd,
  } = options

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      if (!soundEnabled) return

      if (interrupt && audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }

      const audio = new Audio(sound.dataUri)
      audio.volume = overrides?.volume ?? volume
      audio.playbackRate = overrides?.playbackRate ?? playbackRate

      audio.onplay = () => {
        setIsPlaying(true)
        onPlay?.()
      }

      audio.onended = () => {
        setIsPlaying(false)
        onEnd?.()
      }

      audio.onerror = () => {
        setIsPlaying(false)
      }

      audioRef.current = audio
      audio.play().catch(() => {})
    },
    [sound, volume, playbackRate, interrupt, soundEnabled, onPlay, onEnd]
  )

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const controls = {
    stop,
    pause,
    isPlaying,
    duration: sound.duration,
    sound,
  }

  return [play, controls] as const
}
