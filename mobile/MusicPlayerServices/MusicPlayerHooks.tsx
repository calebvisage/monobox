/* React / React-Native imports */
import { useCallback, useEffect, useState } from 'react'

/* Music Player imports */
import TrackPlayer, {
  usePlaybackState,
  State,
  Track,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player'

/* utils imports */
import { BASE_API_URL, BASE_API_PORT } from '../utils/BaseAPI'
import { Playlist } from '../utils/Song'

export const useOnTogglePlayback = () => {
  const state = usePlaybackState()
  const isPlaying = state === State.Playing
  return useCallback(() => {
    if (isPlaying) {
      TrackPlayer.pause()
    } else {
      TrackPlayer.play()
    }
  }, [isPlaying])
}

export const useCurrentTrack = (): Track | undefined => {
  const [index, setIndex] = useState<number | undefined>()
  const [track, setTrack] = useState<Track | undefined>()

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async ({ nextTrack }) => {
    setIndex(nextTrack)
  })

  useEffect(() => {
    if (index === undefined) return
    ;(async () => {
      const track = await TrackPlayer.getTrack(index)
      setTrack(track || undefined)
    })()
  }, [index])

  return track
}

// Fetches a playlist
export const useTracksApiRequest = (url: string) => {
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [error, setError] = useState(null)
  const fetchSongs = async () => {
    await fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => setPlaylist(json))
      .catch((error) => {
        setError(error)
      })
    setIsLoaded(false)
  }
  useEffect(() => {
    fetchSongs()
  }, [url])

  return { playlist, isLoaded, error }
}

// Fetches all playlists
export const usePlaylistApiRequest = (url: string) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [error, setError] = useState(null)
  const fetchPlaylists = async () => {
    await fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => setPlaylists(json))
      .catch((error) => {
        setError(error)
      })
    setIsLoaded(false)
  }
  useEffect(() => {
    fetchPlaylists()
  }, [url])

  return { playlists, setPlaylists, isLoaded, error }
}

export const useSetupTracks = (
  playlist: Track[],
  song_id: number | undefined,
) => {
  const [isLoaded, setIsLoaded] = useState(true)
  const [index, setIndex] = useState(0)
  const setupTracks = async () => {
    await TrackPlayer.reset()
    const tracks: Track[] = []
    playlist.forEach((item) => {
      const track: Track = {
        id: 0,
        url: '',
        title: '',
        artist: '',
        artwork: '',
        duration: 0,
      }
      track['id'] = item.id
      track[
        'url'
      ] = `http://${BASE_API_URL}:${BASE_API_PORT}/songs/${item.id}/stream`
      track['title'] = item.title
      track['artist'] = item.artist
      track['artwork'] = item.artwork
      track['rating'] = item.liked_bool ? true : false
      track['duration'] = item.duration
      tracks.push(track)
    })
    const index = tracks.findIndex((track) => track.id === song_id)
    await TrackPlayer.add(tracks)
    if (index !== -1) {
      setIndex(index)
      await TrackPlayer.skip(index)
    }
    setIsLoaded(false)
  }

  useEffect(() => {
    setupTracks()
  }, [playlist])

  return { index, isLoaded }
}
