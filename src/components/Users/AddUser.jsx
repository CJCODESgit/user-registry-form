import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Wrapper from '../Helpers/Wrapper';
import classes from './AddUser.module.css';
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";



const AddUser = props => {
    const nameInputRef= useRef();
    const ageInputRef= useRef();

    const [error, setError] = useState();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'please enter a valid name and age (non-empty values).'
            });
            return;
        }
        if (+enteredUserAge < 18) {
             setError({
                title: 'Invalid age',
                message: 'Please enter valid age (>18).'
            });
            return;
        }
        props.onAddUser(enteredName, enteredUserAge);
        nameInputRef.current.value ='';
        ageInputRef.current.value ='';
    };


    const errorHandler = () => {
        setError(null);
    };
    return (
        <Wrapper>
       { error && <ErrorModal title= {error.title} message={error.message} onConfirm={errorHandler}/> }
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>

                <label htmlFor="username">Username</label>
                <input 
                id="username" 
                type="text" 
                ref={nameInputRef}
                />
                
                <label htmlFor="age">Age (Years)</label>
                <input 
                id="age" 
                type="number" 
                ref={ageInputRef}
                />
                <Button type="submit">Add User</Button>
            </form>
        </Card >
        </Wrapper>
    );

};

export default AddUser;





//ENABLING COMMENTS WHERE I USED STATES INSTEAD OF REFS BOTH ARE GREAT BUT IF WE ARE JUST READING VALUES AND NOT CHANGING ANYTHING REFFS MIGHT BE BETTER

// const AddUser = props => {
//     const [enteredUsername, setEnteredUsername] = useState('');

//     const [enteredAge, setEnteredAge] = useState('');

//     const [error, setError] = useState();

//     const addUserHandler = (event) => {
//         event.preventDefault();
//         if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
//             setError({
//                 title: 'Invalid input',
//                 message: 'please enter a valid name and age (non-empty values).'
//             });
//             return;
//         }
//         if (+enteredAge < 18) {
//              setError({
//                 title: 'Invalid age',
//                 message: 'Please enter valid age (>18).'
//             });
//             return;
//         }
//         props.onAddUser(enteredUsername, enteredAge);
//         setEnteredUsername('')
//         setEnteredAge('');
//     };

//     const usernameChangeHandler = (event) => {
//         setEnteredUsername(event.target.value);
//     };

//     const ageChangeHandler = (event) => {
//         setEnteredAge(event.target.value);
//     }

//     const errorHandler = () => {
//         setError(null);
//     };
//     return (
//         <Wrapper>
//        { error && <ErrorModal title= {error.title} message={error.message} onConfirm={errorHandler}/> }
//         <Card className={classes.input}>
//             <form onSubmit={addUserHandler}>

//                 <label htmlFor="username">Username</label>
//                 <input 
//                 id="username" 
//                 type="text" 
//                 value={enteredUsername} onChange={usernameChangeHandler} 
//                 />
                
//                 <label htmlFor="age">Age (Years)</label>
//                 <input 
//                 id="age" 
//                 type="number" 
//                 value={enteredAge} 
//                 onChange={ageChangeHandler} 
//                 />
//                 <Button type="submit">Add User</Button>
//             </form>
//         </Card >
//         </Wrapper>
//     );

// };

// export default AddUser;