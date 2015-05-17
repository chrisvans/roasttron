'use strict';

angular.module('roastTron.roast.detail', [])


// .config([
//   '$routeProvider', 'staticPathProvider',
//   function($routeProvider, staticPathProvider) {
//     $routeProvider.when(
//       '/roast/:id',
//       {
//         controller: 'roastDetailCtrl',
//         templateUrl: staticPathProvider.path('roastTron/roast/detailView.html'),
//       }
//     );
//   }
// ])

.controller(
  'roastDetailCtrl',
  ['$rootScope', '$scope', '$stateParams', '$state', '$location', '$timeout', 'Roast', 'TempPoint',
  function($rootScope, $scope, $stateParams, $state, $location, $timeout, Roast, TempPoint) {

    // METHODS -->
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

    $scope.beginRecording = function() {

      var simulateProfile = function() {
        var currentReading = 1
        var currentTime = 1
        var tick = function() {
          TempPoint.save(
            {
              roast: $scope.object.id, 
              reading: currentReading, 
              time: currentTime
            }
          ).$promise.then(
            function(response) {
              currentReading = currentReading + 4
              currentTime = currentTime + 1
              if ($scope.recording) {
                $timeout(function() {
                  tick()
                }, 500)
              }
            }
          )
        }
        tick();
      }
      simulateProfile()
      // Replace with temppoint api call with filters to grab only relevant points
      var tick = function() {
        Roast.get($stateParams.id).$promise.then(function(response) {
          $scope.object.profile_data = response.profile_data
          $scope.setData();
          if ($scope.recording) {
            $timeout(function() {
              tick()
            }, 1000)
          }
        })
      }
      tick()
    }
    // <-- METHODS

    // INIT -->
    $scope.chart = {
      data: []
    }
    
    Roast.get($stateParams.id).$promise.then(function(response) {
      $scope.object = response;
      $scope.setData();
      if ($scope.recording) {
        $scope.beginRecording();
      }
    }, function(error) {
      $rootScope.$broadcast('roast.detail.error', error)
      $state.go('coffee.roast', {coffeeid: $stateParams.coffeeid})
    })

    $scope.initChart();

    // <-- INIT

    // LISTENERS -->
    $scope.$on('roast.detail.recording', function() {
      $scope.recording = true;
      if ($scope.object) {
        $scope.beginRecording();
      }
    })
    // <-- LISTENERS

  }]
)