// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js'
import { globalHistory } from "@reach/router"

// if (!("XMLHttpRequest" in global)) {
//     global.XMLHttpRequest = undefined;
//     global.XDomainRequest = undefined;
// }

let applicationInsightsKey;

if (process.env.GATSBY_APPLICATION_INSIGHTS_KEY && process.env.GATSBY_APPLICATION_INSIGHTS_KEY != '') {
    applicationInsightsKey = process.env.GATSBY_APPLICATION_INSIGHTS_KEY;
} else {
    applicationInsightsKey = '${{ secrets.APPLICATION_INSIGHTS_KEY }}'
}

const reactPlugin = new ReactPlugin();
const ai = new ApplicationInsights({
    config: {
        instrumentationKey: applicationInsightsKey,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: globalHistory }
        }
    }
})

if (applicationInsightsKey && applicationInsightsKey != '' && applicationInsightsKey == '${{ secrets.APPLICATION_INSIGHTS_KEY }}') {
    ai.loadAppInsights();
} else {
    console.log('Application insights key not available.')
}

export default (Component) => withAITracking(reactPlugin, Component)
export const appInsights = ai.appInsights