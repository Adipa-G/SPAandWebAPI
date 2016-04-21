var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var SortAndPage_1 = require('../../domain/common/SortAndPage');
var ErrorService_1 = require('../../common/services/ErrorService');
var UserService_1 = require("../services/UserService");
var UserListComponent = (function () {
    function UserListComponent(errorService, userService) {
        var _this = this;
        this.errorService = errorService;
        this.userService = userService;
        this.errorService = errorService;
        this.userService = userService;
        this.users = [];
        this.sortAndPage = this.initSortDetails();
        this.userService.getUsers(this.sortAndPage).subscribe(function (data) {
            _this.users = data.results;
        }, function (err) {
            _this.errorMessage = JSON.stringify(err);
            _this.errorService.handleHttpError(err);
        });
    }
    UserListComponent.prototype.initSortDetails = function () {
        var sortAndPage = new SortAndPage_1.SortAndPage();
        sortAndPage.orderField = 'UserName';
        sortAndPage.orderDirection = 'Asc';
        sortAndPage.pageNumber = 1;
        sortAndPage.pageSize = 10;
        return sortAndPage;
    };
    UserListComponent.prototype.deleteUser = function (userName) {
        var _this = this;
        this.userService.deleteUser(userName).subscribe(function (data) {
            for (var i = 0; i < _this.users.length; i++) {
                if (_this.users[i].userName === userName) {
                    _this.users.splice(i, 1);
                    break;
                }
            }
        }, function (err) {
            _this.errorMessage = JSON.stringify(err);
            _this.errorService.handleHttpError(err);
        });
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'admin-users',
            viewProviders: [UserService_1.UserService],
            templateUrl: './templates/admin/components/UserListComponent.html'
        }), 
        __metadata('design:paramtypes', [ErrorService_1.ErrorService, UserService_1.UserService])
    ], UserListComponent);
    return UserListComponent;
})();
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=UserListComponent.js.map