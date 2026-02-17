> This project offers a client-side testing boilerplate using Lighthouse with Puppeteer, featuring examples for Docker and a Node.js package.

- Run Test
  - [Using Docker](#using-docker)
  - [Using the Node Module](#using-the-node-module)
  - [Command Line Parameters](#command-line-parameters)
  - [Custom configuration](#custom-configuration-file)
- Reporting
  - [Reporting to Datadog](#reporting-to-datadog)
  - [Reporting to Webhook](#reporting-to-webhook)
  - [Reporting to InfluxDB](#reporting-to-influxdb)
- AI Automation
  - [Creating test from scratch](#ai-test-creation-from-scratch)

## Using Docker

1. **Install Docker**: Ensure Docker is installed on your system.
2. **Clone the Repository**: Run the following command to clone the repository:

    ```sh
    git clone -b lighthouse https://git.epam.com/epm-perf/boilerplate.git
    ```

3. **Run the Docker Command**:
    - Navigate to the `lighthouse` folder.
    - Execute the following command that starts a Docker container with Lighthouse, maps your current directory, and runs your test script:

    ```sh
    docker run --rm -v "$PWD:$PWD" -w "$PWD" ibombit/lighthouse-puppeteer-chrome:12.8.2-alpine npx mocha --timeout 10000 ./test/demo.test.steps.js --browsertype=desktop --headless=true --url="https://demoqa.com/"
    ```
    If there's a need to run from current user (non-root):
    ```sh
   docker run --rm -v "$PWD:$PWD" -w "$PWD" --user "$(id -u):$(id -g)" ibombit/lighthouse-puppeteer-chrome:12.8.2-alpine npx mocha --timeout 10000 .\test\huge.test.steps.js --browsertype=desktop --headless=true --url="https://demoqa.com/"
   ```

## Using the Node Module

1. **Install Prerequisites**: Ensure [Node.js](https://nodejs.org/) and [Python](https://www.python.org/downloads/) are installed.
2. **Clone Repository**: Run the following command to clone the repository.

    ```sh
    git clone -b lighthouse https://git.epam.com/epm-perf/boilerplate.git
    ```

3. **Install Dependencies**:
    - Navigate to the `lighthouse` folder.
    - Execute the following command:

    ```sh
    npm install
    ```

4. **Run Tests**: Use the command below to run the tests:

   #### Windows

   ```sh
   npx mocha --timeout 10000 .\test\demo.test.steps.js --browsertype=desktop --headless=false --url="https://demoqa.com/"
   ```

   #### MacOS/Linux

   ```sh
   npx mocha --timeout 10000 ./test/demo.test.steps.js --browsertype=desktop --headless=false --url="https://demoqa.com/"
   ```
 
### Command Line Parameters

| Parameter         | Description                                          | Example Usage                          |
|-------------------|------------------------------------------------------|----------------------------------------|
| `browsertype`     | Specifies the browser type.                          | `--browsertype=desktop`               |
| `headless`        | Runs tests in headless mode.                         | `--headless=false`                    |
| `browserLocation` | Sets a custom browser location.                      | `--browserLocation="C:/Browser/start.exe"` |
| `login`           | Sets the login.                                      | `--login=example@email.com`           |
| `password`        | Sets the password.                                   | `--password=PASSWORD`                 |
| `url`             | Sets the host link.                                  | `--url=https://google.com`            |
| `ddhost`          | Specifies the Datadog host link (exclude 'http://'). | `--ddhost=api.datadoghq.eu`           |
| `ddkey`           | Provides the Datadog API key.                        | `--ddkey=<Your_Datadog_API_Key>`      |
| `ciurl`           | Sets the CI run URL.                                 | `--ciurl="YOUR_CI_URL"`               |
| `teamswebhook`    | Sets the Teams webhook URL.                          | `--teamswebhook="YOUR_WEBHOOK_URL"`   |
| `slackwebhook`    | Sets the Slack webhook URL.                          | `--slackwebhook="YOUR_WEBHOOK_URL"`   |
| `influxurl`       | Sets the InfluxDB URL (required for V1 and V2).       | `--influxurl=http://YOUR_IP:8086/`    |
| `influxToken`     | InfluxV2 specific. Sets the InfluxDB token.          | `--influxToken=YOUR_INFLUX_TOKEN`     |
| `influxorg`       | InfluxV2 specific. Sets the InfluxDB organization.   | `--influxorg=YOUR_ORG`                |
| `influxbucket`    | InfluxV2 specific. Sets the InfluxDB bucket.         | `--influxbucket=YOUR_BUCKET`          |
| `influxusername`  | InfluxV1 specific. Sets the InfluxDB username.       | `--influxusername=YOUR_USERNAME`      |
| `influxpassword`  | InfluxV1 specific. Sets the InfluxDB password.       | `--influxpassword=YOUR_PASSWORD`      |
| `influxdatabase`  | InfluxV1 specific. Sets the InfluxDB database.       | `--influxdatabase=YOUR_DATABASE`      |
| `configFile`      | Specifies a custom Lighthouse configuration file.    | `--configFile=path/to/config.json`    |
| `includetimestamp`| Adds timestamp to report file names (default false). | `--includetimestamp=true`             |
| `generatecsv`     | Generates CSV performance analysis report (default false). | `--generatecsv=true`              |

---

### Custom configuration file

- **`--configFile`**:  
  This parameter allows you to pass a custom JSON file to override the default Lighthouse configuration. The settings in the custom JSON file are merged with the existing configuration to provide a highly customizable and flexible testing setup.

  **Custom JSON Example** (`customConfig.json`):

  ```json
  {
    "settings": {
      "throttling": {
        "rttMs": 100,
        "throughputKbps": 15000,
        "cpuSlowdownMultiplier": 2
      },
      "formFactor": "mobile",
      "screenEmulation": {
        "mobile": true,
        "width": 375,
        "height": 667,
        "deviceScaleFactor": 2,
        "disabled": false
      }
    }
  }
  ```

## Reporting to Datadog

Specify `--ddhost` and `--ddkey` to send metrics to Datadog. To view these metrics, create a dashboard in Datadog using the example found in [datadog_dashboard_example.json](reporting/datadog_dashboard_example.json).

## Reporting to Webhook

If `--teamswebhook` or `--slackwebhook` is specified, metrics will be sent to the corresponding URL.

## Reporting to InfluxDB

### InfluxDB v1

To send metrics to InfluxDB v1, specify the following parameters: `--influxurl`, `--influxusername`, `--influxpassword`, and `--influxdatabase`.

### InfluxDB v2

To send metrics to InfluxDB v2, specify the following parameters: `--influxurl`, `--influxtoken`, `--influxorg`, and `--influxbucket`.

### Viewing Metrics

You can view the metrics by creating a dashboard in Grafana. Example dashboards are available:

- For InfluxDB v1: [grafana_v11.1.0_influx_v1.json](reporting/grafana_v11.1.0_influx_v1.json) or [grafana_v6.4.4_influx_v1.json](reporting/grafana_v6.4.4_influx_v1.json)
- For InfluxDB v2: [grafana_influx_v2.json](reporting/grafana_influx_v2.json)

## AI Automation

### AI Test Creation From Scratch
[Video Guide](https://epam.sharepoint.com/sites/PerformanceOptimizationPractice-pre-sales/_layouts/15/stream.aspx?id=%2Fsites%2FPerformanceOptimizationPractice%2Dpre%2Dsales%2FShared%20Documents%2FRecordings%2F1%20%2D%20Source%20Videos%2Fplaywright%5Fmcp%5Famz%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E70c77495%2D27f7%2D447c%2Dad8b%2Dd43c12802304)