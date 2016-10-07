# Umbraco-Starter-Template
Quickly have all the dependencies needed for starter projects.

# Prerequisites
1. NodeJS & NPM
2. Visual Studio 2015
3. SQL Server Management Studio

# How to use this starter template?
1. Create new website. Visual Studio > File > New Project
2. Choose ASP.NET Web Application > Empty
3. Tools > NuGet Package Manager > Package Manager Console
4. Run command: Install-Package UmbracoCms
5. Load default database into SQL Server Management Studio.
6. Build project and follow Umbraco instructions. Install a blank theme and choose defualt database from SQLSMS in step 5.
7. Download Repo, named Umbraco-Starter-Project, and merge files into new Project
8. Create new Github Repo for new Project
9. Run NPM commands `Gulp pip` and `npm install`

# What does Umbraco-Starter-Project do?
1. Loads dependencies
	1. ZURB Foundation
	2. Mmenu
	3. Slick.JS
	4. SCSS
	5. Router for JS
  6. Font Awesome Icons
  7. Fancybox
  8. MatchHeight.JS
  9. JQuery
  
2. Optimize 
	1. Minifies CSS/JS and move to proper directory

3. Behavior
	1. Built in CSS media Queries
	2. Built in Mobile menu
	3. Add structure: Header/Footer/Body
	4. Blog Module installed
  5. Configures front end tools for fast prototyping
