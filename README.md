# pcd-github.github.io

SWRVE is a 'safe withdrawal rate calculator' aimed at 
providing a straightforward, efficent way to determine how much 
you can withdraw from savings over time without running out of money.

The summary cards, results chart, and result bars on the right reflect
whatever the inputs provided on the left give you.

# Inputs
Age and Life Expectancy reflect how long you need your funds to last.

Portfolio Value reflects the total amount saved.

Annual Spend is what your wanting (or needing) to live as you want.  Currently
the calulator is limited to inflation-adjusted only.  I may do fixed % when time 
permits.

The Stock/Bond asset mix slider is how you've allocated your savings.  
It does not permit you to allocate a lot into cash, gold, or other 
commodities.  Maybe I'll expand this over time.

Annual fee % is what you're paying someone for the privilege of holding
(or managing) your money.  The default (low) value reflects my own bias towards 
low-cost index funds and ETFs.

Historical data range determines which years we apply to your historically
based results.  This allows you to emulate past patterns of bull/bear markets 
and inflation.  The per-year results are based on Robert Shiller's historical
data (http://www.econ.yale.edu/~shiller/data.htm), which a number of similar 
calculators have also used.  They also assume broad index/ETF investment
strategy - using a subset of the options (as in managed or sector) funds could
yield significantly different results.

One other note about the historical data - Currently, the years are applied 
sequentially only.  This will limit the number of cycles run to be
(end year - start year) - lifetime.  This is why the number of cycles (and lines
in the chart) change when you tweak the historical range, life expectancy, or 
age.  I'm considering adding monte carlo simulation down the road.

You can choose to include social security, starting at age 62, 67, or 70.  There 
are currently no other options for incorporating additional income.

# Results
The summary cards at the top give a very high-levle overview of what your inputs
will give you.  I've kept this pretty concise, as I visual data speaks to me 
more.

Success rate is the first thing people tend to look at.  Given market fluctuation, 
I thought it useful to see what one might expect for net-positive years too.  This is whether you're up or down in overall value from the previous year, factoring your net returns and total spending.  The minimum/median failure ages also seem useful.

End value and combined return % (given your asset allocation) round out the summary data.

The multi-line chart with different colors shows what the individual cycles using historic data look like with your inputs.  The colors (from green to red) reflect the end value of your portfolio.  At this writing the colors mean this :

Dark Green : 3-20x of the original value
Lighter Green : 1.5-3x of original value
Light Olive : 0.5-1.5 of original value
Orange : Between $0.01 and 50% of original value
Red : 0 (or failures)

The bin chart at the bottom can be useful for looking at the categories of results - good to bad.  Selecting a 'bin' will zoom the line chart into that category of result.  Hovering over a bin will tell you what % of overall results as well as the range of values is in each bin.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
