import { useState } from 'react';
import { Link } from 'react-router-dom';

//styles & images
import './SignIn.css';
import mail from '../assets/mail.svg';
import eye from '../assets/eye.svg';
import noeye from '../assets/noeye.svg';

//components
import Sidebar from './Sidebar';

//context
import { useAuthContext } from "../hooks/useAuthContext";

export default function SignIn() {
    //submission states
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    //form states
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('')
    const [passwordShown, setPasswordShown] = useState(false);

    //context state
    const { dispatch } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setData(null); //clears previous data value
        setIsPending(true); //sets the pending state

        try {
            let res = await fetch(process.env.REACT_APP_LOGIN, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: email,
                password: password,
              }),
            });
            let resJson = await res.json();
            console.log('res>>',resJson)
            if (resJson.statusCode === 200) {           //successful message
              setData(resJson.data);
              dispatch({type: 'LOGIN', payload: resJson.data}); //the details of the person logged in is available to all the components in our App.
              setIsPending(false);
              setError(null); 
            } else if(resJson.statusCode === 400) {     //invalid username/password
              setError(resJson.message);
              setIsPending(false);
            } else if(resJson.statusCode === 422) {     //invalid email
              setError('Please enter a valid email');
              setIsPending(false);
            }
          } catch (err) {
            setError('No server response, check your internet connection');
            setIsPending(false);
          }

    }


    return (
    <div className='signin'>
        <Sidebar text='Welcome Back' />
        <div className="signin__form"> 
            <form className='form' onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                {error && <p className="error">{error}</p>}
                {data && <p className='success'>You are signed in</p>} {/*Instead of this maybe should have done a modal */}
                <label>
                    <span>Email</span>
                    <div className="input__container">
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder='johndoe@gmail.com'
                        required
                    />
                    <img className='form__img' src={mail} alt="shown icon" />
                    </div>
                </label>
                <label>
                    <span>Password</span>
                    <div className="input__container">
                    <input
                        type={passwordShown ? 'text' : 'password'}
                        onChange={(e) => setPassWord(e.target.value)}
                        value={password}
                        required
                    />
                    <img
                     src={passwordShown ? noeye : eye} alt="shown icon"
                     className='form__img' 
                     onClick={() => setPasswordShown(!passwordShown)}
                    />
                    </div>
                </label>
                {!isPending && <button>Sign in</button>}
                {isPending && <button>Signing in...</button>}
                <p className='action'>Don’t have an account? <span><Link to='/signup'>Sign Up</Link></span></p>
            </form>
        </div>
    </div>
  )
}
