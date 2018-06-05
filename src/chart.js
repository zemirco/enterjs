
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {line} from 'd3-shape'
import {axisBottom, axisLeft} from 'd3-axis'

const defaults = {
  target: '#chart',
  width: 640,
  height: 480,
  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  }
}

export default class LineChart {

  constructor(config) {
    Object.assign(this, defaults, config)
    this.init()
  }

  init() {
    const {target, width, height, margin} = this
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom

    this.svg = select(target)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.xScale = scaleLinear()
      .range([0, w])

    this.yScale = scaleLinear()
      .range([h, 0])

    this.line = line()
      .x((d, i) => this.xScale(i))
      .y(d => this.yScale(d))

    this.xAxis = axisBottom(this.xScale)

    this.svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${h})`)
      .call(this.xAxis)

    this.yAxis = axisLeft(this.yScale)

    this.svg
      .append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)

    this.svg
      .append('path')
      .attr('class', 'line')
  }

  render(data) {
    const {xScale, yScale, xAxis, yAxis, svg} = this

    xScale.domain([0, data.length - 1])

    svg.select('.x.axis')
      .call(xAxis)

    yScale.domain([0, 10])

    svg.select('.y.axis')
      .call(yAxis)

    svg
      .select('.line')
      .datum(data)
      .attr('d', this.line)

    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => xScale(i))
      .attr('cy', d => yScale(d))
      .attr('r', 5)
  }

  resize(width) {
    const {svg, target, margin, xScale, xAxis, line} = this

    select(target)
      .attr('width', width)

    const w = width - margin.left - margin.right

    xScale.range([0, w])

    svg.select('.x.axis')
      .call(xAxis)

    svg.selectAll('.dot')
      .attr('cx', (d, i) => xScale(i))

    svg.select('.line')
      .attr('d', line)
  }

}
