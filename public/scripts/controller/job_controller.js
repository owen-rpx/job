/**
 * Created by XZhang21 on 5/17/2016.
 */
angular.module('jobController', ['jobService']).controller('NavController', function ($scope) {
    $scope.headerText = {
        sys: 'ERS系统',
        index: '首页',
        enterprise: '公司',
        login: '登录',
        register: '注册',
        logout: '退出',
        center: '用户'
    };

}).controller('LoginController', function ($scope, userSvc) {
    $scope.init = function () {
        $scope.user = {};
        console.log('init login ');
    };

    $scope.loginAction = function () {
        if (angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password)) {
            console.log("Need fill all inputs");
        } else {
            //Need register service to handle it.
            userSvc.loginUser($scope.user).then(function (result) {
                //console.dir(result);
                $scope.$emit('loginSuccess', result);
            });
        }

    };
    $scope.init();


}).controller('LogoutController', function ($scope, userSvc) {
    $scope.$emit('logoutUser', null);
    $scope.init = function () {
        $scope.user = {};
        console.log('init login ');
    };

    $scope.loginAction = function () {
        if (angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password)) {
            console.log("Need fill all inputs");
        } else {
            //Need register service to handle it.
            userSvc.loginUser($scope.user).then(function (result) {
                //console.dir(result);
                $scope.$emit('loginSuccess', result);
            });
        }

    };
    $scope.init();

}).controller('RegisterController', ['$scope', 'userSvc', function ($scope, userSvc) {

    $scope.init = function () {
        $scope.user = {};
    };

    $scope.registerAction = function () {
        if (angular.isUndefined($scope.user.email) || angular.isUndefined($scope.user.password) || angular.isUndefined($scope.user.type) || angular.isUndefined($scope.user.policy)) {
            console.log("Need fill all inputs");
        } else {
            //Need register service to handle it.
            console.log("RegisterUser");
            userSvc.registerUser($scope.user);
        }

    };
    $scope.init();

}]).controller('UserInfoController', function ($scope, $document, userSvc) {

    function init() {
        console.log("INIT^*");
        initUserInfo();
    }

    function initUserInfo() {
        userSvc.getUserInfo({id: $scope.userData.id}, function (info) {
            var dataObj = info;
            if (dataObj.s == 1) {
                console.log("initUserInfo");
                console.dir(dataObj.d);
                $scope.userInfo = angular.copy(dataObj.d);
            } else {
                $scope.userInfo = angular.copy($scope.userData);
            }
            userSvc.loadAddress(initAddress);
        });
    }

    function initAddress(address) {
        $scope.addressJSON = address;
        $scope.loadProvince();
        $scope.loadCity();
        $scope.loadDistrict();
    }


    $scope.loadProvince = function () {
        var address = $scope.addressJSON;
        var province = $document.find("#province");
        province.html("");
        for (var i = 0; address[i]; i++) {
            province.append("<option>" + address[i]["name"] + "</option>");
        }
        province.val($scope.userInfo.province);
    };
    $scope.loadCity = function () {
        var address = $scope.addressJSON;
        var city = $document.find("#city");
        var district = $document.find("#district");
        city.html("");
        district.show();
        district.html('<option value="">请选择</option>');
        var province = $scope.userInfo.province;
        if (province != "") {
            for (var i = 1; address[i]; i++) {
                if (province == address[i]["name"]) {
                    var cityArr = address[i]["sub"];
                    for (var j = 0; cityArr[j]; j++) {
                        city.append("<option>" + cityArr[j]["name"] + "</option>");
                    }
                }
            }
            city.val($scope.userInfo.city);
        }
    };
    $scope.loadDistrict = function () {
        var address = $scope.addressJSON;
        var district = $document.find("#district");
        district.html('');
        var province = $scope.userInfo.province;
        var city = $scope.userInfo.city;
        if (province != "" && city != "") {
            for (var i = 1; address[i]; i++) {
                if (province == address[i]["name"]) {
                    var cityArr = address[i]["sub"];
                    for (var j = 0; cityArr[j]; j++) {
                        if (city == cityArr[j]["name"]) {
                            var districtArr = cityArr[j]["sub"];
                            if (districtArr) {
                                for (var k = 0; districtArr[k]; k++) {
                                    district.append("<option>" + districtArr[k]["name"] + "</option>");
                                }
                            } else {
                                district.hide();
                            }
                        }

                    }
                }
            }
            district.val($scope.userInfo.district);
        }
    };
    $scope.updateUserInfo = function () {
        console.log($scope.userInfo);
        userSvc.updateUserInfo($scope.userInfo, function (r) {
            console.log("Finish updateUserInfo " + r);
        });
    };
    init();

}).controller('JobItemController', function ($scope, $location) {

}).controller('EnterpriseController', function ($scope, $location) {

});