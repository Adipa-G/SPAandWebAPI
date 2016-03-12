#Introduction
This is a set of seed applications to build upon, with following stack

###In folder OwinIdentityServer3 
* Owin
* IdentityServer3
* NHibernate
* Ninject
* WebApi 2.0
* AngularJs
* Bootstrap

###In folder OwinOAuth
* Owin
* Owin Security with ASP .NET Identity
* NHibernate
* Ninject
* WebApi 2.0
* AngularJs
* Bootstrap

###Features
* User registration / authentication
* Error logs
* Http logs
* Unit tests for Owin middleware
* Unit tests for controllers
* Integration tests for repositories, using SQLLite databases
* Jasmine unit tests for angular services, controllers and directives 

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