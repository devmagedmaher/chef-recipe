import React from 'react'
import { ActionIcon, createStyles, Divider, Group, Navbar, ScrollArea, Text, Title } from '@mantine/core'
import { IconDoorExit } from '@tabler/icons'
import { HEADER_HEIGHT } from '../../header'
import PlayersList from './playersList'
import { useGame } from '..'

const SIDEBAR_WIDTH = 400

const useStyles = createStyles((theme) => ({
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  scrollArea: {
    height: '100%',
  },
}))

const Sidebar = () => {
  const { classes } = useStyles()
  const { game, room } = useGame()

  const renderGameStage = () => {
    const stage = game.started
      ? game.recipe
        ? game.showFood
          ? 'Food in display'
          : 'Dilemma of choices'
        : 'Recipe is being prepared'
      : null

      return stage ? `${stage} (${game.countDown})` : null
  }

  const exitKitchen = () => {
    window.location.href = '/join'
  }

  return (
    <Navbar width={{ base: SIDEBAR_WIDTH }} height={`calc(100vh - ${HEADER_HEIGHT}px)`}>
      <ScrollArea className={classes.scrollArea} type="always">
        <Navbar.Section p='lg'>
          <Group position='apart'>
            <Title order={4} mb="sm">Kitchen "{room}" {game.started ? '(Started)' : null}</Title>
            <ActionIcon
              onClick={exitKitchen}
              variant="outlined"
              color='red'
              size='md'
            >
              <IconDoorExit size={16} style={{ transform: 'scaleX(-1)' }} />
            </ActionIcon>
          </Group>
          <Text>Round: {game.round}/{game.rounds}</Text>
          {game.started ? <Text>Stage: {renderGameStage()}</Text> : null}
        </Navbar.Section>

        <Divider />

        <Navbar.Section grow>
            <PlayersList />
        </Navbar.Section>

        <Navbar.Section>
          {/* FOOTER */}
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  )
}

export default Sidebar

export { SIDEBAR_WIDTH }