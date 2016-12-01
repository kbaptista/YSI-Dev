angular.module('ChartCtrl',[]).controller('ChartController', function($scope, $rootScope, ProjectService, SprintService){
    function setDisplayMenu() {
        $rootScope.displayProjectMenu = true;
    }
    setDisplayMenu();
    var ctx = document.getElementById('myChart');

    $scope.projectName = ProjectService.getName();
    var project_id = $rootScope.projectId;
    var numberSprint = [];
    var sprintsIds = [];
    var expectedEffortSprint = [];
    var tmp = 0;

    function launchChart(callback){
        SprintService.getSprintFromProject(project_id).success(function(sprints){
            for(var i = 0; i < sprints.length; ++i){
                numberSprint.push(sprints[i].name);
                sprintsIds.push(sprints[i]._id);
            }

            for(var i = 0; i < sprintsIds.length; ++i){
                SprintService.getUsFromSprint(sprintsIds[i]).success(function(us){
                    tmp = 0;
                    for(var j = 0; j < us.length; ++j){
                        tmp += us[j].effort;
                        console.log(tmp + ' ' + j);
                    }
                    expectedEffortSprint.push(tmp);
                    //console.log(expectedEffortSprint);
                });
            }



        });
        callback(); // callback to be sure that array are build before the chart configuration
    }

    /** Construct the Chart only when data fetch **/
    /* expected = get effort of each us per sprint */
    /* real = get effort of each us DONE per sprint */
    launchChart(function(){
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
                        data: expectedEffortSprint,
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
                        data: [1, 2, 2, 4],
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
