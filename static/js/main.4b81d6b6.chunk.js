(this.webpackJsonpswrve=this.webpackJsonpswrve||[]).push([[0],{220:function(e,t,d){},221:function(e,t,d){},229:function(e,t,d){},232:function(e,t,d){"use strict";d.r(t);var n=d(0),i=d.n(n),a=d(39),r=d.n(a),o=(d(220),d(268)),s=d(285),c=(d(221),d(62)),l=d(63),u=d(108),y=d(112),p=d(281),b=d(292),v=d(295),g=d(296),j=d(282),f=d(276),h=d(290),q=d(279),x=d(280),m=d(293),O=d(294),S=d(291),V=d(274),A=d(284),E=d(278),C=d(11),R=d(14),w=d(286),k=d(288),I=d(289),P="perrundata",D="DarkKhaki",M=[0,.5,1.5,3,20],B=function(){return P},N=function(e){var t=D;return 0>=e?t="Crimson":e<.5?t="Orange":e>=1.5&&(t=e>=M[M.length-2]?"DarkGreen":"ForestGreen"),t},L=function(e){var t="#"+e;return R.n(t)},F=function(e,t){var d="."+t;return e.selectAll(d)},_=function(e){return Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)},T=function(e){return Number(100*e).toFixed(2)+"%"},Y=d(1);var G=function(e){return n.useEffect((function(){}),[e]),Object(Y.jsx)("div",{children:Object(Y.jsxs)(o.a,{direction:"row",children:[Object(Y.jsx)(w.a,{children:Object(Y.jsxs)(k.a,{children:[Object(Y.jsx)(I.a,{gutterBottom:!0,variant:"h6",component:"h2",children:"Summary"}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:[T(1-e.fails/e.cycles)," success (",e.cycles-e.fails," / ",e.cycles,")"]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:[T(e.netpositivepct)," net positive years"]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["Median failure age : ",e.medianfailage]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["Minimum failure age : ",e.minfailage]})]})}),Object(Y.jsx)(w.a,{children:Object(Y.jsxs)(k.a,{children:[Object(Y.jsx)(I.a,{gutterBottom:!0,variant:"h6",component:"h2",children:"$ End Value"}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["median : ",_(e.medianendvalue)]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["mean : ",_(e.avgendvalue)]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["max : ",_(e.maxendvalue)]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["min : ",_(e.minendvalue)]})]})}),Object(Y.jsx)(w.a,{children:Object(Y.jsxs)(k.a,{children:[Object(Y.jsx)(I.a,{gutterBottom:!0,variant:"h6",component:"h2",children:"% Returns"}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["median : ",T(e.medianreturns)]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["mean : ",T(e.avgreturns)]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["max : ",T(e.maxreturns)]}),Object(Y.jsxs)(I.a,{variant:"body2",color:"textSecondary",component:"p",children:["min : ",T(e.minreturns)]})]})})]})})};var $=function(e){var t="endvaluechartsvg",d="ttevwrap",i="ttevback",a="ttevrange",r="ttevpct",o=B(),s=40,c=65,l="translate("+c+","+s+")",u=960-c-65,y=300-s-40,p=null,b=function(){var t=M,d=[];d[0]=0,d[1]=.01;for(var n=1;n<t.length;n++)d[n+1]=t[n]*e.startvalue;return d},v=function(t){var d=b(),n=function(t){return R.c().value((function(e){return e.adjEndCycleValue})).domain([t[0],t[t.length-1]]).thresholds(t)(e.metadata)}(d),i=function(){for(var e=b(),t=e.length,d=[],n=u/(t+1),i=0;i<=e.length;i++)d[i]=i*n;return R.m().domain(e).range(d)}(),a=R.l().domain([0,R.h(n,(function(e){return e.length}))]).range([y,0]);t.append("g").attr("class",o).attr("transform","translate(0,"+y+")").call(R.a(i)),t.append("g").attr("class",o).call(R.b(a)),t.append("g").attr("class",o).attr("id","pathgroupid").selectAll(".histobarclass").data(n).enter().append("rect").attr("class",o).attr("x",1).attr("transform",(function(e){return"translate("+i(e.x0)+","+a(e.length)+")"})).attr("width",(function(e){return i(e.x1)-i(e.x0)-1})).attr("height",(function(e){return y-a(e.length)})).style("fill",(function(t){return N(t.x0/e.startvalue)})).on("mousedown",j).on("mouseover",f).on("mouseout",q).on("mousemove",h)},g=function(){return L(d)},j=function(d){var n=d.srcElement.__data__.x0;p!==n?function(d,n){var i=n/e.startvalue,a=N(i),r=L(e.cyclechartid),o=L(t);F(r,"portfolioline").style("opacity",.1),F(r,a).style("opacity",1),o.selectAll("rect").style("opacity",.1),R.n(d).style("opacity",1),p=n}(d.srcElement,n):function(){var d=L(e.cyclechartid),n=L(t);F(d,"portfolioline").style("opacity",1),n.selectAll("rect").style("opacity",1),p=null}()},f=function(e){g().style("opacity",1)},h=function(t){var d,n=t.srcElement.__data__,o={binData:d=n,extBin:R.f(d,(function(e){return e.adjEndCycleValue})),extPctStartValue:R.f(d,(function(e){return e.pctOfStart})),binCount:d.length},s=_(+o.extBin[0])+"-"+_(+o.extBin[1]),c=" "+T(n.length/e.metadata.length)+" of cycles";L(a).text(s),L(r).text(c);var l=g().node().getBBox();L(i).attr("width",l.width).attr("height",l.height)},q=function(){g().style("opacity",0)};return n.useEffect((function(){var e=L(t).append("g").attr("transform",l);v(e),function(e){var t=e.append("g").attr("id",d).attr("class",o).style("opacity",0);t.append("rect").style("opacity",.7).attr("id",i).attr("width",75).attr("height",75).attr("pointer-events","none").attr("fill","#e8e8e8");var n=t.append("g").append("text").attr("pointer-events","none").attr("font-weight",900).attr("text-anchor","left");n.append("tspan").attr("id",a).attr("x","5").attr("y","5").attr("dy","15px").attr("pointer-events","none"),n.append("tspan").attr("id",r).attr("x","5").attr("y","5").attr("dy","30px").attr("pointer-events","none")}(e)}),[e]),Object(Y.jsx)("div",{children:Object(Y.jsx)("svg",{id:t,width:960,height:300})})},H=(d(229),[{year:1871,cpi:12.46,dividends:.05855856,bonds:.0532,gold:.02656043,equity:.09459459},{year:1872,cpi:12.65,dividends:.05417695,bonds:.0536,gold:-.01940492,equity:.05144033},{year:1873,cpi:12.94,dividends:.05919765,bonds:.0558,gold:.01539138,equity:-.08806262},{year:1874,cpi:12.37,dividends:.07081545,bonds:.0547,gold:.01948896,equity:-.02575107},{year:1875,cpi:11.51,dividends:.07213656,bonds:.0507,gold:-.0526763,equity:-.01762115},{year:1876,cpi:10.85,dividends:.06726457,bonds:.0459,gold:-.0470852,equity:-.20403587},{year:1877,cpi:10.94,dividends:.08191549,bonds:.0445,gold:-.02635294,equity:-.08450704},{year:1878,cpi:9.23,dividends:.05821538,bonds:.0434,gold:-96665e-8,equity:.10153846},{year:1879,cpi:8.28,dividends:.05075419,bonds:.0422,gold:0,equity:.4273743},{year:1880,cpi:9.99,dividends:.04011742,bonds:.0402,gold:0,equity:.21135029},{year:1881,cpi:9.42,dividends:.04281099,bonds:.037,gold:0,equity:-.04361874},{year:1882,cpi:10.18,dividends:.05405405,bonds:.0362,gold:0,equity:-.01858108},{year:1883,cpi:9.99,dividends:.05521515,bonds:.0363,gold:0,equity:-.10843373},{year:1884,cpi:9.23,dividends:.06337838,bonds:.0362,gold:0,equity:-.18146718},{year:1885,cpi:8.28,dividends:.07174528,bonds:.0352,gold:0,equity:.22641509},{year:1886,cpi:7.99,dividends:.04582692,bonds:.0337,gold:0,equity:.07307692},{year:1887,cpi:7.99,dividends:.03987455,bonds:.0352,gold:0,equity:-.0483871},{year:1888,cpi:8.37,dividends:.04676083,bonds:.0367,gold:0,equity:-.01318267},{year:1889,cpi:7.99,dividends:.04374046,bonds:.0345,gold:0,equity:.02671756},{year:1890,cpi:7.61,dividends:.04089219,bonds:.0342,gold:0,equity:-.10037175},{year:1891,cpi:7.8,dividends:.04545455,bonds:.0362,gold:0,equity:.13842975},{year:1892,cpi:7.33,dividends:.04023593,bonds:.036,gold:0,equity:.01814882},{year:1893,cpi:7.9,dividends:.04292335,bonds:.0375,gold:0,equity:-.22994652},{year:1894,cpi:6.85,dividends:.05710648,bonds:.037,gold:0,equity:-.0162037},{year:1895,cpi:6.57,dividends:.04901176,bonds:.0346,gold:0,equity:.00470588},{year:1896,cpi:6.66,dividends:.04430913,bonds:.036,gold:0,equity:-.0117096},{year:1897,cpi:6.47,dividends:.04265403,bonds:.034,gold:0,equity:.1563981},{year:1898,cpi:6.66,dividends:.03723361,bonds:.0335,gold:0,equity:.24590164},{year:1899,cpi:6.76,dividends:.03302632,bonds:.031,gold:0,equity:.00328947},{year:1900,cpi:7.9,dividends:.03565574,bonds:.0315,gold:0,equity:.15901639},{year:1901,cpi:7.71,dividends:.04267327,bonds:.031,gold:0,equity:.14851485},{year:1902,cpi:7.9,dividends:.03950739,bonds:.0318,gold:0,equity:.04187192},{year:1903,cpi:8.66,dividends:.03920804,bonds:.033,gold:0,equity:-.21040189},{year:1904,cpi:8.28,dividends:.0519012,bonds:.034,gold:0,equity:.26197605},{year:1905,cpi:8.47,dividends:.03697509,bonds:.0348,gold:0,equity:.17081851},{year:1906,cpi:8.47,dividends:.03402229,bonds:.0343,gold:0,equity:-.03140831},{year:1907,cpi:8.85,dividends:.04218619,bonds:.0367,gold:0,equity:-.2834728},{year:1908,cpi:8.66,dividends:.06375182,bonds:.0387,gold:0,equity:.32262774},{year:1909,cpi:8.94,dividends:.04451435,bonds:.0376,gold:0,equity:.11258278},{year:1910,cpi:9.9,dividends:.04389881,bonds:.0391,gold:0,equity:-.08035714},{year:1911,cpi:9.23,dividends:.05070119,bonds:.0398,gold:0,equity:-.01618123},{year:1912,cpi:9.13,dividends:.05162281,bonds:.0401,gold:0,equity:.01973684},{year:1913,cpi:9.8,dividends:.0516129,bonds:.0445,gold:0,equity:-.1},{year:1914,cpi:10,dividends:.0567503,bonds:.0416,gold:0,equity:-.10633214},{year:1915,cpi:10.1,dividends:.05625668,bonds:.0424,gold:0,equity:.2473262},{year:1916,cpi:10.4,dividends:.04724544,bonds:.0405,gold:0,equity:.02572347},{year:1917,cpi:11.7,dividends:.05964472,bonds:.0423,gold:0,equity:-.24660397},{year:1918,cpi:14,dividends:.09431345,bonds:.0457,gold:0,equity:.0887656},{year:1919,cpi:16.5,dividends:.07219108,bonds:.045,gold:0,equity:.12484076},{year:1920,cpi:19.3,dividends:.05983012,bonds:.0497,gold:0,equity:-.19479049},{year:1921,cpi:19,dividends:.07113924,bonds:.0509,gold:0,equity:.02672293},{year:1922,cpi:16.9,dividends:.06358904,bonds:.043,gold:0,equity:.21917808},{year:1923,cpi:16.8,dividends:.05749438,bonds:.0436,gold:0,equity:-.00786517},{year:1924,cpi:17.3,dividends:.06021518,bonds:.0406,gold:0,equity:.198188},{year:1925,cpi:17.3,dividends:.05238185,bonds:.0386,gold:0,equity:.19565217},{year:1926,cpi:17.9,dividends:.04802372,bonds:.0368,gold:0,equity:.05928854},{year:1927,cpi:17.5,dividends:.05199254,bonds:.0334,gold:0,equity:.30820896},{year:1928,cpi:17.3,dividends:.0443069,bonds:.0333,gold:0,equity:.41814033},{year:1929,cpi:17.1,dividends:.03459372,bonds:.036,gold:0,equity:-.12670957},{year:1930,cpi:17.1,dividends:.04471672,bonds:.0329,gold:0,equity:-.26393367},{year:1931,cpi:15.9,dividends:.06049437,bonds:.0334,gold:0,equity:-.48060075},{year:1932,cpi:14.3,dividends:.09557831,bonds:.0368,gold:.56361877,equity:-.14578313},{year:1933,cpi:12.9,dividends:.06981664,bonds:.0331,gold:.08292079,equity:.48660085},{year:1934,cpi:13.2,dividends:.04182163,bonds:.0312,gold:0,equity:-.12144213},{year:1935,cpi:13.6,dividends:.04859611,bonds:.0279,gold:0,equity:.48596112},{year:1936,cpi:13.8,dividends:.03488372,bonds:.0265,gold:0,equity:.27834302},{year:1937,cpi:14.1,dividends:.04150085,bonds:.0268,gold:0,equity:-.35702103},{year:1938,cpi:14.2,dividends:.07014439,bonds:.0256,gold:0,equity:.10521662},{year:1939,cpi:14,dividends:.04106664,bonds:.0236,gold:-.01428571,equity:-.016},{year:1940,cpi:13.9,dividends:.05067748,bonds:.0221,gold:.02898551,equity:-.14227642},{year:1941,cpi:14.1,dividends:.06382303,bonds:.0195,gold:0,equity:-.1535545},{year:1942,cpi:15.7,dividends:.07876069,bonds:.0246,gold:.02816901,equity:.12989922},{year:1943,cpi:16.9,dividends:.05847374,bonds:.0247,gold:-.00684932,equity:.17443013},{year:1944,cpi:17.4,dividends:.05175806,bonds:.0248,gold:.02758621,equity:.13839662},{year:1945,cpi:17.8,dividends:.04768962,bonds:.0237,gold:.02684564,equity:.3358043},{year:1946,cpi:18.2,dividends:.03699595,bonds:.0219,gold:.12418301,equity:-.15593785},{year:1947,cpi:21.5,dividends:.04689895,bonds:.0225,gold:-.02325581,equity:-.02498356},{year:1948,cpi:23.7,dividends:.05686669,bonds:.0244,gold:-.03571429,equity:.03573837},{year:1949,cpi:24,dividends:.06163197,bonds:.0231,gold:-.00617284,equity:.09895833},{year:1950,cpi:23.5,dividends:.06812796,bonds:.0232,gold:-.00621118,equity:.25651659},{year:1951,cpi:25.4,dividends:.07009288,bonds:.0257,gold:-.0325,equity:.14049976},{year:1952,cpi:26.5,dividends:.05842621,bonds:.0268,gold:-.08268734,equity:.0822654},{year:1953,cpi:26.6,dividends:.05385791,bonds:.0283,gold:-.00704225,equity:-.02750191},{year:1954,cpi:26.9,dividends:.05721406,bonds:.0248,gold:-.00283688,equity:.3982718},{year:1955,cpi:26.7,dividends:.04344579,bonds:.0261,gold:.00142248,equity:.24016854},{year:1956,cpi:26.8,dividends:.03782559,bonds:.029,gold:.00142046,equity:.02899207},{year:1957,cpi:27.6,dividends:.03822738,bonds:.0346,gold:0,equity:-.09487123},{year:1958,cpi:28.6,dividends:.04336892,bonds:.0309,gold:0,equity:.35262646},{year:1959,cpi:29,dividends:.03158342,bonds:.0402,gold:.03546099,equity:.04332974},{year:1960,cpi:29.3,dividends:.03216733,bonds:.0472,gold:-.02739726,equity:.02912287},{year:1961,cpi:29.8,dividends:.03259662,bonds:.0384,gold:-.00422535,equity:.15656397},{year:1962,cpi:30,dividends:.02934226,bonds:.0408,gold:-.00282885,equity:-.05805704},{year:1963,cpi:30.4,dividends:.03284153,bonds:.0383,gold:.00283688,equity:.17506917},{year:1964,cpi:30.9,dividends:.03004147,bonds:.0417,gold:.00424328,equity:.1264879},{year:1965,cpi:31.2,dividends:.02922283,bonds:.0419,gold:-.0028169,equity:.08360427},{year:1966,cpi:31.8,dividends:.02936134,bonds:.0461,gold:.00282486,equity:-.09504929},{year:1967,cpi:32.9,dividends:.03410302,bonds:.0458,gold:.22535211,equity:.12539964},{year:1968,cpi:34.1,dividends:.03082912,bonds:.0553,gold:-.05747126,equity:.07323232},{year:1969,cpi:35.6,dividends:.03019608,bonds:.0604,gold:-.05121951,equity:-.11460784},{year:1970,cpi:37.8,dividends:.03502746,bonds:.0779,gold:.14652956,equity:.03521205},{year:1971,cpi:39.8,dividends:.03347952,bonds:.0624,gold:.43139014,equity:.10493101},{year:1972,cpi:41.1,dividends:.02971926,bonds:.0595,gold:.6679198,equity:.14617619},{year:1973,cpi:42.6,dividends:.02666106,bonds:.0646,gold:.72586401,equity:-.18826014},{year:1974,cpi:46.6,dividends:.03537613,bonds:.0699,gold:-.24204168,equity:-.24503173},{year:1975,cpi:52.1,dividends:.04993564,bonds:.075,gold:-.03962955,equity:.33489526},{year:1976,cpi:55.6,dividends:.03802736,bonds:.0774,gold:.2043059,equity:.0716498},{year:1977,cpi:58.5,dividends:.03946696,bonds:.0721,gold:.29174426,equity:-.1305395},{year:1978,cpi:62.5,dividends:.05222526,bonds:.0796,gold:.99999999,equity:.10481994},{year:1979,cpi:68.3,dividends:.05128202,bonds:.091,gold:.29607843,equity:.11222545},{year:1980,cpi:77.8,dividends:.05139766,bonds:.108,gold:-.32761809,equity:.19927863},{year:1981,cpi:87,dividends:.04661654,bonds:.1257,gold:.1175,equity:-.11804511},{year:1982,cpi:94.3,dividends:.05677749,bonds:.1459,gold:-.14988814,equity:.23017903},{year:1983,cpi:97.8,dividends:.04770152,bonds:.1046,gold:-.18947368,equity:.15315315},{year:1984,cpi:101.9,dividends:.04278846,bonds:.1167,gold:.06168831,equity:.03125},{year:1985,cpi:105.5,dividends:.04413362,bonds:.1138,gold:.19541284,equity:.21328671},{year:1986,cpi:109.6,dividends:.03813641,bonds:.0919,gold:.24456383,equity:.27041306},{year:1987,cpi:111.2,dividends:.03137996,bonds:.0708,gold:-.15693731,equity:-.05293006},{year:1988,cpi:115.7,dividends:.03535597,bonds:.0867,gold:-.02230891,equity:.13932136},{year:1989,cpi:121.1,dividends:.03438448,bonds:.0909,gold:-.03690773,equity:.19120533},{year:1990,cpi:127.4,dividends:.0327676,bonds:.0821,gold:-.08557742,equity:-.04259199},{year:1991,cpi:134.6,dividends:.03719531,bonds:.0809,gold:-.05705791,equity:.27831884},{year:1992,cpi:138.1,dividends:.02941742,bonds:.0703,gold:.17642643,equity:.0460248},{year:1993,cpi:142.6,dividends:.02852124,bonds:.066,gold:-.02169751,equity:.08675873},{year:1994,cpi:146.2,dividends:.0266883,bonds:.0575,gold:.00978474,equity:-.01636398},{year:1995,cpi:150.3,dividends:.02832886,bonds:.0778,gold:-.04651163,equity:.32062332},{year:1996,cpi:154.4,dividends:.02261206,bonds:.0565,gold:-.22208672,equity:.24706227},{year:1997,cpi:159.1,dividends:.01951567,bonds:.0658,gold:.00574813,equity:.25728903},{year:1998,cpi:161.6,dividends:.01614142,bonds:.0554,gold:.0053689,equity:.29626516},{year:1999,cpi:164.3,dividends:.0130395,bonds:.0472,gold:-.06063738,equity:.14159533},{year:2e3,cpi:168.8,dividends:.0116256,bonds:.0666,gold:.01412067,equity:-.0631037},{year:2001,cpi:175.1,dividends:.01210665,bonds:.0516,gold:.23960217,equity:-.14631298},{year:2002,cpi:177.1,dividends:.01380155,bonds:.0504,gold:.21735959,equity:-.21432017},{year:2003,cpi:181.7,dividends:.01799428,bonds:.0405,gold:.04397843,equity:.26419896},{year:2004,cpi:185.2,dividends:.01554056,bonds:.0415,gold:.17768595,equity:.04316922},{year:2005,cpi:190.7,dividends:.01667781,bonds:.0422,gold:.23918129,equity:.08237614},{year:2006,cpi:198.3,dividends:.0175252,bonds:.0442,gold:.31587227,equity:.11373003},{year:2007,cpi:202.416,dividends:.01761272,bonds:.0476,gold:.03974895,equity:-.03187844},{year:2008,cpi:211.08,dividends:.02025008,bonds:.0374,gold:.2503593,equity:-.37220401},{year:2009,cpi:211.143,dividends:.0323598,bonds:.0252,gold:.30597701,equity:.29806604},{year:2010,cpi:216.687,dividends:.01979684,bonds:.0373,gold:.07797923,equity:.14154755},{year:2011,cpi:220.223,dividends:.01790346,bonds:.0339,gold:.08687133,equity:.01400259},{year:2012,cpi:226.665,dividends:.02055749,bonds:.0197,gold:-.27614183,equity:.13826139},{year:2013,cpi:230.28,dividends:.0213028,bonds:.0191,gold:-.00435866,equity:.22114293},{year:2014,cpi:233.916,dividends:.01942536,bonds:.0286,gold:-.11611424,equity:.1369433},{year:2015,cpi:233.707,dividends:.019671167,bonds:.0188,gold:.1799434,equity:-.054028735229542},{year:2016,cpi:236.916,dividends:.02270058,bonds:.0209,gold:.00510098,equity:.18582299661672},{year:2017,cpi:242.839,dividends:.020186481,bonds:.0243,gold:.00904448,equity:.226221034357374},{year:2018,cpi:247.867,dividends:.017666738,bonds:.0258,gold:.09784074,equity:-.065384615734383},{year:2019,cpi:251.712,dividends:.020766616,bonds:.0271,gold:0,equity:.257273694016446},{year:2020,cpi:257.971,dividends:.0179,bonds:.0176,gold:0,equity:.157265}]);var J=function(e){var t=Object(n.useState)([]),d=Object(C.a)(t,2),i=d[0],a=d[1],r=Object(n.useState)([]),o=Object(C.a)(r,2),s=o[0],c=o[1],l=Object(n.useState)(0),u=Object(C.a)(l,2),y=u[0],p=u[1],b=Object(n.useState)(0),v=Object(C.a)(b,2),g=v[0],j=v[1],f=Object(n.useState)(0),h=Object(C.a)(f,2),q=h[0],x=h[1],m=Object(n.useState)(0),O=Object(C.a)(m,2),S=O[0],V=O[1],A=Object(n.useState)(0),E=Object(C.a)(A,2),w=E[0],k=E[1],I=Object(n.useState)(0),P=Object(C.a)(I,2),D=P[0],M=P[1],F=Object(n.useState)(0),_=Object(C.a)(F,2),J=_[0],U=_[1],W=Object(n.useState)(0),z=Object(C.a)(W,2),K=z[0],Q=z[1],X=Object(n.useState)(0),Z=Object(C.a)(X,2),ee=Z[0],te=Z[1],de=Object(n.useState)(0),ne=Object(C.a)(de,2),ie=ne[0],ae=ne[1],re=Object(n.useState)(0),oe=Object(C.a)(re,2),se=oe[0],ce=oe[1],le=Object(n.useState)(0),ue=Object(C.a)(le,2),ye=ue[0],pe=ue[1],be=Object(n.useState)(0),ve=Object(C.a)(be,2),ge=ve[0],je=ve[1],fe="d3cycletarget",he=B(),qe="hoverLine",xe="ttwrapper",me="ttbackground",Oe="ttage",Se=40,Ve=65,Ae=960-Ve-65,Ee=500-Se-40,Ce="translate("+Ve+","+Se+")",Re=[],we=function(){var t=[e.currentage,e.lifeexpectancy];return R.l().domain(t).range([0,Ae])},ke=function(e,t,d,n,i){var a=he+" portfolioline "+n.lineColor;e.append("path").datum(i).attr("id",n.startYear).attr("class",a).attr("fill","none").attr("pointer-events","none").style("opacity",1).attr("stroke",n.lineColor).attr("stroke-width",1.5).attr("d",R.g().x((function(e){return t(e.age)})).y((function(e){return d(e.adjEndValue)})))},Ie=function(){return L(qe)},Pe=function(){return L(xe)},De=function(e,t){var d=0;if(H.length<=t+1)d=e*H[t].bonds;else{var n=(1-Math.pow(1+H[t+1].bonds,-9))*H[t].bonds;n/=H[t+1].bonds;var i=1/Math.pow(1+H[t+1].bonds,9);d=e*(n+(i-=1)+H[t].bonds)}return d},Me=function(e,t,d){var n=e.equityReturn*t+e.bondReturn*d;return isNaN(n)&&(1===t?n=e.equityReturn:1===d?n=e.bondReturn:(n=0,console.log("unexpected aggReturn result- equity :("+T(e.equityReturn)+","+T(t)+")  bond:("+T(e.bondReturn)+","+T(d)+")"))),n},Be=function(t,d){for(var n=[],i=+e.stockallocation/100,a=+e.bondallocation/100,r=+e.feepct/100,o=+e.ssage,s=+e.ssincome,c=H[t].cpi,l=0;l<d;l++){var u={year:H[t+l].year,age:+e.currentage+l,beginValue:l>0?n[l-1].endValue:+e.portfoliovalue,equityReturn:H[t+l].equity,equityAppr:0,divAppr:0,bondReturn:0,bondAppr:0,aggReturn:0,cumulativeCPI:H[t+l].cpi/c,spend:+e.spendvalue,actualSpend:+e.spendvalue,fees:0,netDelta:0,endValue:0,adjEndValue:0,appr:0,adjAppr:0};u.actualSpend=u.spend*u.cumulativeCPI;var y=o<=u.age?s*u.cumulativeCPI:0;if(u.actualSpend-=y,u.endValue=u.beginValue-u.actualSpend,!(0<u.endValue)){u.endValue=u.adjEndValue=0,n.push(u);break}var p=u.endValue*i;u.equityAppr=p*u.equityReturn,u.divAppr=p*H[t+l].dividends,u.bondAppr=De(u.endValue*a,t+l),u.bondReturn=u.bondAppr/(u.beginValue*a),u.aggReturn=Me(u,i,a),u.appr=u.equityAppr+u.divAppr+u.bondAppr,u.endValue+=u.appr,u.fees=(u.beginValue+u.appr)*r,u.endValue-=u.fees,u.netDelta=u.appr-u.actualSpend-u.fees,u.adjEndValue=u.endValue/u.cumulativeCPI,u.adjAppr=u.appr/u.cumulativeCPI,n.push(u)}return n},Ne=function(){for(var e=[],t=0;t<i.length;t++)for(var d=0;d<i[t].length;d++){var n=i[t][d];e.push(n.bondReturn)}return e},Le=function(t){var d=R.f(t,(function(e){return e.adjEndValue})),n=R.i(t,(function(e){return e.adjEndValue})),i=R.j(t,(function(e){return e.adjEndValue})),a=R.p(t,(function(e){return e.actualSpend})),r=R.p(t,(function(e){return e.appr})),o=R.p(t,(function(e){return e.adjAppr})),s=t[t.length-1].adjEndValue/e.portfoliovalue,c=N(s),l=R.f(t,(function(e){return e.aggReturn})),u=R.i(t,(function(e){return e.aggReturn})),y=R.j(t,(function(e){return e.aggReturn}));return{startCycleValue:e.portfoliovalue,endCycleValue:t[t.length-1].endValue,adjEndCycleValue:t[t.length-1].adjEndValue,extent:d,mean:n,median:i,pctOfStart:s,totalSpend:a,totalAppreciation:r,totalAdjAppreciation:o,extAggReturn:l,avgAggReturn:u,medAggReturn:y,fail:0>=t[t.length-1].adjEndValue,failAge:0>=t[t.length-1].adjEndValue?t.length+e.currentage:void 0,startYear:t[0].year,cycleData:t,lineColor:c}},Fe=function(t){var d=e.lifeexpectancy-e.currentage+1,n=e.startdatayear,i=e.enddatayear-n+2-d,r=function(e){return e-H[0].year}(n),o=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,l=[];R.o(".perrundata").remove();for(var u=0;u<i;u++){var y=Be(r+u,d),b=Le(y);Re[u]=b,l[u]=y,o=Math.min(o,b.extent[0]),s=Math.max(s,b.extent[1])}a(l),c(Re),function(t){for(var d=R.f(Re,(function(e){return e.adjEndCycleValue})),n=R.i(Re,(function(e){return e.adjEndCycleValue})),i=R.j(Re,(function(e){return e.adjEndCycleValue})),a=function(e){for(var t=[],d=0;d<e.length;d++)for(var n=0;n<e[d].length;n++){var i=e[d][n];t.push(i.aggReturn)}return t}(t),r=R.i(a),o=R.j(a),s=R.f(a),c=function(e){for(var t=[],d=0;d<e.length;d++)for(var n=0;n<e[d].length;n++){var i=e[d][n];t.push(i.netDelta)}return t}(t),l=function(e){for(var t=0,d=0;d<e.length;d++)0<e[d]&&t++;return t/e.length}(c),u=0,y=e.lifeexpectancy+1,b=[],v=0;v<Re.length;v++)Re[v].fail&&(y=Math.min(Re[v].failAge,y),b[u]=Re[v].failAge,u++);p(n),j(i),x(d[0]),V(d[1]),k(r),M(o),U(s[0]),Q(s[1]),te(l),ae(Re.length),ce(u),pe(y),je(R.j(b))}(l);var v=we(),g=function(e,t){var d=[e,t];return R.l().domain(d).range([Ee,0])}(o,s);for(function(e,t,d,n,i){e.append("g").attr("class",he).attr("transform","translate(0,"+Ee+")").call(R.a(t)),e.append("g").attr("class",he).call(R.b(d))}(t,v,g),u=0;u<i;u++)ke(t,v,g,Re[u],l[u])};return n.useEffect((function(){var e=L(fe).append("g").attr("transform",Ce);Fe(e),function(e){var t=e.append("g").attr("id",xe).attr("display","none");t.append("rect").style("opacity",.7).attr("id",me).attr("width",75).attr("height",75).attr("pointer-events","none").attr("fill","#e8e8e8");var d=t.append("g").append("text");d.attr("pointer-events","none").attr("font-weight",900).attr("text-anchor","left"),d.append("tspan").attr("id",Oe).attr("x","5").attr("y","5").attr("dy","15px").attr("pointer-events","none"),e.append("g").append("rect").style("opacity",0).attr("id",qe).attr("pointer-events","none").attr("class","dotted").attr("stroke-width","1px").attr("width",".5px").attr("height",Ee)}(e)}),[e]),Object(Y.jsxs)("div",{children:[Object(Y.jsx)(G,{fails:se,cycles:ie,minfailage:ye,medianfailage:ge,medianendvalue:g,avgendvalue:y,minendvalue:q,maxendvalue:S,medianreturns:D,avgreturns:w,minreturns:J,maxreturns:K,netpositivepct:ee}),Object(Y.jsx)("svg",{id:fe,width:960,height:500,children:Object(Y.jsx)("rect",{id:"trackingRect",style:{opacity:0},width:Ae,height:Ee,transform:Ce,fill:"LightGrey",onMouseDown:function(e){var t=Ne(),d=R.i(t),n=R.e(t);console.log("equity avg return:"+T(R.i(H,(function(e){return e.equity})))+" equity sdev:"+T(R.e(H,(function(e){return e.equity})))+" bond avg return:"+T(d)+" bond sdev:"+T(n))},onMouseEnter:function(e){Ie().style("opacity",1),Pe().attr("display",null)},onMouseMove:function(e){var t=R.d((function(e){return e.age})).left,d=we(),n=R.k(e),a=d.invert(n[0]),r=i[0],o=r[t(r,a,1)],s=d(o.age),c=s;Ae<=s+75&&(c=s-75),L(Oe).text("age: "+o.age);var l=Pe().node().getBBox();L(me).attr("width",l.width).attr("height",l.height),Pe().attr("transform","translate("+c+","+n[1]+")"),Ie().attr("x",s),Pe().attr("x",c)},onMouseLeave:function(){Ie().style("opacity",0),Pe().attr("display","none")}})}),Object(Y.jsx)($,{startvalue:e.portfoliovalue,minendvalue:q,maxendvalue:S,medianendvalue:g,metadata:s,cyclechartid:fe})]})},U=22e5,W=105e3,z=1871,K=2020,Q=function(e){Object(u.a)(d,e);var t=Object(y.a)(d);function d(e){var n;return Object(c.a)(this,d),(n=t.call(this,e)).state={currentAge:57,lifeExpectancy:95,portfolioValue:U,spendValue:W,spendModel:"dollars",stockAllocPct:80,feePct:.18,ssOn:!1,socialSecurityIncome:39312,socialSecurityAge:67,useAllHistData:!0,startDataYear:z,endDataYear:K,dataRange:[z,K]},n}return Object(l.a)(d,[{key:"render",value:function(){var e=this;return Object(Y.jsx)("div",{children:Object(Y.jsxs)(o.a,{direction:"row",children:[Object(Y.jsx)("div",{className:"Inputs",children:Object(Y.jsx)("header",{className:"Inputs-header",children:Object(Y.jsx)(g.a,{sx:{bgcolor:"background.paper",boxShadow:10,borderRadius:10,p:2,minWidth:300},children:Object(Y.jsxs)(h.a,{children:[Object(Y.jsx)(q.a,{children:Object(Y.jsx)(f.a,{required:!0,label:"Age",sx:{m:"10px"},type:"number",defaultValue:57,onChange:function(t){var d=+t.target.value;e.setState({currentAge:d})},InputLabelProps:{shrink:!0}})}),Object(Y.jsxs)(q.a,{children:[Object(Y.jsx)("div",{children:"Life Expectancy: "}),Object(Y.jsx)("div",{id:"lifeExpectDiv",children:this.state.lifeExpectancy})]}),Object(Y.jsx)(q.a,{divider:!0,children:Object(Y.jsx)(x.a,{id:"lifeExpectSlider",size:"small",label:"Life Expectancy",marks:!0,step:1,min:57,max:110,valueLabelDisplay:"auto",defaultValue:95,onChange:function(t,d){e.setState({lifeExpectancy:d})}})}),Object(Y.jsx)(q.a,{children:Object(Y.jsx)(f.a,{required:!0,sx:{m:"10px"},type:"number",label:"Portfolio Value $",defaultValue:U,onChange:function(t){var d=+t.target.value;e.setState({portfolioValue:d})}})}),Object(Y.jsx)(q.a,{divider:!0,children:Object(Y.jsx)(f.a,{required:!0,sx:{m:"10px"},type:"number",label:"Annual Spend $",defaultValue:W,onChange:function(t){var d=+t.target.value;e.setState({spendValue:d})}})}),Object(Y.jsxs)(q.a,{children:[Object(Y.jsx)("div",{children:"Stocks: "}),Object(Y.jsxs)("div",{id:"sAlloc",children:[this.state.stockAllocPct,"%"]}),Object(Y.jsx)("div",{children:"\xa0 Bonds: "}),Object(Y.jsxs)("div",{id:"bAlloc",children:[100-this.state.stockAllocPct,"%"]})]}),Object(Y.jsx)(q.a,{children:Object(Y.jsx)(x.a,{id:"aAlloc",label:"Stock Allocation",marks:!0,step:5,valueLabelDisplay:"auto",defaultValue:80,onChange:function(t){var d=+t.target.value;e.setState({stockAllocPct:d})}})}),Object(Y.jsx)(q.a,{divider:!0,children:Object(Y.jsx)(f.a,{required:!0,sx:{m:"10px"},type:"number",label:"Annual Fee %",defaultValue:.18,onChange:function(t){var d=+t.target.value;e.setState({feePct:d})}})}),Object(Y.jsx)(q.a,{children:Object(Y.jsxs)("div",{children:["Historical data from ",this.state.dataRange[0]," to ",this.state.dataRange[1]]})}),Object(Y.jsx)(q.a,{children:Object(Y.jsx)(x.a,{marks:!0,step:1,min:z,max:K,defaultValue:[z,K],valueLabelDisplay:"auto",onChange:function(t,d){e.setState({dataRange:d})}})}),Object(Y.jsx)(q.a,{children:Object(Y.jsxs)(p.a,{children:[Object(Y.jsx)(b.a,{children:Object(Y.jsx)(m.a,{children:Object(Y.jsx)(O.a,{control:Object(Y.jsx)(j.a,{}),label:"include Social Security income",onChange:function(t,d){e.setState({ssOn:d})}})})}),Object(Y.jsxs)(v.a,{children:[Object(Y.jsx)(f.a,{disabled:!this.state.ssOn,sx:{m:"10px"},type:"number",label:"Annual SS $",defaultValue:39312,onChange:function(t){var d=+t.target.value;e.setState({socialSecurityIncome:d})}}),Object(Y.jsxs)(S.a,{disabled:!this.state.ssOn,component:"fieldset",children:[Object(Y.jsx)(V.a,{component:"legend",children:"Start at age"}),Object(Y.jsxs)(A.a,{"aria-label":"ss-start",onChange:function(t){var d=+t.target.value;e.setState({socialSecurityAge:d})},row:!0,defaultValue:"67",name:"radio-buttons-group",children:[Object(Y.jsx)(O.a,{value:"62",control:Object(Y.jsx)(E.a,{}),label:"62"}),Object(Y.jsx)(O.a,{value:"67",control:Object(Y.jsx)(E.a,{}),label:"67"}),Object(Y.jsx)(O.a,{value:"70",control:Object(Y.jsx)(E.a,{}),label:"70"})]})]})]})]})})]})})})}),Object(Y.jsx)(J,{id:"chartComponent",currentage:this.state.currentAge,lifeexpectancy:this.state.lifeExpectancy,portfoliovalue:this.state.portfolioValue,spendvalue:this.state.spendValue,stockallocation:this.state.stockAllocPct,bondallocation:100-this.state.stockAllocPct,feepct:this.state.feePct,ssincome:this.state.ssOn?this.state.socialSecurityIncome:0,ssage:this.state.socialSecurityAge,startdatayear:this.state.dataRange[0],enddatayear:this.state.dataRange[1],ymin:"default",ymax:"default"})]})})}}]),d}(n.Component);var X=function(){return Object(Y.jsxs)(o.a,{spacing:5,children:[Object(Y.jsx)(s.a,{children:" SWR Calculator"}),Object(Y.jsx)(o.a,{direction:"row",children:Object(Y.jsx)(Q,{})})]})},Z=function(e){e&&e instanceof Function&&d.e(3).then(d.bind(null,298)).then((function(t){var d=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;d(e),n(e),i(e),a(e),r(e)}))};r.a.render(Object(Y.jsx)(i.a.StrictMode,{children:Object(Y.jsx)(X,{})}),document.getElementById("root")),Z()}},[[232,1,2]]]);
//# sourceMappingURL=main.4b81d6b6.chunk.js.map