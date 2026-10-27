import { FabricDefs } from '@/components/FabricDefs'
import { GameScreen } from '@/features/game/GameScreen'
import { leaveSharedSpace } from '@/features/game/shared-space'
import { useThisDevice } from '@/features/game/useThisDevice'
import { HomeScreen } from '@/features/home/HomeScreen'
import { useJoinLink } from '@/features/home/useJoinLink'

export function App() {
  const { device, rememberName, enterGame, forgetGame } = useThisDevice()
  const { linkedCode, clearLink } = useJoinLink()

  function enter(code: string, name: string) {
    if (device.code !== null && device.code !== code) void leaveSharedSpace(device.code)
    rememberName(name)
    enterGame(code)
    clearLink()
  }

  // A link to another game than the one this phone is in opens the home screen to join it.
  const isLinkForThisGame = linkedCode === null || linkedCode === device.code
  const game = device.code !== null && device.name !== null && isLinkForThisGame ? { code: device.code, name: device.name } : null

  return (
    <>
      <FabricDefs />
      {game ? (
        <GameScreen
          key={game.code}
          code={game.code}
          me={{ id: device.playerId, name: game.name }}
          onLeave={() => void leaveSharedSpace(game.code).then(forgetGame)}
        />
      ) : (
        <HomeScreen savedName={device.name} linkedCode={linkedCode} onEnter={enter} />
      )}
    </>
  )
}
