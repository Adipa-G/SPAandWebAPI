angular.module("templates").run(['$templateCache', function(a) { a.put('app/views/user.html', '<div class="row">\n' +
    '    <div class="col-md-8 col-md-offset-2">\n' +
    '        <table class="table table-striped table-bordered table-hover table-responsive">\n' +
    '            <thead>\n' +
    '            <tr>\n' +
    '                <th sort-header="sortAndPage" sort-field="UserName" class="sort-table-header">Username</th>\n' +
    '                <th class="icon-col-1">&nbsp;</th>\n' +
    '            </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '            <tr data-ng-repeat="user in users">\n' +
    '                <td>\n' +
    '                    {{ user.userName }}\n' +
    '                </td>\n' +
    '                <td class="text-right">\n' +
    '                    <button type="button" class="btn btn-danger btn-xs" ng-click="deleteUser(user.userName)">\n' +
    '                        <i class="fa fa-trash-o"></i>\n' +
    '                    </button>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div table-pager="sortAndPage"></div>\n' +
    '    </div>\n' +
    '</div>');
	a.put('app/views/signup.html', '<form role="form" name="registrationForm">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-4 col-md-offset-4">\n' +
    '            <fieldset>\n' +
    '                <legend class="h2">Register</legend>\n' +
    '                <div class="form-group" validator="string[3,,\'User name should at least 3 characters long.\']">\n' +
    '                    <label for="registrationUserName">User Name</label>\n' +
    '                    <input type="text" id="registrationUserName" name="registrationUserName" class="form-control" placeholder="Username" data-ng-model="registration.userName" autofocus="">\n' +
    '                </div>\n' +
    '                <div class="form-group" validator="string[6,,\'Password should be minimum of 6 characters long.\']">\n' +
    '                    <label for="registrationPassword">Password</label>\n' +
    '                    <input type="password" id="registrationPassword" name="registrationPassword" class="form-control" placeholder="Password" data-ng-model="registration.password">\n' +
    '                </div>\n' +
    '                <div class="form-group" validator="string[6,,\'Password should be minimum of 6 characters long.\'],equalto[\'registrationPassword\',\'Password should be the same.\']">\n' +
    '                    <label for="registrationConfirmPassword">Confirm Password</label>\n' +
    '                    <input type="password" id="registrationConfirmPassword" name="registrationConfirmPassword" class="form-control" placeholder="Confirm Password" data-ng-model="registration.confirmPassword">\n' +
    '                </div>\n' +
    '            </fieldset>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-4 col-md-offset-4">\n' +
    '            <div data-ng-hide="message == \'\'" class="alert alert-danger">\n' +
    '                {{message}}\n' +
    '            </div>\n' +
    '            <div data-ng-hide="successMessagge == \'\'" class="alert alert-success">\n' +
    '                {{successMessagge}}\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <button type="button" ng-disabled="registrationForm.$invalid" class="btn btn-md btn-info btn-block" ng-click="signUp()">Register</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</form>');
	a.put('app/views/logmessage.html', '<div class="row">\n' +
    '    <div class="col-md-4 col-md-offset-2">\n' +
    '        <div class="form-group">\n' +
    '            <label for="logLevel">Level</label>\n' +
    '            <select class="form-control" id="logLevel" ng-model="filter.LogLevel" ng-options="option as option for option in logLevels" ng-change="filter.onChange()">\n' +
    '                <option value="">Select</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="col-md-4">\n' +
    '        <div class="form-group">\n' +
    '            <label for="loggerName">Logger Name</label>\n' +
    '            <select class="form-control" id="loggerName" ng-model="filter.Logger" ng-options="option as option for option in loggers" ng-change="filter.onChange()">\n' +
    '                <option value="">Select</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row">\n' +
    '    <div class="col-md-4 col-md-offset-2">\n' +
    '        <label>Date Range</label>\n' +
    '        <div class="input-group">\n' +
    '            <input type="text" ng-model="filter._FromDate" is-open="showFromCalender" class="form-control" uib-datepicker-popup="yyyy-MM-dd" ng-change="filter.onChange()">\n' +
    '            <div class="input-group-addon" ng-click="toggleFromCalender()"><i class="fa fa-calendar"></i>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        \n' +
    '    </div>\n' +
    '    <div class="col-md-4">\n' +
    '        <label>&nbsp;</label>\n' +
    '        <div class="input-group">\n' +
    '            <input type="text" ng-model="filter._ToDate" is-open="showToCalender" class="form-control" uib-datepicker-popup="yyyy-MM-dd" ng-change="filter.onChange()">\n' +
    '            <div class="input-group-addon" ng-click="toggleToCalender()"><i class="fa fa-calendar"></i></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row top-margin-lg">\n' +
    '    <div class="col-md-8 col-md-offset-2">\n' +
    '        <table class="table table-striped table-bordered table-hover table-responsive">\n' +
    '            <thead>\n' +
    '            <tr>\n' +
    '                <th sort-header="filter" sort-field="LogTimestamp" class="sort-table-header">Time</th>\n' +
    '                <th sort-header="filter" sort-field="Logger" class="sort-table-header">Logger</th>\n' +
    '                <th sort-header="filter" sort-field="Level" class="sort-table-header">Level</th>\n' +
    '                <th>Details</th>\n' +
    '            </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '            <tr data-ng-repeat="log in logs">\n' +
    '                <td><label utc-view="{{log.logTimestamp}}"></label></td>\n' +
    '                <td>{{ log.logger }}</td>\n' +
    '                <td>{{ log.level }}</td>\n' +
    '                <td>\n' +
    '                    <dl class="dl-horizontal">\n' +
    '                        <dt>Message</dt>\n' +
    '                        <dd>{{ log.message }}</dd>\n' +
    '                        <dt ng-show="log.stackTrace">stackTrace</dt>\n' +
    '                        <dd ng-show="log.stackTrace">{{ log.stackTrace }}</dd>\n' +
    '                    </dl>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div table-pager="filter"></div>\n' +
    '    </div>\n' +
    '</div>');
	a.put('app/views/login.html', '<form role="form" name="loginForm">\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-4 col-md-offset-4">\n' +
    '            <fieldset>\n' +
    '                <legend class="h2">Login</legend>\n' +
    '                <div class="form-group" validator="required[\'Please enter a user name.\']">\n' +
    '                    <label for="loginUserName">User Name</label>\n' +
    '                    <input type="text" id="loginUserName" name="loginUserName" class="form-control" placeholder="Username" data-ng-model="loginData.userName" autofocus="">\n' +
    '                </div>\n' +
    '                <div class="form-group" validator="string[6,,\'Password should be minimum of 6 characters long.\']">\n' +
    '                    <label for="loginPassword">Password</label>\n' +
    '                    <input type="password" id="loginPassword" name="loginPassword" class="form-control" placeholder="Password" data-ng-model="loginData.password">\n' +
    '                </div>\n' +
    '            </fieldset>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-4 col-md-offset-4">\n' +
    '            <div data-ng-hide="message == \'\'" class="alert alert-danger">\n' +
    '                {{message}}\n' +
    '            </div>\n' +
    '            <div class="form-group">\n' +
    '                <button type="button" ng-disabled="loginForm.$invalid" class="btn btn-md btn-info btn-block" ng-click="login()">Login</button>\n' +
    '            </div>    \n' +
    '        </div>\n' +
    '    </div>\n' +
    '</form>');
	a.put('app/views/loghttp.html', '<div class="row">\n' +
    '    <div class="col-md-4 col-md-offset-2">\n' +
    '        <div class="form-group">\n' +
    '            <label for="logLevel">Level</label>\n' +
    '            <select class="form-control" id="logLevel" ng-model="filter.LogLevel" ng-options="option as option for option in logLevels" ng-change="filter.onChange()">\n' +
    '                <option value="">Select</option>\n' +
    '            </select>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="col-md-4">\n' +
    '        <div class="form-group">\n' +
    '            <label for="trackId">Track Id</label>\n' +
    '            <input type="text" class="form-control" id="trackId" ng-model="filter.TrackingId" ng-change="filter.onChange()">\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row">\n' +
    '    <div class="col-md-4 col-md-offset-2">\n' +
    '        <label>Date Range</label>\n' +
    '        <div class="input-group">\n' +
    '            <input type="text" ng-model="filter._FromDate" is-open="showFromCalender" class="form-control" uib-datepicker-popup="yyyy-MM-dd" ng-change="filter.onChange()">\n' +
    '            <div class="input-group-addon" ng-click="toggleFromCalender()"><i class="fa fa-calendar"></i>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '    <div class="col-md-4">\n' +
    '        <label>&nbsp;</label>\n' +
    '        <div class="input-group">\n' +
    '            <input type="text" ng-model="filter._ToDate" is-open="showToCalender" class="form-control" uib-datepicker-popup="yyyy-MM-dd" ng-change="filter.onChange()">\n' +
    '            <div class="input-group-addon" ng-click="toggleToCalender()"><i class="fa fa-calendar"></i>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '<div class="row top-margin-lg">\n' +
    '    <div class="col-md-8 col-md-offset-2">\n' +
    '        <table class="table table-striped table-bordered table-hover table-responsive">\n' +
    '            <thead>\n' +
    '            <tr>\n' +
    '                <th sort-header="filter" sort-field="CalledOn" class="sort-table-header">Time</th>\n' +
    '                <th sort-header="filter" sort-field="TrackingId" class="sort-table-header">Tracking Id</th>\n' +
    '                <th sort-header="filter" sort-field="RequestIdentity" class="sort-table-header">Caller</th>\n' +
    '                <th sort-header="filter" sort-field="StatusCode" class="sort-table-header">Status</th>\n' +
    '                <th sort-header="filter" sort-field="CallDuration" class="sort-table-header">Duration(S)</th>\n' +
    '                <th>Details</th>\n' +
    '            </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '            <tr data-ng-repeat="log in logs">\n' +
    '                <td><label utc-view="{{log.logTimestamp}}"></label></td>\n' +
    '                <td>{{ log.trackingId }}</td>\n' +
    '                <td>{{ log.caller }}</td>\n' +
    '                <td>{{ log.status }}</td>\n' +
    '                <td>{{ log.duration }}</td>\n' +
    '                <td>\n' +
    '                    <dl class="dl-horizontal">\n' +
    '                        <dt>Verb</dt>\n' +
    '                        <dd>{{ log.verb }}</dd>\n' +
    '                        <dt>Url</dt>\n' +
    '                        <dd>{{ log.requestUri }}</dd>\n' +
    '                        <dt>Request</dt>\n' +
    '                        <dd json-format-heighlight="{{log.request}}"></dd>\n' +
    '                        <dt>Response</dt>\n' +
    '                        <dd json-format-heighlight="{{log.response}}"></dd>\n' +
    '                        <dt ng-show="!log.showHeaders">Headers</dt>\n' +
    '                        <dd ng-show="!log.showHeaders">\n' +
    '                            <div class="btn btn-sm btn-success" ng-click="log.showHeaders = !log.showHeaders">Show</div>\n' +
    '                        </dd>\n' +
    '                        <dt ng-show="log.showHeaders">Request Headers</dt>\n' +
    '                        <dd ng-show="log.showHeaders" json-format-heighlight="{{log.requestHeaders}}"></dd>\n' +
    '                        <dt ng-show="log.showHeaders">Response Headers</dt>\n' +
    '                        <dd ng-show="log.showHeaders" json-format-heighlight="{{log.responseHeaders}}"></dd>\n' +
    '                    </dl>\n' +
    '                </td>\n' +
    '            </tr>\n' +
    '            </tbody>\n' +
    '        </table>\n' +
    '        <div table-pager="filter"></div>\n' +
    '    </div>\n' +
    '</div>');
	a.put('app/views/home.html', '<div class="row">\n' +
    '    <div class="col-md-4 col-md-offset-2">\n' +
    '        <h2>Login</h2>\n' +
    '        <p class="text-primary">If you have Username and Password, you can use the button below to access the secured content using a token.</p>\n' +
    '        <p><a class="btn btn-info" href="/#!/login" role="button">Login &raquo;</a></p>\n' +
    '    </div>\n' +
    '    <div class="col-md-4">\n' +
    '        <h2>Sign Up</h2>\n' +
    '        <p class="text-primary">Use the button below to create Username and Password to access the secured content using a token.</p>\n' +
    '        <p><a class="btn btn-info" href="/#!/signup" role="button">Sign Up &raquo;</a></p>\n' +
    '    </div>\n' +
    '</div>');
	 }]);