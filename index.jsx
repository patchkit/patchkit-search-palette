import React from 'react'
import cls from 'classnames'

const KEYCODE_UP = 38
const KEYCODE_DOWN = 40
const KEYCODE_ENTER = 13

function boundary (v, low, high) {
  return Math.min(Math.max(v, low), high)
}

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  onMouseEnterResult(index) {
    this.setState({ selected: index })
  }

  moveSelection(direction) {
    if (this.state.selected === false) {
      // nothing selected yet, go to first result
      this.setState({ selected: 0 })
    } else {
      // update within bounds of current results
      this.setState({
        selected: boundary(this.state.selected + direction, 0, this.props.results.length - 1)
      })
    }
  }

  getSelectedResult() {
    return this.props.results[this.state.selected] || this.props.results[0]
  }

  render() {
    const onClickResult = this.props.onClickResult
    const Result = props => {
      return <div className={cls({ selected: this.state.selected === props.index })} onMouseEnter={this.onMouseEnterResult.bind(this, props.index)} onClick={onClickResult}>
        <i className={'fa fa-'+props.icon} /> {props.label}
      </div>
    }
    return <div className="search-palette-results">
      { this.props.results.map((r, i) => <Result key={i} index={i} {...r} />) }
    </div>
  }
}

export default class SearchPalette extends React.Component {
  static propTypes = {
    getResults: React.PropTypes.func.isRequired,

    query: React.PropTypes.string,
    placeholder: React.PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      query: this.props.query || '',
      isOpen: false,
      results: []
    }
  }

  onChange(e) {
    // update query & results
    const query = e.target.value
    this.setState({
      isOpen: true,
      query: query,
      results: (query) ? this.props.getResults(query) : []
    })
  }

  onKeyDown(e) {
    // enter query
    if (e.keyCode == KEYCODE_ENTER) {
      this.onSearch()
      e.preventDefault()
    }

    // navigate results
    if (e.keyCode == KEYCODE_UP && this.refs.results) {
      this.refs.results.moveSelection(-1)
      e.preventDefault()
    }
    if (e.keyCode == KEYCODE_DOWN && this.refs.results) {
      this.refs.results.moveSelection(1)
      e.preventDefault()
    }
  }

  onSearch() {
    if (this.state.isOpen) {
      var res = this.refs.results.getSelectedResult()
      if (res) {
        res.fn(this.state.query)
        this.setState({ query: '', results: [] })
      }
    }
  }

  focus() {
    this.refs.search.focus()
  }

  render() {
    return <div className="search-palette">
      <i className="fa fa-search" onClick={this.focus.bind(this)} />
      <input 
        ref="search"
        value={this.state.query}
        placeholder={this.props.placeholder}
        onChange={this.onChange.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)} />
      { this.state.isOpen && !!this.state.query ? <SearchResults ref="results" query={this.state.query} results={this.state.results} onClickResult={this.onSearch.bind(this)} /> : '' }
    </div>
  }
}