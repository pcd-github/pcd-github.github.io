import * as d3 from "d3";

export const portfolioValueTextID = 'portfoliovaluetext';
const perRunClass = 'perrundata';
const failureColorString = 'Red';
const lowValueColorString = 'Orange';
const highValueColorString = 'LimeGreen';
const maxValueColorString = 'ForestGreen';
const midValueColorString = 'DarkKhaki';
const portfolioLineClass = 'portfolioline';
const startValueMargin = 0.25;
const thresholdValues = [0, 1 - startValueMargin, 1 + startValueMargin, 3, 20];
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

