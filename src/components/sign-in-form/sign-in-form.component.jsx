import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../custom-button/custom-button.component";

import { signInWithGooglePopup, signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            
            resetFormFields();            
        } catch (error) {
            if(error.code === 'auth/invalid-credential')
                alert('Invalid log in');
            console.log(error);
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }
    
    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <ButtonsContainer>
                    <Button type="submit">Sign in</Button>
                    <Button buttonType='google' type="button" onClick={signInWithGoogle}>Sign in with Google</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;