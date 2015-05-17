'use strict';

angular.module('roastTron.roast.detail', [])

.controller(
  'roastDetailCtrl',
  ['$scope', '$routeParams', '$location', 'Roast',
  function($scope, $routeParams, $location, Roast) {

    // INIT -->
    $scope.chart = {
      data: []
    }
    
    if ($routeParams.id) {
      Roast.get($routeParams.id).$promise.then(function(response) {
        $scope.object = response;
        $scope.setData();
      }, function(error) {
        $location.path('/roast/')
      })
    }

    $scope.initChart = function() {
      $scope.chart.temperature = 'F'

      $scope.chart.config = {
        refreshDataOnly: true
      }

      $scope.chart.options = {
        chart: {
          type: "lineChart",
          height: 450,
          margin: {
            top: 20,
            right: 20,
            bottom: 40,
            left: 55
          },
          y: function(d) {
            return +d.y
          },
          useInteractiveGuideline: true,
          dispatch: {},
          xAxis: {
            axisLabel: "Time (seconds)"
          },
          yAxis: {
            axisLabel: "Temperature (" + $scope.temperature + ")",
            tickFormat: function(d){
              return d3.format('.01f')(d);
            },
            //"axisLabelDistance": 30
          },
          transitionDuration: 250,
        },
        title: {
          enable: true,
          text: "Profiles"
        }
      };

    }
    $scope.setData = function() {
      var chartData = {
          key: $scope.object.name,
          values: $scope.object.profile_data
        }
      if ($scope.chart.data.length) {
        $scope.chart.data[0] = chartData
      } else {
        $scope.chart.data.push(chartData)
      }
    }

    $scope.initChart();

    // <-- INIT

    // --> LISTENERS
    $scope.$on('roast.list.select', function(event, data) {
      $scope.object = data;
      $scope.setData();
    })
    // <-- LISTENERS

  }]
)