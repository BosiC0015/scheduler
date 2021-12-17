# Interview Scheduler
Interview scheduler is an application for appointment booking. User can create new appointments, edit or delete(cance)l existing appointments.
It is an single page application built with React. The data is fetched from an API server using PostSQL database. 

## Final Product

1. The application will display a timeline for each day of the week, where the appointments and the spots left are shown.
!["display"](https://github.com/BosiC0015/scheduler/blob/gifs/public/gifs/display.gif)

2. The user can book an appointment on an empty spot by typing their name and select an interviewer. The spots will be updated automatically.
!["create"](https://github.com/BosiC0015/scheduler/blob/master/public/gifs/create.gif)

3. But the appointment cannot be booked when the input field is empty.
!["validate"](https://github.com/BosiC0015/scheduler/blob/gifs/public/gifs/validate.gif)

4. The user can also edit the details of an existing appointment. But the change can be canceled whenever before clicking on "Save".
!["edit"](https://github.com/BosiC0015/scheduler/blob/gifs/public/gifs/edit.gif)

5. The user can delete an existing appointment. By deleting there will be an extra verification card to make sure that the user want to delete the appointment. The spots will be updated automatically.
!["delete"](https://github.com/BosiC0015/scheduler/blob/gifs/public/gifs/delete.gif)

6. All data are updated and saved to the server with each action, they would not be lost when refreshing the page.
!["saved"](https://github.com/BosiC0015/scheduler/blob/gifs/public/gifs/saved.gif)

## Dependencies

- @testing-library/react-hooks"
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
