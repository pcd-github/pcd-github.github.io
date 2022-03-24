import * as d3 from "d3";

export const getAvgEquityReturn = () => {
    return d3.mean(histData, (d) => d.equity);
}

export const getStdDevEquityReturn = () => {
    return d3.deviation(histData, (d) => d.equity);
}

export const calcBondYield = (bondStake, histIndex) => {
        
    var retValue = 0;

    // if we're at the end of the cycle, use the simplified calculation
    if (histData.length <= (histIndex + 1)) {
        retValue = bondStake * histData[histIndex].bonds;
    }
    else {
        var bg1 = (1 - Math.pow(1 + histData[histIndex + 1].bonds, -9 ))
                  * histData[histIndex].bonds;
        bg1 = bg1 / histData[histIndex + 1].bonds;
        
        var bg2 = 1 / Math.pow(1 + histData[histIndex + 1].bonds, 9);
        bg2 = bg2 - 1;

        retValue = bondStake * (bg1 + bg2 + histData[histIndex].bonds);
    }

    return retValue;
}

export const findHistStartIndex = (startDataYear) => {
    const firstYear = histData[0].year;
    const offset = startDataYear - firstYear;

    return offset;
}

export const histData = [
    {
        year: 1871, cpi: 12.46, dividends: 0.05855856,
        bonds: 0.0532, gold: 0.02656043, equity: 0.09459459
    },
    {
        year: 1872, cpi: 12.65, dividends: 0.05417695,
        bonds: 0.0536, gold: -0.01940492, equity: 0.05144033
    },
    {
        year: 1873, cpi: 12.94, dividends: 0.05919765,
        bonds: 0.0558, gold: 0.01539138, equity: -0.08806262
    },
    {
        year:1874, cpi: 12.37, dividends: 0.07081545,
        bonds: 0.0547, gold: 0.01948896, equity: -0.02575107
    },
    {
        year:1875, cpi: 11.51, dividends: 0.07213656,
        bonds: 0.0507, gold: -0.0526763, equity: -0.01762115
    },
    {
        year:1876, cpi: 10.85, dividends: 0.06726457,
        bonds: 0.0459, gold: -0.0470852, equity: -0.20403587
    },
    {
        year:1877, cpi: 10.94, dividends: 0.08191549,
        bonds: 0.0445, gold: -0.02635294, equity: -0.08450704
    },
    {
        year:1878, cpi: 9.23, dividends: 0.05821538,
        bonds: 0.0434, gold: -0.00096665, equity: 0.10153846
    },
    {
        year:1879, cpi: 8.28, dividends: 0.05075419,
        bonds: 0.0422, gold: 0, equity: 0.4273743
    },
    {
        year:1880, cpi: 9.99, dividends: 0.04011742,
        bonds: 0.0402, gold: 0, equity: 0.21135029
    },
    {
        year:1881, cpi: 9.42, dividends: 0.04281099,
        bonds: 0.037, gold: 0, equity: -0.04361874
    },
    {
        year:1882, cpi: 10.18, dividends: 0.05405405,
        bonds: 0.0362, gold: 0, equity: -0.01858108
    },
    {
        year:1883, cpi: 9.99, dividends: 0.05521515,
        bonds: 0.0363, gold: 0, equity: -0.10843373
    },
    {
        year:1884, cpi: 9.23, dividends: 0.06337838,
        bonds: 0.0362, gold: 0, equity: -0.18146718
    },
    {
        year:1885, cpi: 8.28, dividends: 0.07174528,
        bonds: 0.0352, gold: 0, equity: 0.22641509
    },
    {
        year:1886, cpi: 7.99, dividends: 0.04582692,
        bonds: 0.0337, gold: 0, equity: 0.07307692
    },
    {
        year:1887, cpi: 7.99, dividends: 0.03987455,
        bonds: 0.0352, gold: 0, equity: -0.0483871
    },
    {
        year:1888, cpi: 8.37, dividends: 0.04676083,
        bonds: 0.0367, gold: 0, equity: -0.01318267
    },
    {
        year:1889, cpi: 7.99, dividends: 0.04374046,
        bonds: 0.0345, gold: 0, equity: 0.02671756
    },
    {
        year:1890, cpi: 7.61, dividends: 0.04089219,
        bonds: 0.0342, gold: 0, equity: -0.10037175
    },
    {
        year:1891, cpi: 7.8, dividends: 0.04545455,
        bonds: 0.0362, gold: 0, equity: 0.13842975
    },
    {
        year:1892, cpi: 7.33, dividends: 0.04023593,
        bonds: 0.036, gold: 0, equity: 0.01814882
    },
    {
        year:1893, cpi: 7.9, dividends: 0.04292335,
        bonds: 0.0375, gold: 0, equity: -0.22994652
    },
    {
        year:1894, cpi: 6.85, dividends: 0.05710648,
        bonds: 0.037, gold: 0, equity: -0.0162037
    },
    {
        year:1895, cpi: 6.57, dividends: 0.04901176,
        bonds: 0.0346, gold: 0, equity: 0.00470588
    },
    {
        year:1896, cpi: 6.66, dividends: 0.04430913,
        bonds: 0.036, gold: 0, equity: -0.0117096
    },
    {
        year:1897, cpi: 6.47, dividends: 0.04265403,
        bonds: 0.034, gold: 0, equity: 0.1563981
    },
    {
        year:1898, cpi: 6.66, dividends: 0.03723361,
        bonds: 0.0335, gold: 0, equity: 0.24590164
    },
    {
        year:1899, cpi: 6.76, dividends: 0.03302632,
        bonds: 0.031, gold: 0, equity: 0.00328947
    },
    {
        year:1900, cpi: 7.9, dividends: 0.03565574,
        bonds: 0.0315, gold: 0, equity: 0.15901639
    },
    {
        year:1901, cpi: 7.71, dividends: 0.04267327,
        bonds: 0.031, gold: 0, equity: 0.14851485
    },
    {
        year:1902, cpi: 7.9, dividends: 0.03950739,
        bonds: 0.0318, gold: 0, equity: 0.04187192
    },
    {
        year:1903, cpi: 8.66, dividends: 0.03920804,
        bonds: 0.033, gold: 0, equity: -0.21040189
    },
    {
        year:1904, cpi: 8.28, dividends: 0.0519012,
        bonds: 0.034, gold: 0, equity: 0.26197605
    },
    {
        year:1905, cpi: 8.47, dividends: 0.03697509,
        bonds: 0.0348, gold: 0, equity: 0.17081851
    },
    {
        year:1906, cpi: 8.47, dividends: 0.03402229,
        bonds: 0.0343, gold: 0, equity: -0.03140831
    },
    {
        year:1907, cpi: 8.85, dividends: 0.04218619,
        bonds: 0.0367, gold: 0, equity: -0.2834728
    },
    {
        year:1908, cpi: 8.66, dividends: 0.06375182,
        bonds: 0.0387, gold: 0, equity: 0.32262774
    },
    {
        year:1909, cpi: 8.94, dividends: 0.04451435,
        bonds: 0.0376, gold: 0, equity: 0.11258278
    },
    {
        year:1910, cpi: 9.9, dividends: 0.04389881,
        bonds: 0.0391, gold: 0, equity: -0.08035714
    },
    {
        year:1911, cpi: 9.23, dividends: 0.05070119,
        bonds: 0.0398, gold: 0, equity: -0.01618123
    },
    {
        year:1912, cpi: 9.13, dividends: 0.05162281,
        bonds: 0.0401, gold: 0, equity: 0.01973684
    },
    {
        year:1913, cpi: 9.8, dividends: 0.0516129,
        bonds: 0.0445, gold: 0, equity: -0.1
    },
    {
        year:1914, cpi: 10, dividends: 0.0567503,
        bonds: 0.0416, gold: 0, equity: -0.10633214
    },
    {
        year:1915, cpi: 10.1, dividends: 0.05625668,
        bonds: 0.0424, gold: 0, equity: 0.2473262
    },
    {
        year:1916, cpi: 10.4, dividends: 0.04724544,
        bonds: 0.0405, gold: 0, equity: 0.02572347
    },
    {
        year:1917, cpi: 11.7, dividends: 0.05964472,
        bonds: 0.0423, gold: 0, equity: -0.24660397
    },
    {
        year:1918, cpi: 14, dividends: 0.09431345,
        bonds: 0.0457, gold: 0, equity: 0.0887656
    },
    {
        year:1919, cpi: 16.5, dividends: 0.07219108,
        bonds: 0.045, gold: 0, equity: 0.12484076
    },
    {
        year:1920, cpi: 19.3, dividends: 0.05983012,
        bonds: 0.0497, gold: 0, equity: -0.19479049
    },
    {
        year:1921, cpi: 19, dividends: 0.07113924,
        bonds: 0.0509, gold: 0, equity: 0.02672293
    },
    {
        year:1922, cpi: 16.9, dividends: 0.06358904,
        bonds: 0.043, gold: 0, equity: 0.21917808
    },
    {
        year:1923, cpi: 16.8, dividends: 0.05749438,
        bonds: 0.0436, gold: 0, equity: -0.00786517
    },
    {
        year:1924, cpi: 17.3, dividends: 0.06021518,
        bonds: 0.0406, gold: 0, equity: 0.198188
    },
    {
        year:1925, cpi: 17.3, dividends: 0.05238185,
        bonds: 0.0386, gold: 0, equity: 0.19565217
    },
    {
        year:1926, cpi: 17.9, dividends: 0.04802372,
        bonds: 0.0368, gold: 0, equity: 0.05928854
    },
    {
        year:1927, cpi: 17.5, dividends: 0.05199254,
        bonds: 0.0334, gold: 0, equity: 0.30820896
    },
    {
        year:1928, cpi: 17.3, dividends: 0.0443069,
        bonds: 0.0333, gold: 0, equity: 0.41814033
    },
    {
        year:1929, cpi: 17.1, dividends: 0.03459372,
        bonds: 0.036, gold: 0, equity: -0.12670957
    },
    {
        year:1930, cpi: 17.1, dividends: 0.04471672,
        bonds: 0.0329, gold: 0, equity: -0.26393367
    },
    {
        year:1931, cpi: 15.9, dividends: 0.06049437,
        bonds: 0.0334, gold: 0, equity: -0.48060075
    },
    {
        year:1932, cpi: 14.3, dividends: 0.09557831,
        bonds: 0.0368, gold: 0.56361877, equity: -0.14578313
    },
    {
        year:1933, cpi: 12.9, dividends: 0.06981664,
        bonds: 0.0331, gold: 0.08292079, equity: 0.48660085
    },
    {
        year:1934, cpi: 13.2, dividends: 0.04182163,
        bonds: 0.0312, gold: 0, equity: -0.12144213
    },
    {
        year:1935, cpi: 13.6, dividends: 0.04859611,
        bonds: 0.0279, gold: 0, equity: 0.48596112
    },
    {
        year:1936, cpi: 13.8, dividends: 0.03488372,
        bonds: 0.0265, gold: 0, equity: 0.27834302
    },
    {
        year:1937, cpi: 14.1, dividends: 0.04150085,
        bonds: 0.0268, gold: 0, equity: -0.35702103
    },
    {
        year:1938, cpi: 14.2, dividends: 0.07014439,
        bonds: 0.0256, gold: 0, equity: 0.10521662
    },
    {
        year:1939, cpi: 14, dividends: 0.04106664,
        bonds: 0.0236, gold: -0.01428571, equity: -0.016
    },
    {
        year:1940, cpi: 13.9, dividends: 0.05067748,
        bonds: 0.0221, gold: 0.02898551, equity: -0.14227642
    },
    {
        year:1941, cpi: 14.1, dividends: 0.06382303,
        bonds: 0.0195, gold: 0, equity: -0.1535545
    },
    {
        year:1942, cpi: 15.7, dividends: 0.07876069,
        bonds: 0.0246, gold: 0.02816901, equity: 0.12989922
    },
    {
        year:1943, cpi: 16.9, dividends: 0.05847374,
        bonds: 0.0247, gold: -0.00684932, equity: 0.17443013
    },
    {
        year:1944, cpi: 17.4, dividends: 0.05175806,
        bonds: 0.0248, gold: 0.02758621, equity: 0.13839662
    },
    {
        year:1945, cpi: 17.8, dividends: 0.04768962,
        bonds: 0.0237, gold: 0.02684564, equity: 0.3358043
    },
    {
        year:1946, cpi: 18.2, dividends: 0.03699595,
        bonds: 0.0219, gold: 0.12418301, equity: -0.15593785
    },
    {
        year:1947, cpi: 21.5, dividends: 0.04689895,
        bonds: 0.0225, gold: -0.02325581, equity: -0.02498356
    },
    {
        year:1948, cpi: 23.7, dividends: 0.05686669,
        bonds: 0.0244, gold: -0.03571429, equity: 0.03573837
    },
    {
        year:1949, cpi: 24, dividends: 0.06163197,
        bonds: 0.0231, gold: -0.00617284, equity: 0.09895833
    },
    {
        year:1950, cpi: 23.5, dividends: 0.06812796,
        bonds: 0.0232, gold: -0.00621118, equity: 0.25651659
    },
    {
        year:1951, cpi: 25.4, dividends: 0.07009288,
        bonds: 0.0257, gold: -0.0325, equity: 0.14049976
    },
    {
        year:1952, cpi: 26.5, dividends: 0.05842621,
        bonds: 0.0268, gold: -0.08268734, equity: 0.0822654
    },
    {
        year:1953, cpi: 26.6, dividends: 0.05385791,
        bonds: 0.0283, gold: -0.00704225, equity: -0.02750191
    },
    {
        year:1954, cpi: 26.9, dividends: 0.05721406,
        bonds: 0.0248, gold: -0.00283688, equity: 0.3982718,
            },
    {
        year:1955, cpi: 26.7, dividends: 0.04344579,
        bonds: 0.0261, gold: 0.00142248, equity: 0.24016854
    },
    {
        year:1956, cpi: 26.8, dividends: 0.03782559,
        bonds: 0.029, gold: 0.00142046, equity: 0.02899207
    },
    {
        year:1957, cpi: 27.6, dividends: 0.03822738,
        bonds: 0.0346, gold: 0, equity: -0.09487123
    },
    {
        year:1958, cpi: 28.6, dividends: 0.04336892,
        bonds: 0.0309, gold: 0, equity: 0.35262646
    },
    {
        year:1959, cpi: 29, dividends: 0.03158342,
        bonds: 0.0402, gold: 0.03546099, equity: 0.04332974
    },
    {
        year:1960, cpi: 29.3, dividends: 0.03216733,
        bonds: 0.0472, gold: -0.02739726, equity: 0.02912287
    },
    {
        year:1961, cpi: 29.8, dividends: 0.03259662,
        bonds: 0.0384, gold: -0.00422535, equity: 0.15656397
    },
    {
        year:1962, cpi: 30, dividends: 0.02934226,
        bonds: 0.0408, gold: -0.00282885, equity: -0.05805704
    },
    {
        year:1963, cpi: 30.4, dividends: 0.03284153,
        bonds: 0.0383, gold: 0.00283688, equity: 0.17506917
    },
    {
        year:1964, cpi: 30.9, dividends: 0.03004147,
        bonds: 0.0417, gold: 0.00424328, equity: 0.1264879
    },
    {
        year:1965, cpi: 31.2, dividends: 0.02922283,
        bonds: 0.0419, gold: -0.0028169, equity: 0.08360427
    },
    {
        year:1966, cpi: 31.8, dividends: 0.02936134,
        bonds: 0.0461, gold: 0.00282486, equity: -0.09504929
    },
    {
        year:1967, cpi: 32.9, dividends: 0.03410302,
        bonds: 0.0458, gold: 0.22535211, equity: 0.12539964
    },
    {
        year:1968, cpi: 34.1, dividends: 0.03082912,
        bonds: 0.0553, gold: -0.05747126, equity: 0.07323232
    },
    {
        year:1969, cpi: 35.6, dividends: 0.03019608,
        bonds: 0.0604, gold: -0.05121951, equity: -0.11460784
    },
    {
        year:1970, cpi: 37.8, dividends: 0.03502746,
        bonds: 0.0779, gold: 0.14652956, equity: 0.03521205
    },
    {
        year:1971, cpi: 39.8, dividends: 0.03347952,
        bonds: 0.0624, gold: 0.43139014, equity: 0.10493101
    },
    {
        year:1972, cpi: 41.1, dividends: 0.02971926,
        bonds: 0.0595, gold: 0.6679198, equity: 0.14617619
    },
    {
        year:1973, cpi: 42.6, dividends: 0.02666106,
        bonds: 0.0646, gold: 0.72586401, equity: -0.18826014
    },
    {
        year:1974, cpi: 46.6, dividends: 0.03537613,
        bonds: 0.0699, gold: -0.24204168, equity: -0.24503173
    },
    {
        year:1975, cpi: 52.1, dividends: 0.04993564,
        bonds: 0.075, gold: -0.03962955, equity: 0.33489526
    },
    {
        year:1976, cpi: 55.6, dividends: 0.03802736,
        bonds: 0.0774, gold: 0.2043059, equity: 0.0716498
    },
    {
        year:1977, cpi: 58.5, dividends: 0.03946696,
        bonds: 0.0721, gold: 0.29174426, equity: -0.1305395
    },
    {
        year:1978, cpi: 62.5, dividends: 0.05222526,
        bonds: 0.0796, gold: 0.99999999, equity: 0.10481994
    },
    {
        year:1979, cpi: 68.3, dividends: 0.05128202,
        bonds: 0.091, gold: 0.29607843, equity: 0.11222545
    },
    {
        year:1980, cpi: 77.8, dividends: 0.05139766,
        bonds: 0.108, gold: -0.32761809, equity: 0.19927863
    },
    {
        year:1981, cpi: 87, dividends: 0.04661654,
        bonds: 0.1257, gold: 0.1175, equity: -0.11804511
    },
    {
        year:1982, cpi: 94.3, dividends: 0.05677749,
        bonds: 0.1459, gold: -0.14988814, equity: 0.23017903
    },
    {
        year:1983, cpi: 97.8, dividends: 0.04770152,
        bonds: 0.1046, gold: -0.18947368, equity: 0.15315315
    },
    {
        year:1984, cpi: 101.9, dividends: 0.04278846,
        bonds: 0.1167, gold: 0.06168831, equity: 0.03125
    },
    {
        year:1985, cpi: 105.5, dividends: 0.04413362,
        bonds: 0.1138, gold: 0.19541284, equity: 0.21328671
    },
    {
        year:1986, cpi: 109.6, dividends: 0.03813641,
        bonds: 0.0919, gold: 0.24456383, equity: 0.27041306
    },
    {
        year:1987, cpi: 111.2, dividends: 0.03137996,
        bonds: 0.0708, gold: -0.15693731, equity: -0.05293006
    },
    {
        year:1988, cpi: 115.7, dividends: 0.03535597,
        bonds: 0.0867, gold: -0.02230891, equity: 0.13932136
    },
    {
        year:1989, cpi: 121.1, dividends: 0.03438448,
        bonds: 0.0909, gold: -0.03690773, equity: 0.19120533
    },
    {
        year:1990, cpi: 127.4, dividends: 0.0327676,
        bonds: 0.0821, gold: -0.08557742, equity: -0.04259199
    },
    {
        year:1991, cpi: 134.6, dividends: 0.03719531,
        bonds: 0.0809, gold: -0.05705791, equity: 0.27831884
    },
    {
        year:1992, cpi: 138.1, dividends: 0.02941742,
        bonds: 0.0703, gold: 0.17642643, equity: 0.0460248
    },
    {
        year:1993, cpi: 142.6, dividends: 0.02852124,
        bonds: 0.066, gold: -0.02169751, equity: 0.08675873
    },
    {
        year:1994, cpi: 146.2, dividends: 0.0266883,
        bonds: 0.0575, gold: 0.00978474, equity: -0.01636398
    },
    {
        year:1995, cpi: 150.3, dividends: 0.02832886,
        bonds: 0.0778, gold: -0.04651163, equity: 0.32062332
    },
    {
        year:1996, cpi: 154.4, dividends: 0.02261206,
        bonds: 0.0565, gold: -0.22208672, equity: 0.24706227
    },
    {
        year:1997, cpi: 159.1, dividends: 0.01951567,
        bonds: 0.0658, gold: 0.00574813, equity: 0.25728903
    },
    {
        year:1998, cpi: 161.6, dividends: 0.01614142,
        bonds: 0.0554, gold: 0.0053689, equity: 0.29626516
    },
    {
        year:1999, cpi: 164.3, dividends: 0.0130395,
        bonds: 0.0472, gold: -0.06063738, equity: 0.14159533
    },
    {
        year:2000, cpi: 168.8, dividends: 0.0116256,
        bonds: 0.0666, gold: 0.01412067, equity: -0.0631037
    },
    {
        year:2001, cpi: 175.1, dividends: 0.01210665,
        bonds: 0.0516, gold: 0.23960217, equity: -0.14631298
    },
    {
        year:2002, cpi: 177.1, dividends: 0.01380155,
        bonds: 0.0504, gold: 0.21735959, equity: -0.21432017
    },
    {
        year:2003, cpi: 181.7, dividends: 0.01799428,
        bonds: 0.0405, gold: 0.04397843, equity: 0.26419896
    },
    {
        year:2004, cpi: 185.2, dividends: 0.01554056,
        bonds: 0.0415, gold: 0.17768595, equity: 0.04316922
    },
    {
        year:2005, cpi: 190.7, dividends: 0.01667781,
        bonds: 0.0422, gold: 0.23918129, equity: 0.08237614
    },
    {
        year:2006, cpi: 198.3, dividends: 0.0175252,
        bonds: 0.0442, gold: 0.31587227, equity: 0.11373003
    },
    {
        year:2007, cpi: 202.416, dividends: 0.01761272,
        bonds: 0.0476, gold: 0.03974895, equity: -0.03187844
    },
    {
        year:2008, cpi: 211.08, dividends: 0.02025008,
        bonds: 0.0374, gold: 0.2503593, equity: -0.37220401
    },
    {
        year:2009, cpi: 211.143, dividends: 0.0323598,
        bonds: 0.0252, gold: 0.30597701, equity: 0.29806604
    },
    {
        year:2010, cpi: 216.687, dividends: 0.01979684,
        bonds: 0.0373, gold: 0.07797923, equity: 0.14154755
    },
    {
        year:2011, cpi: 220.223, dividends: 0.01790346,
        bonds: 0.0339, gold: 0.08687133, equity: 0.01400259
    },
    {
        year:2012, cpi: 226.665, dividends: 0.02055749,
        bonds: 0.0197, gold: -0.27614183, equity: 0.13826139
    },
    {
        year:2013, cpi: 230.28, dividends: 0.0213028,
        bonds: 0.0191, gold: -0.00435866, equity: 0.22114293
    },
    {
        year:2014, cpi: 233.916, dividends: 0.01942536,
        bonds: 0.0286, gold: -0.11611424, equity: 0.1369433
    },
    {
        year:2015, cpi: 233.707, dividends: 0.019671167,
        bonds: 0.0188, gold: 0.17994340, equity: -0.054028735229542
		},
    {
        year:2016, cpi: 236.916, dividends: 0.02270058,
        bonds: 0.0209, gold: 0.00510098, equity: 0.18582299661672
		},
    {
        year:2017, cpi: 242.839, dividends: 0.020186481,
        bonds: 0.0243, gold: 0.00904448, equity: 0.226221034357374
		},
    {
        year:2018, cpi: 247.867, dividends: 0.017666738,
        bonds: 0.0258, gold: 0.09784074, equity: -0.065384615734383
		},
    {
        year:2019, cpi: 251.712, dividends: 0.020766616,
        bonds: 0.0271, gold: 0, equity: 0.257273694016446
    },
    {
        year:2020, cpi: 257.9710, dividends: 0.01790,
        bonds: 0.01760, gold: 0, equity: 0.157265
    },
    /*
    {
        year:2021, cpi: 261.58, dividends: ,
        bonds: 0.0108, gold: 0, equity: 
    },
    {
        year:2022, cpi: 281.15, dividends: ,
        bonds: 0.01760, gold: 0, equity: 
    },
    */
];
