// first chart starts
const H = Highcharts,
  map = H.maps["countries/us/us-all"];

let chart;

// Add series with state capital bubbles
Highcharts.getJSON("state.json", function(json) {
  const data = json.map(p => {
    p.z = p.children;
    return p;
  });

  chart = Highcharts.mapChart("graphic-1", {
    title: {
      text: "Food Insecurity Rates per State"
    },
    subtitle: {
      text: "Source: Feeding America",
      y: 40
    },

    tooltip: {
      pointFormat:
        "State: {point.name}<br>" +
        "FIR: {point.fir}<br>" +
        "People: {point.people}"
    },

    xAxis: {
      crosshair: {
        zIndex: 5,
        dashStyle: "dot",
        snap: false,
        color: "gray"
      }
    },

    yAxis: {
      crosshair: {
        zIndex: 5,
        dashStyle: "dot",
        snap: false,
        color: "gray"
      }
    },
    mapNavigation: {
      enabled: true,
      enableDoubleClickZoom: true
    },
    series: [
      {
        name: "Basemap",
        mapData: map,
        borderColor: "#000",
        nullColor: "rgba(200, 200, 200, 0.2)",
        showInLegend: false
      },
      {
        name: "Separators",
        type: "mapline",
        data: H.geojson(map, "mapline"),
        color: "#101010",
        enableMouseTracking: false,
        showInLegend: false
      },
      {
        type: "mapbubble",

        name: "States",
        data: data,
        maxSize: "10%",
        color: "#154828"
      }
    ]
  });
});

// second chart
$(document).ready(function() {
  $("#container").highcharts({
    chart: {
      type: "bar"
    },
    title: {
      text: "States Surrounding Kansas Data"
    },
    subtitle: {
      text:
        'Source: <a href=" https://www.feedingamerica.org/research/map-the-meal-gap/by-county">Feeding America</a>'
    },
    xAxis: {
      categories: ["Colorado", "Kansas", "Missouri", "Nebraska", "Oklahoma"],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Food Insecurity (cases)",
        align: "high"
      },
      labels: {
        overflow: "justify"
      }
    },
    tooltip: {
      valueSuffix: " cases"
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      x: -10,
      y: 85,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: "Number of Insecure Persons",
        data: [566490, 368770, 813840, 237440, 594140],
        color: "#154828"
      }
    ]
  });

  // Second chart

  $("#container2").highcharts({
    chart: {
      type: "bar"
    },
    title: {
      text: "States Surrounding Kansas Data"
    },
    subtitle: {
      text:
        'Source: <a href=" https://www.feedingamerica.org/research/map-the-meal-gap/by-county">Feeding America</a>'
    },
    xAxis: {
      categories: ["Colorado", "Kansas", "Missouri", "Nebraska", "Oklahoma"],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Food Insecurity (cases)",
        align: "high"
      },
      labels: {
        overflow: "justify"
      }
    },
    tooltip: {
      valueSuffix: " cases"
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      x: -10,
      y: 85,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: "Number of Insecure Children",
        data: [155120, 129780, 209870, 79310, 208110],
        color: "#154828"
      }
    ]
  });

  jQuery(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function(e) {
    // on tab selection event
    jQuery("#container, #container").each(function() {
      var chart = jQuery(this).highcharts(); // target the chart itself
      chart.reflow(); // reflow that chart
    });
  });
});

//data table

$(document).ready(function() {
  $("#dt-table").DataTable({
    ajax: "food_insecurity.txt",
    columnDefs: [{
       targets: 3, 
       className: "text-right",
       width: "4%"
    },
    {
       targets: 4,
       className: "text-right",
    },
       {
       targets: 5,
       className: "text-right",
    }             
 ],
    columns: [
      {
        data: "fips"
      },
      {
        data: "county"
      },

      {
        data: "insecurity_rate",
        render: function(data, type, row, meta) {
          return type === "display"
            ? '<div style="position:absolute;left:0;>' + <progress value="' + data + '" max="100"></progress>' + '<p style="text-align:right;">' + data+ '%</p>' + '</div>'
            : data;
        }
      },
      {
        data: "insecure_persons "
      },
      {
        data: "insecure_kids"
      },
      {
        data: "2018_cpm "
      }
    ]
  });
});
