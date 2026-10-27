import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div role="alert" className="panel mx-auto my-16 max-w-xl text-center">
          <h1 className="text-3xl">Something went wrong</h1>
          <p className="mt-3 text-muted">
            This page could not be displayed. Reload the page, or go back to the home page.
          </p>
          <a className="btn btn-primary mt-6" href="#/">
            Go to home
          </a>
        </div>
      )
    }
    return this.props.children
  }
}
