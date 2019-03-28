let url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
let height = 400
let colWidth = 3

let toolTip = document.getElementById('tooltip')
let svg = d3.select('svg')
let main = d3.select('.main')
let chart = d3.select('.chart')
let box = d3.select('.box')
let foObj = d3.select('foreignObject')
let head = d3.select('.text thead')
let body = d3.select('.text tbody')
let footer = d3.select('.text tfoot')

toolTip.style.visibility = 'hidden'

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

let movr = e => {
  toolTip.innerText = e.target.attributes[3].value + ', ' + e.target.attributes[4].value
  toolTip.style.visibility = 'visible'
  toolTip.setAttribute('data-date', e.target.attributes[3].value)
  toolTip.setAttribute('data-gdp', e.target.attributes[4].value)
}

let mout = () => {
  toolTip.style.visibility = 'hidden'
}

d3.json(url, (error, res) => {
  if (! error) {
    let dateFrom = new Date(res.from_date)
    let dateTo = new Date(res.to_date)
    let source = res.source_name
    let name = res.name.split(',')[0] + ' of the USA'
    let des = res.description.split('\n')
    let value = res.data
    let width = colWidth * value.length - 2

    let barScale = d3.scaleLinear()
      .domain([0, mx(value)])
      .range([0, height])

    let valueScale = d3.scaleLinear()
      .domain([0, mx(value)])
      .range([height, 0])

    let timeScale = d3.scaleTime()
      .domain([dateFrom, dateTo])
      .range([0, width])  

    let timeAxis = d3.axisBottom(timeScale)

    let valueAxis = d3.axisRight(valueScale)

    des.push('Source: ' + source)

    svg
      .attr('height', height + 90)
      .attr('width', width + 100)

    main
      .attr('height', height + 90)
      .attr('width', width + 100)
  
    box
      .attr('transform', 'translate(25, 25)')
      .attr('height', 250)
      .attr('width', 350)

    foObj
      .attr('transform', 'translate(25, 25)')
      .attr('height', 250)
      .attr('width', 350)

    head
      .html('<td colspan="2">' + name + '</td>')

    body
      .selectAll('tbody')
      .data(des)
      .enter()
      .append('tr')
      .html((d) => {
        let v = d.split(': ')
        if (v[1]) {
          v[1] = v[1].replace(/\((http.*?)\)/i, '<a href=$1 target=_blank>$1</a>')
        }
        return '<td>' + v[0] + '</td><td>' + v[1] + '</td>'
      })

    footer
      .html('<td colspan="2">' + '' + '</td>')

    chart
      .attr('transform', 'translate(15, 15)')
      .attr('height', height)
      .attr('width', width)
      .selectAll('g')
      .data(value)
      .enter()
      .append('g')
      .append('rect')
      .attr('class', 'bar')
      .attr('width', colWidth - 1)
      .attr('height', (d) => { return barScale(d[1]) })
      .attr('data-date', (d) => { return d[0] })
      .attr('data-gdp', (d) => { return d[1] })
      .attr('transform', (d, i) => {
        return 'translate(' + i * colWidth + ',' + (height - barScale(d[1])) + ')'
      })

    chart
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', 'translate(0, ' + (height + 10) + ')')
      .call(timeAxis)

    chart
      .append('g')
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + (width + 10) + ', 0)')
      .call(valueAxis)
  }

  var bars = document.getElementsByClassName('bar')
  for (var i = 0; i < bars.length; i++) {
    bars[i].addEventListener('mouseover', movr)
    bars[i].addEventListener('mouseout', mout)
  }  
})
