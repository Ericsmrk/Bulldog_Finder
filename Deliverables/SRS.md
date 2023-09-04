# Software Engineering: Bulldog Finder Module on the Fresno State App
# System Requirements Specifications Document
> Version 1.0  
> Prepared by Eric Smrkovsky  
> California State University, Fresno

## Bulldog Finder Team Members
| Team Member | Role | 
| -- | -- |   
| Maria Guimaraes Diniz Tomaz | Product Owner |
| Eric Smrkovsky | Scrum Master |
| Ricardo Cabrera | Quality Assuurance Tester |
| Renato Torres | Front-End Developer |
| Juan Martinez | Back-End Developer |
| Brandon Huynh | Back-End Developer |

## 1. Introduction
### 1.1 Purpose 
The purpose of this product is to provide a college-oriented roommate and housing finder module within the Fresno State Mobile App (FSMA). This module allows Fresno State students to create an account, advertise open rooms, or seek a student housing rental. The module is to have a scope that provides the different added functionalities relevant to housing searches. While the requirements specified in this document are only for a single module in the FSMA, the developers must remember that the functionality is part of a more extensive mobile application. 
### 1.2 Product Scope
The company that developed the FSMA, Hub of Digital Transformation and Innovation (DXIHub), has always aimed to promote diversity and inclusivity among the student population at Fresno State. This module aims to provide the same benefits, objectives, and goals found within the FSMA that meet the vision and mission of the DXIHub. Read more about the vision and scope document for the DXIHub here: http://one.dx.fresnostate.edu   
### 1.3 Intended Audience
This document will be helpful to the clients and developers involved with developing and maintaining the BFM on the FSMA. It will provide a roadmap for the development team to follow when implementing the product's features. This System Requirements document looks into the development process for stakeholders and other relevant parties. 
### 1.4 Document Conventions
This document will be submitted as a deliverable for a project submission in a college-level software engineering course. There are sections that are pertaining to the software design including the functionality and timeline of the finished product.  
The Functional Requirement Overview in section 2.2 provides a hierarchy of specific functional requirements that are either at the highest level or are dependant on other requirements being implemented first. All requirements that aren't a part of the final proof of concept submission are labeled IP. In section 3.2, there is more information on each requirement.  
### 1.5 Glossary of Terms
BFM -> Bulldog Finder Module  
FSMA -> Fresno State Mobile App  
DXIHub -> Hub of Digital Transformation and Innovation  
DFD -> Data Flow Diagram  
FR -> Functional Requirement  
NFR -> Non-Functional Requirement  
UML -> Unified Modeling Language  
DB -> DataBase  
TBD -> To Be Determined  
IP -> In Progress  

