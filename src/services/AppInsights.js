// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js'
import { globalHistory } from "@reach/router"
if (!("XMLHttpRequest" in global)) {
    global.XMLHttpRequest = require('xhr2');
    global.XDomainRequest = undefined;
}
const reactPlugin = new ReactPlugin();
const ai = new ApplicationInsights({
    config: {
        instrumentationKey: process.env.GATSBY_APPLICATION_INSIGHTS_KEY,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: globalHistory }
        }
    }
})
if (process.env.GATSBY_APPLICATION_INSIGHTS_KEY) {
    ai.loadAppInsights();
} else {
    console.log('Application insights key not available.')
}

export default (Component) => withAITracking(reactPlugin, Component)
export const appInsights = ai.appInsights