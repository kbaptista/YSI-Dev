angular.module('ChartCtrl',[]).controller('ChartController', function($scope, $rootScope, ProjectService, SprintService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();
    var ctx = document.getElementById('myChart');

    $scope.projectName = ProjectService.getName();
    var project_id = $rootScope.projectId;
    var numberSprint = [];

    SprintService.getSprintFromProject(project_id).success(function(sprints){
        for(var i = 0; i < sprints.length; ++i){
            numberSprint.push(sprints[i].name);
        }

        /** Construct the Chart only when data fetch **/
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: numberSprint,
                datasets: [
                    {
                        label: "expected",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(48,131,255,0.8)",
                        borderColor: "rgba(48,131,255,0.8)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(48,112,255,0.9)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(48,112,255,0.9)",
                        pointHoverBorderColor: "rgba(48,112,255,0.9)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [90, 72, 54, 12],
                        spanGaps: false
                    },
                    {
                        label: "real",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(218,33,39,0.8)",
                        borderColor: "rgba(218,33,39,0.8)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(240,33,39,0.9)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(240,33,39,0.9)",
                        pointHoverBorderColor: "rgba(240,33,39,0.9)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [96, 82, 70, 34],
                        spanGaps: false
                    }

                ]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });


    });

});
