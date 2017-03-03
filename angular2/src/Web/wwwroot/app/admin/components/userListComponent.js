System.register(["@angular/core", "../../domain/common/OrderAndPage", "../../common/services/ErrorService", "../services/UserService"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, OrderAndPage_1, ErrorService_1, UserService_1, UserListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (OrderAndPage_1_1) {
                OrderAndPage_1 = OrderAndPage_1_1;
            },
            function (ErrorService_1_1) {
                ErrorService_1 = ErrorService_1_1;
            },
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            }
        ],
        execute: function () {
            UserListComponent = (function () {
                function UserListComponent(errorService, userService) {
                    this.errorService = errorService;
                    this.userService = userService;
                    this.errorService = errorService;
                    this.userService = userService;
                    this.users = [];
                    this.totalCount = 0;
                    this.orderAndPage = this.initOrderAndPagingDetails();
                    this.updateView(this.orderAndPage);
                }
                UserListComponent.prototype.updateView = function (orderAndPage) {
                    var _this = this;
                    this.orderAndPage = orderAndPage;
                    this.userService.getUsers(this.orderAndPage).subscribe(function (data) {
                        _this.users = data.results;
                        _this.totalCount = data.totalCount;
                    }, function (err) {
                        _this.errorMessage = JSON.stringify(err);
                        _this.errorService.handleHttpError(err);
                    });
                };
                UserListComponent.prototype.initOrderAndPagingDetails = function () {
                    var orderAndPage = new OrderAndPage_1.OrderAndPage();
                    orderAndPage.orderField = 'UserName';
                    orderAndPage.orderDirection = 'Asc';
                    orderAndPage.pageNumber = 1;
                    orderAndPage.pageSize = 5;
                    return orderAndPage;
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
                return UserListComponent;
            }());
            UserListComponent = __decorate([
                core_1.Component({
                    selector: 'admin-users',
                    templateUrl: './app/admin/components/userListComponent.html'
                }),
                __metadata("design:paramtypes", [ErrorService_1.ErrorService, UserService_1.UserService])
            ], UserListComponent);
            exports_1("UserListComponent", UserListComponent);
        }
    };
});

//# sourceMappingURL=userListComponent.js.map
