#Introduction
Set of seed applications using different combinations of Angular and Web Api

###Angular 2 - In Progress
* MVC 6
* IdentityServer4
* NHibernate
* Angular 2 - Typescript
* Bootstrap
* Sass

#####Key Features
* All the features of MVC6 project
* Angular 2 with Typescript
* Gulp tasks for frontend building (Typescript/ Sass) configured to run with Gulp Watch 

###MVC6 
* MVC 6
* IdentityServer4
* NHibernate
* AngularJs
* Bootstrap 

#####Key Features
* Dnx project structure
* MVC6 built in DI container is used for dependecy injection
* Identity server 4 used as OAuth provider (self hosted with the application)

###OwinIdentityServer3 
* Owin
* IdentityServer3
* NHibernate
* Ninject
* WebApi 2.0
* AngularJs
* Bootstrap

###OwinOAuth
* Owin
* Owin Security with ASP .NET Identity
* NHibernate
* Ninject
* WebApi 2.0
* AngularJs
* Bootstrap

###UI Features
* User registration / authentication
* Error logs
* Http logs

###Solution Features
* DI
* Session per request implemented for NHibernate using middleware
* Request/Response logging
* Unit tests for Owin middleware
* Unit tests for controllers
* Integration tests for repositories, using SQLLite databases
* Jasmine unit tests for angular services, controllers and directives (Angular 2 version does not have tests)* 

###How to use
* Update the web.config connection string.
* In the application with the IdentityServer make sure to set correct IssuerName and Authority (update URLs).

###Screenshots (there are slight differences between each seed application)
####Home
![Alt text](readme_images/home.png?raw=true "Home")
####Register
![Alt text](readme_images/register.png?raw=true "Register")
####Login
![Alt text](readme_images/login.png?raw=true "Login")
####Users
![Alt text](readme_images/users.png?raw=true "Users")
####System Logs
![Alt text](readme_images/systemlog.png?raw=true "System Logs")
####Http Logs
![Alt text](readme_images/httplog.png?raw=true "Http Logs")

###License
GNU GPL V3
