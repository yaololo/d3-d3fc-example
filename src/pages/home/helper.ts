import { Task } from 'src/interfaces/xer-types'
import addMonth from 'date-fns/addMonths'
import * as fc from 'd3fc'
import * as d3 from 'd3'
import { MappedTask } from 'src/interfaces/xer-types'
import * as d3Annotation from 'd3-svg-annotation'
import compareAsc from 'date-fns/compareAsc'
import subMonths from 'date-fns/subMonths'

export const randomizeTaskSchedule = (tasks: Array<Task>) => {
  return tasks.map((task) => {
    // generate random number between -3 to 3
    const randomNumber = Math.floor(Math.random() * 4) - 2
    const sign = randomNumber > 0 ? 1 : -1
    const dateOperation = randomNumber > 0 ? addMonth : subMonths

    return {
      start: dateOperation(
        new Date(task.target_start_date),
        randomNumber * sign,
      ),
      end: dateOperation(
        new Date(task.target_end_date),
        (randomNumber + 1) * sign,
      ),
      targetStart: new Date(task.target_start_date),
      targetEnd: new Date(task.target_end_date),
      name: task.task_name,
    }
  })
}
// Date formatter
const formatDate = d3.timeFormat('%Y-%m')

const noteFormatDate = d3.timeFormat('%Y-%m-%d')
/**
 * Generate annotation when mouse hover over data point
 */
const createAnnotationData = (
  dataPoint: MappedTask & { x: number; y: number },
) => ({
  note: {
    label:
      `Target Start: ${noteFormatDate(dataPoint.targetStart)}\n\n` +
      `Actual Start: ${noteFormatDate(dataPoint.start)}\n`,
    bgPadding: 10,
    title: dataPoint.name,
  },
  data: { targetStart: dataPoint.targetStart, start: dataPoint.start },
  x: dataPoint.x,
  y: dataPoint.y,
  dx: 5,
  dy: 5,
})

const millisPerDay = 1000 * 60 * 60 * 24 * 60

// Define axis domain
const yExtent = fc
  .extentTime()
  .accessors([(d: MappedTask) => d.start])
  .padUnit('domain')
  .pad([millisPerDay, millisPerDay])

const xExtent = fc
  .extentTime()
  .accessors([(d: MappedTask) => d.targetStart])
  .padUnit('domain')
  .pad([millisPerDay, millisPerDay])

const seriesSvgAnnotation = () => {
  // the underlying component that we are wrapping
  const annotation = d3Annotation.annotation()

  let xScale = d3.scaleTime()
  let yScale = d3.scaleTime()

  const join = fc.dataJoin('g', 'annotation')

  const series = (selection: any) => {
    selection.each((data: any, index: number, group: any) => {
      const projectedData = data.map((d: any) => ({
        ...d,
        data,
      }))

      annotation.annotations(projectedData)

      join(d3.select(group[index]), projectedData).call(annotation)
    })
  }

  series.xScale = (...args: any) => {
    if (!args.length) {
      return xScale
    }
    xScale = args[0]
    return series
  }

  series.yScale = (...args: any) => {
    if (!args.length) {
      return yScale
    }
    yScale = args[0]
    return series
  }

  fc.rebindAll(series, annotation)

  return series as any
}

export const generateGraph = (data: Array<MappedTask>) => {
  // define scales
  const xScale = d3.scaleTime().domain(xExtent(data))
  const yScale = d3.scaleTime().domain(yExtent(data))
  const originalXScaleCopy = xScale.copy()
  const originalYScaleCopy = yScale.copy()

  const annotations: Array<any> = []
  const fillColor = fc
    .webglFillColor()
    .value((d: any) =>
      compareAsc(d.targetStart, d.start) < 0
        ? [255 / 255, 77 / 255, 79 / 255, 1]
        : [0 / 255, 204 / 255, 0 / 255, 1],
    )
    .data(data)

  const point = fc
    .seriesWebglPoint()
    .size(10)
    .crossValue((d: MappedTask) => d.targetStart)
    .mainValue((d: MappedTask) => d.start)
    .decorate((d: any) => fillColor(d))

  const annotationSeries = seriesSvgAnnotation()
    .notePadding(15)
    .type(d3Annotation.annotationCallout)

  const bisect = d3.bisector<MappedTask, any>((d) => d.targetStart)

  const pointer = fc.pointer().on('point', ([point]: any) => {
    //from https://roadtolarissa.com/scan-sorted/
    // annotations.pop();
    annotations.pop()

    if (!point) return
    const index = bisect.left(data, xScale.invert(point.x))

    let minPoint = null
    let minDist = Infinity
    let lxDist = 0
    let rxDist = 0
    let i = 0

    if (index > 0 && index < data.length) {
      const checkPoint = (d: MappedTask & { x?: number; y?: number }) => {
        if (!d) return Infinity
        const actualXValue = xScale(d.targetStart)
        const actualYValue = yScale(d.start)

        const dx = actualXValue - point.x
        const dy = actualYValue - point.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < minDist) {
          minDist = dist
          minPoint = { ...d, x: actualXValue, y: actualYValue }
        }

        return Math.abs(point.x - actualXValue)
      }

      while (lxDist < minDist && rxDist < minDist) {
        lxDist = checkPoint(data[index - i])
        rxDist = checkPoint(data[index + i])
        i++
      }

      if (minPoint) {
        annotations[0] = createAnnotationData({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore-start
          ...minPoint,
        })
      }
    }

    render()
  })

  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 30])
    .on('zoom', ({ transform }) => {
      xScale.domain(transform.rescaleX(originalXScaleCopy).domain())
      yScale.domain(transform.rescaleY(originalYScaleCopy).domain())
      render()
    })

  const chart = fc
    .chartCartesian(xScale, yScale)
    .chartLabel('Task Schedule Analysis')
    .xDomain(xExtent(data))
    .xTickFormat(formatDate)
    .xLabel('Schedule start date')
    .xNice()
    .yDomain(yExtent(data))
    .yTickFormat(formatDate)
    .yOrient('left')
    .yLabel('Actual start date')
    .yNice()

  chart
    .webglPlotArea(
      // only render the point series on the WebGL layer
      fc
        .seriesWebglMulti()
        .series([point])
        .mapping((d: any) => d.data),
    )
    .svgPlotArea(
      // only render the annotations series on the SVG layer
      fc
        .seriesSvgMulti()
        .series([annotationSeries])
        .mapping((d: any) => d.annotations),
    )
    .decorate((sel: any) =>
      sel
        .enter()
        .select('d3fc-svg.plot-area')
        .on('measure.range', ({ detail }: { detail: any }) => {
          originalXScaleCopy.range([0, detail.width])
          originalYScaleCopy.range([detail.height, 0])
        })
        .call(pointer)
        .call(zoom, xScale, yScale),
    )

  const render = () => {
    d3.select('#my_dataviz').datum({ data, annotations }).call(chart)
  }

  render()
}
