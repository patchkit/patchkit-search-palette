import React from 'react'
import SearchPalette from './index'

export default class SearchPaletteDemo extends React.Component {
  render() {
    const openUser = str => console.log('open user', str)
    const openMsg  = str => console.log('open msg', str)
    const openFile = str => console.log('open file', str)
    const getResults = str => [
      { icon: 'envelope', label: `Open message "${str}"`, fn: openMsg },
      { icon: 'user',     label: `Open user "${str}"`,    fn: openUser },
      { icon: 'file',     label: `Open file "${str}"`,    fn: openFile }
    ]
    return <div>
      <h1>patchkit-search-palette</h1>
      <section className="demo-search-palette">
        <header>&lt;SearchPalette placeholder="Enter your query"&gt;</header>
        <div className="content">
          <div style={{width: 280}}><SearchPalette placeholder="Enter your query" getResults={getResults} /></div>
        </div>
      </section>
    </div>
  }
}