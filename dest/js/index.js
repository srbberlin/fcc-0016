(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
var height = 600;
var colWidth = 4;

var mx = function mx(a) {
  var res = 0,
      i = 0,
      l = a.length;
  while (i < l) {
    if (res < a[i][1]) {
      res = a[i][1];
    }
    i++;
  }
  return res;
};

var chart = d3.select('body').select('.chart').attr('height', height);

d3.json(url, function (error, res) {
  if (!error) {
    var dateFrom = new Date(res.from_date);
    var dateTo = new Date(res.to_date);
    var source = res.source_name;
    var name = res.name;
    var des = res.description;
    var value = res.data;
    var width = colWidth * value.length;

    var scale = d3.scaleLinear().domain([0, mx(value)]).range([0, height]);

    chart.attr('width', width).selectAll('g').data(value).enter().append('g').append('rect').attr('width', colWidth - 1).attr('height', function (d) {
      return scale(d[1]);
    }).attr('transform', function (d, i) {
      return 'translate(' + i * colWidth + ',' + (height - scale(d[1])) + ')';
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInVybCIsImhlaWdodCIsImNvbFdpZHRoIiwibXgiLCJyZXMiLCJpIiwibCIsImEiLCJsZW5ndGgiLCJjaGFydCIsImQzIiwic2VsZWN0IiwiYXR0ciIsImpzb24iLCJlcnJvciIsImRhdGVGcm9tIiwiRGF0ZSIsImZyb21fZGF0ZSIsImRhdGVUbyIsInRvX2RhdGUiLCJzb3VyY2UiLCJzb3VyY2VfbmFtZSIsIm5hbWUiLCJkZXMiLCJkZXNjcmlwdGlvbiIsInZhbHVlIiwiZGF0YSIsIndpZHRoIiwic2NhbGUiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJhcHBlbmQiLCJkIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLE1BQU0sMEZBQVY7QUFDQSxJQUFJQyxTQUFTLEdBQWI7QUFDQSxJQUFJQyxXQUFXLENBQWY7O0FBRUEsSUFBSUMsS0FBSyxTQUFMQSxFQUFLLElBQUs7QUFDWixNQUFJQyxNQUFNLENBQVY7QUFBQSxNQUFhQyxJQUFJLENBQWpCO0FBQUEsTUFBb0JDLElBQUlDLEVBQUVDLE1BQTFCO0FBQ0EsU0FBT0gsSUFBSUMsQ0FBWCxFQUFjO0FBQ1osUUFBSUYsTUFBTUcsRUFBRUYsQ0FBRixFQUFLLENBQUwsQ0FBVixFQUFtQjtBQUNqQkQsWUFBTUcsRUFBRUYsQ0FBRixFQUFLLENBQUwsQ0FBTjtBQUNEO0FBQ0RBO0FBQ0Q7QUFDRCxTQUFPRCxHQUFQO0FBQ0QsQ0FURDs7QUFXQSxJQUFJSyxRQUFRQyxHQUFHQyxNQUFILENBQVUsTUFBVixFQUNUQSxNQURTLENBQ0YsUUFERSxFQUVUQyxJQUZTLENBRUosUUFGSSxFQUVNWCxNQUZOLENBQVo7O0FBSUFTLEdBQUdHLElBQUgsQ0FBUWIsR0FBUixFQUFhLFVBQUNjLEtBQUQsRUFBUVYsR0FBUixFQUFnQjtBQUMzQixNQUFJLENBQUVVLEtBQU4sRUFBYTtBQUNYLFFBQUlDLFdBQVcsSUFBSUMsSUFBSixDQUFTWixJQUFJYSxTQUFiLENBQWY7QUFDQSxRQUFJQyxTQUFTLElBQUlGLElBQUosQ0FBU1osSUFBSWUsT0FBYixDQUFiO0FBQ0EsUUFBSUMsU0FBU2hCLElBQUlpQixXQUFqQjtBQUNBLFFBQUlDLE9BQU9sQixJQUFJa0IsSUFBZjtBQUNBLFFBQUlDLE1BQU1uQixJQUFJb0IsV0FBZDtBQUNBLFFBQUlDLFFBQVFyQixJQUFJc0IsSUFBaEI7QUFDQSxRQUFJQyxRQUFRekIsV0FBV3VCLE1BQU1qQixNQUE3Qjs7QUFFQSxRQUFJb0IsUUFBUWxCLEdBQUdtQixXQUFILEdBQ1RDLE1BRFMsQ0FDRixDQUFDLENBQUQsRUFBSTNCLEdBQUdzQixLQUFILENBQUosQ0FERSxFQUVUTSxLQUZTLENBRUgsQ0FBQyxDQUFELEVBQUk5QixNQUFKLENBRkcsQ0FBWjs7QUFJQVEsVUFBTUcsSUFBTixDQUFXLE9BQVgsRUFBb0JlLEtBQXBCLEVBQ0dLLFNBREgsQ0FDYSxHQURiLEVBRUdOLElBRkgsQ0FFUUQsS0FGUixFQUdHUSxLQUhILEdBSUdDLE1BSkgsQ0FJVSxHQUpWLEVBS0dBLE1BTEgsQ0FLVSxNQUxWLEVBTUd0QixJQU5ILENBTVEsT0FOUixFQU1pQlYsV0FBVyxDQU41QixFQU9HVSxJQVBILENBT1EsUUFQUixFQU9rQixVQUFDdUIsQ0FBRCxFQUFPO0FBQUUsYUFBT1AsTUFBTU8sRUFBRSxDQUFGLENBQU4sQ0FBUDtBQUFvQixLQVAvQyxFQVFHdkIsSUFSSCxDQVFRLFdBUlIsRUFRcUIsVUFBQ3VCLENBQUQsRUFBSTlCLENBQUosRUFBVTtBQUMzQixhQUFPLGVBQWVBLElBQUlILFFBQW5CLEdBQThCLEdBQTlCLElBQXFDRCxTQUFTMkIsTUFBTU8sRUFBRSxDQUFGLENBQU4sQ0FBOUMsSUFBNkQsR0FBcEU7QUFDRCxLQVZIO0FBV0Q7QUFDRixDQTFCRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCB1cmwgPSAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0ZyZWVDb2RlQ2FtcC9Qcm9qZWN0UmVmZXJlbmNlRGF0YS9tYXN0ZXIvR0RQLWRhdGEuanNvbidcbmxldCBoZWlnaHQgPSA2MDBcbmxldCBjb2xXaWR0aCA9IDRcblxubGV0IG14ID0gYSA9PiB7XG4gIGxldCByZXMgPSAwLCBpID0gMCwgbCA9IGEubGVuZ3RoXG4gIHdoaWxlIChpIDwgbCkge1xuICAgIGlmIChyZXMgPCBhW2ldWzFdKSB7XG4gICAgICByZXMgPSBhW2ldWzFdXG4gICAgfVxuICAgIGkrK1xuICB9XG4gIHJldHVybiByZXNcbn1cblxubGV0IGNoYXJ0ID0gZDMuc2VsZWN0KCdib2R5JylcbiAgLnNlbGVjdCgnLmNoYXJ0JylcbiAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodCkgICAgXG5cbmQzLmpzb24odXJsLCAoZXJyb3IsIHJlcykgPT4ge1xuICBpZiAoISBlcnJvcikge1xuICAgIGxldCBkYXRlRnJvbSA9IG5ldyBEYXRlKHJlcy5mcm9tX2RhdGUpXG4gICAgbGV0IGRhdGVUbyA9IG5ldyBEYXRlKHJlcy50b19kYXRlKVxuICAgIGxldCBzb3VyY2UgPSByZXMuc291cmNlX25hbWVcbiAgICBsZXQgbmFtZSA9IHJlcy5uYW1lXG4gICAgbGV0IGRlcyA9IHJlcy5kZXNjcmlwdGlvblxuICAgIGxldCB2YWx1ZSA9IHJlcy5kYXRhXG4gICAgbGV0IHdpZHRoID0gY29sV2lkdGggKiB2YWx1ZS5sZW5ndGhcblxuICAgIGxldCBzY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIG14KHZhbHVlKV0pXG4gICAgICAucmFuZ2UoWzAsIGhlaWdodF0pXG5cbiAgICBjaGFydC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgLnNlbGVjdEFsbCgnZycpXG4gICAgICAuZGF0YSh2YWx1ZSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgY29sV2lkdGggLSAxKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIChkKSA9PiB7IHJldHVybiBzY2FsZShkWzFdKSB9KVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBpICogY29sV2lkdGggKyAnLCcgKyAoaGVpZ2h0IC0gc2NhbGUoZFsxXSkpICsgJyknXG4gICAgICB9KVxuICB9XG59KVxuIl19
},{}]},{},[1])