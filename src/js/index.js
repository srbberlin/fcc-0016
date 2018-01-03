let url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
let height = 600
let colWidth = 4

let mx = a => {
  let res = 0, i = 0, l = a.length
  while (i < l) {
    if (res < a[i][1]) {
      res = a[i][1]
    }
    i++
  }
  return res
}

let chart = d3.select('body')
  .select('.chart')
  .attr('height', height)    

d3.json(url, (error, res) => {
  if (! error) {
    let dateFrom = new Date(res.from_date)
    let dateTo = new Date(res.to_date)
    let source = res.source_name
    let name = res.name
    let des = res.description
    let value = res.data
    let width = colWidth * value.length

    let scale = d3.scaleLinear()
      .domain([0, mx(value)])
      .range([0, height])

    chart.attr('width', width)
      .selectAll('g')
      .data(value)
      .enter()
      .append('g')
      .append('rect')
      .attr('width', colWidth - 1)
      .attr('height', (d) => { return scale(d[1]) })
      .attr('transform', (d, i) => {
        return 'translate(' + i * colWidth + ',' + (height - scale(d[1])) + ')'
      })
  }
})
