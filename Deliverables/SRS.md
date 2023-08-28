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
<!-- There are three stages to Vr-Chess: Login, preference selection, and gameplay. Below is a general flowchart of the user experience when running the software.
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/User_Journey.png)
### 3.1 External Interface Requirements
### 3.1.1 User Interfaces
* Landing Page
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/Landing_wireframe.png)
* Google Login
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/Google_Login.png)
* Database Login
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/Database_Login.png)
* Register Account
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/Register.png)
* Change Password
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/Password_Reset_Taskflow.png)
* Chess Board
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/Board.png) -->
### 3.1.1 User Interface
* High Level requirements - Mockups and Prototype
   * Style Guide
   ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/d4a01c93-fb3d-46f2-bf0b-0bbeb3667612)
   * Onboarding Process
    ![image](https://github.com/Ericsmrk/Bulldog_Finder/assets/103905844/e7b4ebff-b3f5-488c-903a-3d62c285437d)



### 3.1.2 Hardware Interfaces
<!-- The hardware needed for using the VR-Chess software includes all modern personal computers, laptops, tablets, and mobile devices. This version of VR-Chess uses semi-immersive VR; implementation for VR-Headsets will be implemented in a future version and must be accessible by all modern VR headsets such as the Meta Oculus. -->
### 3.1.3 Software Interfaces
<!-- Implementation constraints for Vr-Chess include using Networked A-Frame. Networked A-Frame is a library for creating multi-user, real-time 3D experiences using WebVR and the A-Frame web framework. Networked A-Frame utilizes EasyRTC and WebSockets to provide an easy way to create real-time, multi-user experiences. Accessing EasyRTC abstracts away the complexities of setting up WebSockets and provides an API to send messages between VR-Chess users easily, such as moves made by each player. This allows users to play the game in real-time, communicating each action to the other player's clients. The library also provides an API to easily synchronize the game state between users, ensuring that each user sees the same game board.

Websockets provide a way for users to communicate with each other in real time using the same protocol as HTTP. This provides bi-directional communication, meaning that data will be sent from both the client and the server. This feature makes Websockets ideal for real-time applications such as VR-Chess.

Other implementation constraints include using MongoDB for the database and Horoku for deployment. MongoDB utilizes NoSQL and is document oriented so a database schema is not required for implementation. Horoku is a platform the allows VR-Chess to operate entirely in the cloud. -->

### 3.2 Functional Requirements
<!-- * FR1: Store User Account Details  
The software must have a working database that can be accessed securely on the server to store information about the user.
* FR2: Account Creation  
The user must be able to register a VR-Chess account. On the landing page, the user must have a button to click that brings them to the login page. Once at the login page, the user can choose to register an account. In order for the user to register, they must create a unique username and a unique password. To be considered unique, these must be at lease 8 characters long and not present in the database already.
* FR3: User Login  
The user must be able to access the VR-Chess game through the login page by entering their email and their password correctly. If entered correctly the user is taken back to the landing page. If entered incorrectly, the user is shown an error. 
* FR4: Google Authentication  
The user must be able to access the VR-Chess game through the Google Authentication. Once the Google login method is shown, the user is given an option to choose a google account. Once the account is chosen, the user is returned to the landing page. If the user is already logged in with a Google account, this process is done automatically.
* FR5: Store Password Securely (IP)  
The password must be stored in the database securely. This can be done with a hashing algorithm.
* FR6: Multiple Environments  
The user must have the ability to choose from a selection of enviroments for gameplay. The required environments are: Woods, Checker, Waves, and Volcano.
* FR7: Choose Piece Color   
The user must have the ability to choose from a selection of piece colors for gameplay. The required piece colors are left to the developer's descretion.
* FR8: Dynamic Rooms   
The software must create rooms dynamically when users request a room.
* FR9: Dynamic Room Code  
The software must provide the option to select a room by entering a code. This is done on the landing page. The user enters the landing page and enters the room number in the room number bar input line.
* FR10: Start VR Scene  
The software will start a VR scene when prompted by the user. This is done after the user selects their preferences and logs in.
* FR:11 Control Avatar in Virtual Environment  
The user must be given the ability to move around in the virtual space freely if and only if they are in spectator mode. This is done with the arrow buttons and with standard wasd-controls.
* FR12: Select Seat   
When the user enters the scene, they are prompted to select either the white pieces, the black pieces if they are going to be a player.
* FR13: Choose to be a Spectator  
When the user enters the scene, they are given the option to become a spectator rather than a player.
* FR14: Board: Preset Positions of Pieces  
When the game is started, all of the pieces are in the correct positions on the board.
* FR15: Board Game Logic: King  
A King piece can only make moves that are valid moves according to standard Chess rules. This includes not moving off the board or moving onto an occupied space. If the King cannot move and it is in check, the game is over. If the King is put into check, it must move to a space that takes it out of check.
* FR16: Board Game Logic: Queen  
A Queen piece can only make moves that are valid moves according to standard Chess rules. This includes not moving off the board or moving onto an occupied space.
* FR17: Board Game Logic: Bishop  
A Bishop piece can only make moves that are valid moves according to standard Chess rules. This includes not moving off the board or moving onto an occupied space.
* FR18: Board Game Logic: Knight  
A Knight piece can only make moves that are valid moves according to standard Chess rules. This includes not moving off the board or moving onto an occupied space.
* FR19: Board Game Logic: Pawn  
A Pawn piece can only make moves that are valid moves according to standard Chess rules. This includes not moving off the board or moving onto an occupied space.
* FR20: Board Game Logic: Rook   
A Rook piece can only make moves that are valid moves according to standard Chess rules. This includes not moving off the board or moving onto an occupied space.
* FR21: Board: Piece Movement  
The user cannot move pieces that are not theirs. They can only move the pieces that they selected at the start of the game.
* FR22: Board Game Logic: Kill  
A player can kill another piece when they make a legal move to a square that is occupied by another by the opponents piece. This can only occur when it is the players turn.
* FR23: Board: Store Killed Pieces  
After making a legal kill on the Chess board, the taken piec is places to the left of the player.
* FR24: Board: Red Square Highlight  
When a piece is selected, the square that the piece was on turns the color red until the player releases the piece.
* FR25: Board: Green Square Highlight  
When a piece is selected, the square that the piece is moved too turns the color Green when the player releases the piece.
* FR26: Board Game Logic: King Death (IP)  
When the King is put into checkmate, the software presents the user with information about who won the game.
* FR27: Board Game Logic: Detect Win (IP)  
Information about winning the game is displayed to the user.
* FR28: Board Game Logic: Detect Loss (IP)  
Information about losing the game is displayed to the user.
* FR29: Website Deployment  
The website is deployed to the cloud using Horoku.  
### 3.3 UML Diagrams
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/Login_Sequence_diagram.png)
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/System_Use_case.png) -->

### 3.4 Database
<!-- The database used is MongoDB and Mongoose is used for data transfer. The only table to be stored is the users information. Here is a high level diagram showing how that database interacts with the cloud deployment.
![](https://github.com/Ericsmrk/VR-Chess/blob/main/images/DeploymentwithDB.png) -->
## 4 Non-Functional Requirements
### 4.1 Performance Requirements
<!-- The performance requirements for VR-Chess relate to the user experiencing any lag when running the software. Care should be taken by the implementation team to make sure the code performs at a rate that will prevent any lag between processes. -->
### 4.2 Safety Requirements
<!-- A notice should be displayed to the user before entering VR about the dangers with epileptic seizures. The user must be notified that the use of the software is at the users own risk.  -->
### 4.3 Security Requirements
<!-- The database needs to be secure by using a hashing algorithm for storing information. The development team will be responsible for adding safeguards to protect hackers from accessing the users IP address. -->
### 4.4 Software Quality Attributes
<!-- VR-Chess provides an easily accessible experience to users. Being able to access the game very quickly without having to login or anything is an important feature to this software. Being accessible accross devices gives portability value to the software. There is not a steep learning curve for new VR users with this software. It could be advertised as grab and go. -->
