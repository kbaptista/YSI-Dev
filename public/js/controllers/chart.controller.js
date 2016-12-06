angular.module('ChartCtrl',[]).controller('ChartController', function($scope, $rootScope, ProjectService, SprintService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();

    $scope.projectName = ProjectService.getName();
    var project_id = $rootScope.projectId;
    var numberSprint = [];
    var sprintsIds = [];
    var totalEffortAllSprints = 0;
    var requests = 0;

    var expectedEffortSprint = [];
    var doneEffortSprint = [];
    var tmpSum = 0;
    var sum = 0;
    var tmpDone = 0;



    SprintService.getSprintFromProject(project_id).success(function(sprints){
        for(var i = 0; i < sprints.length; ++i){
            numberSprint.push(sprints[i].name);
            sprintsIds.push(sprints[i]._id);
            sum += sprints[i].totalEffort;
        }
        numberSprint.unshift('Start');
        expectedEffortSprint.push(sum);
        doneEffortSprint.push(sum);

        tmpSum = sum;
        tmpDone = sum;
        SprintService.getSprintFromProject(project_id).success(function(sprints){
            for(var i = 0; i < sprints.length; ++i) {
                tmpSum -= sprints[i].totalEffort;
                tmpDone -= sprints[i].effortDone;
                expectedEffortSprint.push(tmpSum);
                doneEffortSprint.push(tmpDone);
            }
        });

        for(var i = 0; i < sprintsIds.length; ++i){
            ++requests;
            SprintService.getSprintById(sprintsIds[i]).success(function(sprintRes){
                totalEffortAllSprints += sprintRes.totalEffort;

                if(requests == sprintsIds.length) {
                    buildChart(expectedEffortSprint, doneEffortSprint);
                }
            });

        }
    });

    /** Construct the Chart only when data fetch **/
    /* expected = get effort of each us per sprint */
    /* real = get effort of each us DONE per sprint */

    function buildChart(totalEffort, doneEffort) {
        var ctx = document.getElementById('myChart');
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
                        data: totalEffort,
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
                        data: doneEffort,
                        spanGaps: false
                    }

                ]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

});
