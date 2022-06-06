import * as d3 from "d3";

export const portfolioValueTextID = 'portfoliovaluetext';
const perRunClass = 'perrundata';
const failureColorString = 'Red';
const lowValueColorString = 'Orange';
const highValueColorString = 'LimeGreen';
const maxValueColorString = 'ForestGreen';
const midValueColorString = 'DarkKhaki';
const portfolioLineClass = 'portfolioline';
const startValueMargin = 0.33;
const thresholdValues = [0, 1 - startValueMargin, 1 + startValueMargin, 5, 100];
const unselectedOpacity = 0.2;
const selectedOpacity = 1.0;
export const margin = { top: 20, right: 65, bottom: 40, left: 65 };
export const marginTranslate = "translate(" + margin.left + "," + margin.top + ")";

export const getSelectedOpacity = () => {
    return selectedOpacity;
}

export const getUnselectedOpacity = () => {
    return unselectedOpacity;
}

export const cleanupPrev = (perRunClassID) => {
    const perRunSelect = '.' + perRunClassID;
    d3.selectAll(perRunSelect).remove();
}

export const getPerRunClassName = () => {
    return perRunClass;
}

export const getPortfolioLineClassName = () => {
    return portfolioLineClass;
}

export const getFailureColorString = () => {
    return failureColorString;
}

export const getLowValueColorString = () => {
    return lowValueColorString;
}

export const getHighValueColorString = () => {
    return highValueColorString;
}

export const getMaxValueColorString = () => {
    return maxValueColorString;
}

export const getMidValueColorString = () => {
    return midValueColorString;
}

export const getThresholdValues = () => {
    return thresholdValues;
}

export const getColorStringForRelativeValue = (ratioValue) => {
    var retValue = midValueColorString;

    if (0 >= ratioValue) {
        retValue = getFailureColorString();
    }
    else if (ratioValue < (1 - startValueMargin)) {
        retValue = getLowValueColorString();
    }
    else if (ratioValue >= (1 + startValueMargin)) {
        if (ratioValue >= (thresholdValues[thresholdValues.length-2])) {
            retValue = getMaxValueColorString();
        }
        else {
            retValue = getHighValueColorString();
        }
    }

    return retValue;
}

export const findByID = (elementID) => {
    const selectID = '#' + elementID;
    return d3.select(selectID);
}

export const findByClass = (parent, className) => {
    const selectClass = '.' + className;
    return parent.selectAll(selectClass);
}

export const makeCurrency = (num) => {
    let dollarUSLocale = Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });
    return dollarUSLocale.format(num);
}

export const makePct = (num) => {
    return Number( num * 100).toFixed(2) + '%';
}

export const dumpCycleToCSV = (cycleData) => {
    const cycleLength = cycleData.length;
    const comma = ',';
    var dataset = [];

    // Header (field names)
    // cycle_starting_year,segment_number,year,
    // cumulative_cpi,starting_portfolio,inflation_adjusted_starting_portfolio,spending,inflation_adjusted_spending,sum_of_adjustments,fees,equities_start,equities_growth,equities_end,dividends,bonds_start,bonds_growth,bonds_end,cash_start,cash_growth,cash_end,gold_start,gold_growth,gold_end,ending_portfolio,inflation_adjusted_ending_portfolio
    // 1921,0,1921,1,2250000,2250000,105000,105000,0,4204.273498,1716000.0,45856.54008,1880568.058,122074.9367,364650.00,39690.08406,403625.3576,64350.00,160.8750,64384.74680,0,-0E-20,0E-20,2348578.163,2348578.163

    dataset = 'iteration, year, cumulativeCPI, beginValue, spend, actualSpend, equityReturn, equityAppr, bondReturn, bondAppr, divAppr, fees, endValue, adjEndValue\n';
    for (var i = 0; i < cycleLength; i++) {
        dataset += (i + comma
                    + cycleData[i].year + comma
                    + cycleData[i].cumulativeCPI + comma
                    + cycleData[i].beginValue + comma
                    + cycleData[i].spend + comma
                    + cycleData[i].actualSpend + comma
                    + cycleData[i].equityReturn + comma
                    + cycleData[i].equityAppr + comma
                    + cycleData[i].bondReturn + comma
                    + cycleData[i].bondAppr + comma
                    + cycleData[i].divAppr + comma
                    + cycleData[i].fees + comma
                    + cycleData[i].endValue + comma
                    + cycleData[i].adjEndValue + '\n'
                    );
    }
    return dataset;
}