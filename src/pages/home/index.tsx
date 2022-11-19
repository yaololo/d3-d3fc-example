import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { xerToJson } from 'src/lib/utils/xer-parser'
import { Task } from 'src/interfaces/xer-types'
import { randomizeTaskSchedule } from './helper'
import compareAsc from 'date-fns/compareAsc'
import { generateGraph } from './generate-graph'

const Container = styled.div`
  .cartesian-chart {
    padding: 20px;
    width: 1000px;
    height: 800px;
  }

  .annotation-note-bg {
    fill-opacity: 0.9;
  }

  .annotation-note-label,
  .annotation-note-title {
    fill: black;
  }
`

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  font-size: 24px;
  font-weight: bold;
`

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('./fake_project.xer', { method: 'GET' })

      if (response.ok) {
        const text = await response.text()
        setIsLoading(false)
        const { tables } = xerToJson(text) as { tables: { TASK: Array<Task> } }
        const tasks = randomizeTaskSchedule(tables.TASK)
        generateGraph(
          // Sorting is necessary for finding the closest data point for adding annotation
          tasks.sort((a, b) => compareAsc(a.targetStart, b.targetStart)),
        )
      } else {
        console.log('something went wrong')
      }
    } catch (error) {
      // error handling is ignored for now.
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="flex justify-center align-center"
      style={{ width: '100%', height: '100vh' }}
    >
      <Container>
        <LoadingContainer className="flex justify-center align-center">
          {isLoading ? <p>Loading...</p> : null}
        </LoadingContainer>
        <div id="my_dataviz"></div>
      </Container>
    </div>
  )
}

export default Home
