# Introduction
Set of seed applications using different SPA frameworks and Web Api. There are 5 different braches for different technology stacks, and those are merged to the master branch as subtrees for ease of browsing.  

### React
* Using React 16.0
* .Net Core Web API
* Build script to build API, SPA and to execute tests
* IdentityServer 4 used to provide OAuth tokens
* NHibernate as ORM
* Bootstrap for UI
* Sass used to create stylesheets and Gulp task for building

##### How to run
* Checkout the project
* Create the databases with the included script
* Update the config.json connection string
* Run build.bat file
* Visit the url (http://localhost:5000/Index.html)

##### Development
* Use VS 2017 to open the solution
* Use npm run-script build to build typescript
* Use npm test to run jest tests 

### Angular
* UI with Angular 7.0 
* Angular cli
* IdentityServer 4 used to provide OAuth tokens
* NHibernate as ORM
* Bootstrap for UI

##### How to run
* Checkout the project
* Create the databases with the included script
* Update the config.json connection string
* Run build.bat file
* Visit the url (http://localhost:5000/Index.html)

##### Development
* Use VS 2017 to open the solution
* Use ng build command to build UI
* Use ng test command to run unit tests

### MVC6
* UI with Angular 1.5 
* Grunt tasks for run tests and minify and compress css and javascripts
* AspNetCore 1.0 used to implement API with built in DI
* DNX project structure
* IdentityServer 4 used to provide OAuth tokens
* NHibernate as ORM
* Bootstrap for UI
* Sass used to create stypesheets and Gulp task for building

##### How to run
* Checkout the project
* Open with VS2015
* Restore nuget packages and npm packages
* Build
* Update the web.config connection string
* Update IssuerName and Authority in Startup.cs (update URL http://localhost:xxxxx to your Url)
* Execute the Web project in the src folder as self hosted exe
* Visit the url (http://localhost:5000/Index.html)
* In order to run unit tests, set the test project as startup projects and run the solution

##### Development
* Run the gulp watch task from the task runner of the visual studio
* Any changes made to file will update the Js,Css and template files

### Owin-IdentityServer3 
* UI with Angular 1.5 
* Grunt tasks for run tests and minify and compress css and javascripts
* WebApi 2.0 used to implement API with Ninject as DI 
* IdentityServer 3 used to provide OAuth tokens
* NHibernate as ORM
* Bootstrap for UI
* Sass used to create stypesheets and Gulp task for building

##### How to run
* Checkout the project
* Open with VS2015
* Restore nuget packages and npm packages
* Build
* Update the web.config connection string
* Update IssuerName and Authority in Startup.cs (update URL http://localhost:xxxxx to your Url)
* Execute the Web project in the src folder as self hosted exe
* Visit the url (http://localhost:5000/Index.html)
* Unit tests can be run with a competible VS plugin 

##### Development
* Run the gulp watch task from the task runner of the visual studio
* Any changes made to file will update the Js,Css and template files

### Owin
* UI with Angular 1.5 
* Grunt tasks for run tests and minify and compress css and javascripts
* WebApi 2.0 used to implement API with Ninject as DI 
* NHibernate as ORM
* Bootstrap for UI
* Sass used to create stypesheets and Gulp task for building

##### How to run
* Checkout the project
* Open with VS2015
* Restore nuget packages and npm packages
* Build
* Update the web.config connection string
* Execute the Web project in the src folder as self hosted exe
* Visit the url (http://localhost:5000/Index.html)
* Unit tests can be run with a competible VS plugin 

##### Development
* Run the gulp watch task from the task runner of the visual studio
* Any changes made to file will update the Js,Css and template files

### Common Features
* DI
* Session per request implemented for NHibernate using middleware
* Request/Response logging
* Unit tests for Owin middleware
* Unit tests for controllers
* Integration tests for repositories, using SQLLite databases
* Jasmine unit tests for angular 1.x services, controllers and directives (Angular 2 version does not have tests)* 

### Screenshots (there are some differences in Angular2 application)
#### Home
![Alt text](readme_images/home.png?raw=true "Home")
#### Register
![Alt text](readme_images/register.png?raw=true "Register")
#### Login
![Alt text](readme_images/login.png?raw=true "Login")
#### Users
![Alt text](readme_images/users.png?raw=true "Users")
#### System Logs
![Alt text](readme_images/systemlog.png?raw=true "System Logs")
#### Http Logs
![Alt text](readme_images/httplog.png?raw=true "Http Logs")

### License
GNU GPL V3