## UML
![Low fidelity (static)  prototype based on the user diagram](https://github.com/Ericsmrk/Bulldog_Finder/blob/main/images/Low_Fidelity_Prototype.png)

## Overall Description
### 2.1 Product Overview

![](https://github.com/Ericsmrk/Bulldog_Finder/blob/main/images/Larger_System.png)

### 2.2 Functional Requirement Overview
This product functionality overview section provides the hierarchy of the systems functional requirements the software must perform or must be present for the user to carry out the specific use case. These functional requirements are components within the Data Flow Diagram (highest level) shown above. More design details and UML diagrams for each requirement will be provided in Section 3; only a high-level summary is available here.  
* FR1: Landing Page/ Onboarding
    * Description: Starting page to get users started when using application.
    * Dependency: None
* FR2: Account Creation
    * Description: Eligible users must be able to create an account.
    * Dependency: DB
* FR3: Personality Quiz
    * Description: Users will be prompted to take a personality quiz that will be linked to their profile. Results will be a color and a short description of the personality type.
    * Dependency: DB, FR2
* FR4: User Sign In
    * Description: The user must be able to to sign into registered account.
    * Dependency: DB
* FR5: Home Page
    * Description: A central page to access all of the different pages in the app including housing/roommate posts, profile, and favorites.
    * Dependency: DB
* FR6: Housing Listing Creation
    * Description: Allow users to create housing post that will be displayed on the home page. House listings include information about the room and pictures.
    * Dependency: DB, FR5
* FR7: Roommate Listing Creation
    * Description: Allow users to create roommate post that will be displayed on the home page. House listings include information about the roommate and pictures.
    * Dependency: DB, FR5
* FR8: Profile Editing
    * Description: Allow users to edit their own profiles after creation.
    * Dependency: DB, FR2
* FR9: Listing Editing
    * Description: Allow users to edit any listings they have created.
    * Dependency: DB, FR6, FR7
* FR10: In-App Messaging
    * Description: Allow users to message each other.
    * Dependency: DB
* FR11: Inbox
    * Description: Store mnessages between users.
    * Dependency: DB, FR10
* FR12: Favoriting Posts
    * Description: Allow users to favorite any listing.
    * Dependency: DB, FR6, FR7
* FR13: Favorites Page
    * Description: Displays a specfic users favorite listings.
    * Dependency: DB, FR5, F12
* FR14: Area Map
    * Description: Displays an area map of housing listing's location.
    * Dependency: DB, FR6
* FR15: Accessibility Adjustments
    * Description: Alow users to control accessibility settings such as content, color, and orientation.
    * Dependency: DB, FR6


### 2.3 Design and Implementation Constraints
* Operating Environment: 
   * The application must be compatible with both iOS and Android operating environments.
   * The application must be responsible and run in most web browsers.
* Security:
   * The app must be designed to ensure data privacy and security for user information and interactions.
   * The app must allow user to report inappropriate conduct of other users
* Integration: 
   * Modo Lab as the main system to build the application. The application must integrate with third-party services such Google, Google Maps API
   * Modo Lab
      * IDE: Allows to write, test and debug code
      * SDK: Tools, libraries and APIs
      * Backend: Cloud based services
      * Preview: Allows to preview the application before deployment
      * UI | Drag-and-drop: Use prebuilt components and templates do design the interface
   * Programming Languages: Node.js, Express as the frameworks.
   * Cloud: AWS, Amazon EC2
   * Database: MySQL
* User Experience and Performance:
   * The application interface  must be user-friendly and offer intuitive navigation to ensure the user's security.
  
### 2.4 Assumptions and Dependencies
* Campus Login Authentication: 
  * Assumption that Google authentication factor (@mail.fresnostate.edu) will  provide a secure and reliable campus login authentication service that can be integrated into the application.
* Matching Quiz (personality color test):
  * To help the users to find the most compatible roommate. 
* User Safety and Privacy: 
   * Users will behave responsibly and respectfully towards each other, and Bulldogs Finder has policies and procedures in place to address any inappropriate or harmful behavior.
* User Profile Information Accuracy: 
   * Users MUST provide accurate and truthful information about themselves in their profiles, including their personalities and preferences.
* Availability of Third-Party Services: 
   * Third-party services such as Google Maps API and Google authentication factor (@mail.fresnostate.edu).
* Developers:
   * The application must be developed within the scope of resources offered from Modo Labs.

## 3 Specific Requirements

### 3.1.1 User Interface
* High Level requirements - Mockups and Prototype
   * Style Guide
     
   ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/d4a01c93-fb3d-46f2-bf0b-0bbeb3667612)
  
   * Onboarding Process
     
    ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/e7b4ebff-b3f5-488c-903a-3d62c285437d)
  
   * Sign Up Process
     
     ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/ebfe8e3f-e79e-4a1a-a6a8-4ee4d9d4d33a)
     
   * Homepage
     
     ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/b68b1cc1-9da2-4b46-a596-abdc67c1f5c7)
     
   * Listing Details
     
     ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/2387cfde-3107-4a15-b1c1-74cb03e8f600)
     
   * Navigation Bar
     
     ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/129684e1-56a0-4daf-8533-fbeaa9b782b6)
     
   * Guest Access
     
    ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/0be35bd4-5404-4178-a9dd-97bdde59ac20)
  
   * Search Preferences
     
     ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/b9bc159c-ccab-4deb-b35b-6117b87a12e0)


### 3.1.2 Use Cases/User Function
See Section 4. It will Describe Screen Usage. 

### 3.2 Hardware Interfaces
* Mobile Devices
  * The app must be designed to run on mobile devices such as smartphones and tablets, with various screen sizes and resolutions.
* Internet Connection
   * The app must require an internet connection to access and update data from the server.

### 3.3 Software Interfaces
* Modo Lab
   * The app must be built using Modo Lab's low-code platform, which allows for easy development and customization of the app's features and  
* Frameworks
   * Node.js (JavaScript) to create CRUD Restful endpoints (Create, Read, update and Delete)
* JSON
   * The app must use JSON files to store and retrieve data from the server.
* AWS
   * The app will be using an AWS instance to run a virtual machine that will host a MySQL database to store JSON files and API endpoints.
 
