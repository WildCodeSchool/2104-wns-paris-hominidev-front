import React from "react";
import * as Sentry from "@sentry/browser";

interface TopErrorBoundaryState {
  hasError: boolean;
  sentryEventId: string;
  localStorage: string;
}

export class TopErrorBoundary extends React.Component<
  any,
  TopErrorBoundaryState
> {
  state: TopErrorBoundaryState = {
    hasError: false,
    sentryEventId: "",
    localStorage: "",
  };

  render() {
    return this.state.hasError ? this.errorSplash() : this.props.children;
  }

  componentDidCatch(error: Error, errorInfo: any) {
    const _localStorage: any = {};
    for (const [key, value] of Object.entries({ ...localStorage })) {
      try {
        _localStorage[key] = JSON.parse(value);
      } catch (error: any) {
        _localStorage[key] = value;
      }
    }

    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);

      this.setState((state) => ({
        hasError: true,
        sentryEventId: eventId,
        localStorage: JSON.stringify(_localStorage),
      }));
    });
  }

  private selectTextArea(event: React.MouseEvent<HTMLTextAreaElement>) {
    if (event.target !== document.activeElement) {
      event.preventDefault();
      (event.target as HTMLTextAreaElement).select();
    }
  }

  private async createGithubIssue() {
    let body = "";
    try {
      const templateStrFn = (sentryErrorId: string) => `
      ### Scene content
      \`\`\`
      Paste scene content here
      \`\`\`
      ### Sentry Error ID
      ${sentryErrorId}
      `
      body = encodeURIComponent(templateStrFn(this.state.sentryEventId));
    } catch (error: any) {
      console.error(error);
    }

    window.open(
      `https://github.com/excalidraw/excalidraw/issues/new?body=${body}`,
    );
  }

  private errorSplash() {
    return (
      <div className="ErrorSplash excalidraw">
        <div className="ErrorSplash-messageContainer">
          <div className="ErrorSplash-paragraph bigger align-center">
            {("errorSplash.headingMain_pre")}
            <button onClick={() => window.location.reload()}>
              {("errorSplash.headingMain_button")}
            </button>
          </div>
          <div className="ErrorSplash-paragraph align-center">
            {("errorSplash.clearCanvasMessage")}
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  window.location.reload();
                } catch (error: any) {
                  console.error(error);
                }
              }}
            >
              {("errorSplash.clearCanvasMessage_button")}
            </button>
            <br />
            <div className="smaller">
              <span role="img" aria-label="warning">
                ⚠️
              </span>
              {("errorSplash.clearCanvasCaveat")}
              <span role="img" aria-hidden="true">
                ⚠️
              </span>
            </div>
          </div>
          <div>
            <div className="ErrorSplash-paragraph">
              {("errorSplash.trackedToSentry_pre")}
              {this.state.sentryEventId}
              {("errorSplash.trackedToSentry_post")}
            </div>
            <div className="ErrorSplash-paragraph">
              {("errorSplash.openIssueMessage_pre")}
              <button onClick={() => this.createGithubIssue()}>
                {("errorSplash.openIssueMessage_button")}
              </button>
              {("errorSplash.openIssueMessage_post")}
            </div>
            <div className="ErrorSplash-paragraph">
              <div className="ErrorSplash-details">
                <label>{("errorSplash.sceneContent")}</label>
                <textarea
                  rows={5}
                  onPointerDown={this.selectTextArea}
                  readOnly={true}
                  value={this.state.localStorage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}