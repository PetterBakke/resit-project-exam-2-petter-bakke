Resit Project Exam 2

Description:
This project has a landing page with a fullcreen video/slide show. It also has a Login form and a register button. The login form contains a email and password inputs that will be checked if you are a user or not. If this mathces with the localStorage, the user will be redirected to the browse page otherwise an error message will show. The register form also contains a email and password input. When the form is being submitted the values must be validated and be stored in localStorage. 

Browse page: 

The API will load a list of games. A loading indicator will be shown at first before the list appears. The list of games is displayed in columns and rows. The title and image of each game is displayed. A list of genres as tags are displayed above the list of games. When clicking on a genre the list will update and the games within the genre will appear. Each game will have a more ino/details link. When clicked this will lead the user to the game details page, the url will also show the id of the game. It will also be a add to cart/favourite button that will add the game info in an abject to an array in localStorage. When unclicked it will remove the game the cart and localStorage. An icon will also display when a game is added or not. On top of the page it will be a button that will lead the user to the cart page.

Details page: 

This page retrieves the id from the url and makes an API call to fetch the details for this game. The favourite/add to cart icon and functionality will also be used on this page. 

Cart page: 

This page displays the list of games stored in localStorage. All info for this list is retrieved from the cart. A remove button is added to make it easier to remove an item. This clears the game from the cart and localStorage. When the cart is empty an message will be displayed. A check out button is also displayed that will take the user to the check out page. This button will be disabled is the cart is empty. 

Check out page:

This page will have a form with inputs for the user's name, address and credit card details with relevant validation on each input. Above this form the number of items in the cart will be displayed. If all the input values pass the validation, the submit button must open a modal to confirm payment. Once confirmed the cart array will be emptied and the user will be redirected to the browse page. 

Common page elements: 

A log out button which will clear all information stored in localStorage and redirect the user to the landing page. 

Built With:

1. https://reactjs.org/
2. https://sass-lang.com/

Getting Started: 

Installing: 
1. clone the repo "https://github.com/PetterBakke/resit-project-exam-2-petter-bakke.git"

2. npm install

Running:

npm run start

Contact: https://www.linkedin.com/in/petterbb/