### 3.4 Functional Requirements
* Login Authentication
   * The app must use the google authentication system to verify and authenticate user credentials (@mail.fresnostate.edu)
* Create Profile
   * The app must allow users to create a profile with the required information such as name, age, gender, major, graduation year, personality, budget, and bio.
* Finder
   * The app must have a home screen that allows users to discover housing and roommate listings based on various filters such as major, personality, age, graduation year, location, and keywords.
* Roommates
   * The app must allow users to view roommate profiles, message potential roommates, and manage their own roommate listing.
* Listings
   * The app must allow users to view housing and roommate listings, view profiles, and send messages to potential roommates.
* My Listings
   * The app must allow users to manage their own housing and roommate listings, including availability, number of roommates, type of room, and other details.
  
### 3.5 Database
See SDD
* Entity Relationship Diagram

![](https://github.com/Ericsmrk/Bulldog_Finder/blob/main/images/ER%20Diagram.png)

* Deployment Diagram

![](https://github.com/Ericsmrk/Bulldog_Finder/blob/main/images/Deployment%20Diagram.png)

## 4 System Features
* 4.1 Onboarding
   * Landing page will introduce user and will direct them to sign in or sign up
* 4.2  Sign In
   * Users will login with email and password and/or will utilize Google authentication factor (@mail.fresnostate.edu) and will be directed to the Welcome Screen.
   * Forgot Password option to request a new password.
   * Option to continue as Guest	
   * Sign Up option
   * 4.3 Sign Up
   * Input user’s name, email, and password for account creation. This will additionally utilize the Google authentication factor (@mail.fresnostate.edu) 
   * Option to navigate back to the Sign In Screen
   * After Account is verified user will be directed to Sign In (4.2) to Log in and will directed after the login to the Welcome screen
* 4.4  Welcome Screen
   * 4.4.1 Fresno State Student 
      * Provide relevant information about the application and will direct the user to the following steps.
      * Get started button will direct the user to the Create Profile screen.
* 4.5 Create Profile
   * Upload profile picture
   * Input DOB in mm/dd/yyyy format
   * Gender (drop down list)
   * Major (drop down list with all currently Fresno State majors)
   * Next button will direct the user to the About Yourself screen.
* 4.6 More relevant information (About Yourself )
   * Input any bio information
   * Preferences
   * Interests
   * Button to take personality test
   * Skip personality test button
   * Next button will direct the user to the Personality test screen.
* 4.7 Personality (Matching Quiz)
   * Presents the user with 7 questions with 4 possible answers each. 
   * See results button will direct the user to the result page 
   * After the result page user will be directed to the Finder (5.8)
* 4.8 HomePage (Finder)
   * Search Bar 
   * Housing / Roomies / My Listing buttons
   * Cards with main information about listing or roomies
   * Housing Cards information: Listing Description, User picture, Distance (miles), availability, Property type (apartment, house etc.), Rent $.
   * Roomies cards information: User Picture, Name, Age, Move In date, budget, Major.
   * Cards will have a favorite and report button
* 4.9 Favorites
   * Housing / Roomies buttons
   * Favorite cards view
* 4.10 Message
   * Inbox: List view of messages that display user picture and name
   * Able to click in the messages of the list and open a chat screen with conversation
   * Option to block the user and report
* 4.11 Profile
   * Profile view: able to update, delete, insert personal information (Major, Graduation Year, Picture, Bio, Budget, Move In date, Preferences, interests) .
   * Settings icon on the upper right with following options:
   * Take or Redo Matching Quiz
   * Privacy: 
   * Who can view your profile: Gender (dropdown), Age (Slider), Personality (checkbox options: green, orange, gold or blue) 
   * Blocked: View of user card blocked
   * Support: How to use the app / Documentation
   * About: About the application and Developers / Sponsors
* 5.12 Search bar
   * Present in Guest and Fresno State Student
   * Search by keywords: Major, Graduation Year
   * Location (Miles): 1-15+ miles - Slider control
   * Personality: (checkbox options: green, orange, gold or blue) 
   * Age: 17 - 30+ - Slider Control
   * Budget: 0 - 900+ - Slider Control 
* 4.13 Listing Details
   * Present in Guest and Fresno State Student
   * Title
   * Card with pictures and pagination dots.
   * User card with picture, name and age
   * Property Description
   * Amenities list (Parking, Wifi, Elevator etc)S
   * Radius Map that show the property area and miles from the school 
* 4.14 Profile Details
   * Present in Guest and Fresno State Student
   * Card with major, Graduation Year, Picture, Bio, Budget, Move In date
   * Biography
   * Preferences (Smoking or no-smoking, pet-friendly, cleanness, quiet, loud, early morning, night)
   * Interests (Sports, Fitness, Outdoor activities, Travel, Food, Music, Arts and culture, Gaming, Technology)
* 4.15 Guest
   * HomePage (Finder)
   * Search Bar 
   * Housing / Roomies 
   * Cards with main information about listing or roomies
   * Housing Cards information: Listing Description, User picture, Distance (miles), availability, Property type (apartment, house etc.), Rent $.
   * Roomies cards information: User Picture, Name, Age, Move In date, budget, Major.
* 4.16 Accessibility Adjustments
   * Content Adjustment
   * Color Adjustment
   * Orientation Adjustments 


## 5 Non-Functional Requirements
### 5.1 Performance Requirements
* Response Time:
   * The app must have a fast response time for user interactions such as loading profiles, searching for housing and roommates, and sending and receiving messages. 
* Scalability and Reliability:
   * Should be able to respond fast considering the number of users and data, without affecting the performance or response time. 
      * Server
      * Support: User documentation available

### 5.2 Safety Requirements
* Liability: 
   * User Safety: Prioritize user safety by providing a secure platform for users to interact and exchange information. The app should have policies and procedures in place to prevent any harmful or inappropriate behavior.
   * Data Privacy: The app must ensure the privacy and security of user information and interactions. The app should have measures in place to protect user data from unauthorized access. 
### 5.3 Security Requirements
* Authentication and Authorization:
   * Enforced secure authentication and authorization system to ensure that only authorized users have access to their profiles and data through the Google authentication factor (@mail.fresnostate.edu).
* Access Control:
   * The app must have access control mechanisms to limit user access to certain features and data based on their roles and permissions.
* In app messaging: 
   * Message Integrity: Message cannot be modified when it is on its way
   * Users can only text about housing and roommate matters, any other topic or if identified non appropriate content, users may get a warning and if such conduct is still happening, the user can have their account banned.  

### 5.4 Software Quality Attributes
* Usability:
   * User friendly, with an intuitive interface that facilitates user navigation. The design needs to minimize the need for user training or support.
* Maintainability:
   * The app must be designed to be easy to maintain and update, with clear documentation and modular code.
* Portability:
   * The app can be accessed from different platforms and environments. 
* Performance Efficiency:
   * The app must be designed to use system resources efficiently, with minimal memory space usage.

5.5 Quality assurance
* Requirement Analysis:
   * Before any testing is performed, the functional requirements of the application are reviewed so that the tester knows the exact features/functionality that need to be tested.
* UI Prototype Testing:
   * Before any backend or frontend testing occurred, the prototype for the project was tested so that the tester had a better understanding of how the final product should look like. This helped with the evaluation of the current product state compared to what the team was aiming for.
* Frontend Testing:
   * Text: testing was done to verify the alignment, size, and color when rendered on the XModule page.
   * Buttons and Textboxes: the functionality of any user interface interactables was tested to make sure they worked correctly.
   * Images: scaling and resolution of images was checked for each XModule page.
   * XModule Page Rendering: tests were performed to check how each XModule page would render on a mobile device or web browser.
* Backend Testing: 
   * Connection to Mysql Database: the first stages of backend testing were verifying the connection between or backend to the Mysql database where our data was stored.
   * Sign In and User Validation: testing was done to make sure that the backend code for user email and password validation was working correctly.
   * Sign Up and Account Creation: testing was performed to see if the backend code for account creation was functioning, and checks were made to see if newly created accounts could sign in to our system.
   * Matching Quiz Results: tests were performed on our backend matching quiz algorithm to make sure it was possible to get either a blue, red, green, or gold color.
   * Inbox and Messaging: the functionality of user messaging was tested to make sure it was possible for users of our product to send and receive messages.
   * Edit Profile: testing was performed to verify that a user can update or change information about their account using the edit profile feature.
   * Edit/Creating Housing or Roomies Listing: various tests were performed to verify that it was possible for a user to create either a housing or roomies listing. After the listing creation, testing was performed to verify that the user could then make changes to the listing they just created.
* Bug Reporting and Tracking:
   * Constantly capturing user feedback and reporting to responsible parts. Make sure that application search is suitable for housing options based on Fresno State Students. Also, make sure and compromise to test that the application is safe and user-friendly

