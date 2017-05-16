angular.module("starter")
    .controller("CheckCtrl",function ($scope,$interval,$http,$timeout) {
        //yuan
        $scope.src1='img/pan_icon3@2x.png';
        //zhuan
        $scope.src2 = "img/huxian_icon3@2x.png";
         $scope.scoreNum =0;
         var num1=0;
        var inter;//定时器；
        var isadd=true;
        var isClic = false;//可否点击；
        // $scope.serious = true;
        $scope.rotating = function () {
            $scope.scoreNum =0;
            $scope.comment = '正在检测中';
            if (isClic){
                return;
            }
            isClic = true;//已点击过
            // console.log('点击一次');
            // $interval.cancel(inter);//取消定时器
            var rot = document.querySelector(".round2");
            inter = $interval(function () {
                // console.log($scope.scoreNum)
                num1++;
                rot.style.transform = "rotate("+num1*3+"deg)";

            },0.0001);
            $timeout(function () {
                $http.get('http://115.28.21.7:8060/web/user/diagnose_report.do?token=dc698d58fe1b4a72a2577651edf4de80&userType=1')
                    .success(function (data) {
                        console.log(data);
                        var $diagnoseReport = data.data.diagnoseReport;
                        if (data.code==200){
                            $interval.cancel(inter);
                            var inte = $interval(function () {
                                $scope.scoreNum++;
                                 if ($scope.scoreNum ==$diagnoseReport.score){
                                    $scope.scoreNum = $diagnoseReport.score;
                                    $interval.cancel(inte);
                                }
                            },10);
                            $timeout(function () {
                                isClic = false;
                                $scope.warntip =true;
                                $scope.isjie =true;//显示解决按钮
                                $scope.comment =$diagnoseReport.comment;
                                // $scope.scoreNum = $diagnoseReport.score;
                                $scope.warntip = $diagnoseReport.warntip
                                $scope.advice = $diagnoseReport.advice;
                                if (0<$scope.scoreNum && $scope.scoreNum<=30){
                                    // $scope.scoreNum = 30;
                                    $scope.src1='img/pan_icon3@2x.png';
                                    $scope.src2 = "img/huxian_icon3@2x.png";
                                    $scope.serious = true;
                                    $scope.dangerous = false;
                                    $scope.general = false;
                                    $scope.good = false;
                                    console.log('ddd')
                                }else
                                if (30<$scope.scoreNum && $scope.scoreNum<=60){
                                    // $scope.scoreNum = 60;
                                    $scope.src1='img/pan_icon2@2x.png';
                                    $scope.src2 = "img/huxian_icon2@2x.png";
                                    $scope.dangerous = true;
                                    $scope.general = false;
                                    $scope.good = false;
                                }else
                                if (60<$scope.scoreNum && $scope.scoreNum <=80){
                                    // $scope.scoreNum = 80;
                                    $scope.src1='img/pan_icon@2x.png';
                                    $scope.src2 = "img/huxian_icon@2x.png";
                                    $scope.general = true;
                                    $scope.good = false;
                                }else
                                if (80<$scope.scoreNum && $scope.scoreNum <=100){
                                    // $scope.scoreNum = 90;
                                    $scope.good = true;
                                    $scope.serious = false;
                                    $scope.src1='img/pan_icon1@2x.png';
                                    $scope.src2 = "img/huxian_icon1@2x.png";
                                }

                            },1000)

                        }


                    })

            },2000)

        };

    })

