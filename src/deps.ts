import { findByProps } from '@vendetta/metro'
import { ReactNative as RN } from '@vendetta/metro/common'

const _MAS = findByProps('MobileAudioSound').MobileAudioSound

export class MobileAudioSound {
  // Event callbacks
  public onPlay?: () => void
  public onStop?: () => void
  public onEnd?: () => void
  public onLoad?: (loaded: boolean) => void

  private mas: any
  public duration?: number
  public isLoaded?: boolean
  public isPlaying?: boolean

  // This getter ensures compatibility with different module versions
  private get ensureSoundGetter() {
    return this.mas?._ensureSound || this.mas?.ensureSound
  }

  // Preloads the sound by retrieving its duration and setting it as loaded.
  private async _preloadSound(skip?: boolean) {
    const { _duration } = await this.ensureSoundGetter.bind(this.mas)()
    this.duration = RN.Platform.select({
      ios: _duration ? _duration * 1000 : _duration,
      default: _duration,
    })
    this.isLoaded = !!_duration
    if (!skip) this.onLoad?.(!!_duration)
    return !!_duration
  }

  constructor(
    public url: string,
    public usage: 'notification' | 'voice' | 'ring_tone' | 'media',
    public volume: number,
    events?: {
      onPlay?: () => void
      onStop?: () => void
      onEnd?: () => void
      onLoad?: (loaded: boolean) => void
    },
  ) {
    this.mas = new _MAS(
      url,
      {
        media: 'vibing_wumpus',
        notification: 'activity_launch',
        ring_tone: 'call_ringing',
        voice: 'mute',
      }[usage],
      volume,
      'default',
    )
    this.mas.volume = volume
    this._preloadSound()
    for (const [key, val] of Object.entries(events ?? {})) this[key] = val
  }

  private _playTimeout?: number

  // Plays the audio and sets a timeout based on its duration to auto-stop.
  async play() {
    if (!this.isLoaded && this.isLoaded !== false)
      await this._preloadSound()
    if (!this.isLoaded) return
    this.mas.volume = this.volume
    await this.mas.play()
    this.isPlaying = true
    this.onPlay?.()
    clearTimeout(this._playTimeout)
    this._playTimeout = setTimeout(
      () => (this.onEnd?.(), this.stop()),
      this.duration,
    ) as any
  }

  // Stops the audio and reloads it quietly for potential reuse.
  async stop() {
    if (!this.isLoaded) return
    this.mas.stop()
    this.isPlaying = false
    this.onStop?.()
    clearTimeout(this._playTimeout)
    await this._preloadSound(true)
  }
}
